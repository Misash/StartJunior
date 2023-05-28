import { pool } from "../db.js"


export const createProject = async (req, res) => {


    const {
        projectName,
        description,
        techs,
        orgName,
        impactAreas,
        topics,
        contact,
        website,
    } = req.body
    const logo = req.files[0].filename


    // insert project
    let sql = "insert into\
    projects(name,description,contact,website,org_name,logo)\
    values(?,?,?,?,?,?)"
    let [result] = await pool.query(
        sql,
        [projectName, description, contact, website, orgName, logo]
    )


    // get last project's id
    const idProject = result.insertId
    console.log("Project created", idProject)

    const relatedData = [
        [techs, 'projects_technologies', 'technology'],
        [impactAreas, 'projects_impact_areas', 'impact_area'],
        [topics, 'projects_topics', 'topic']
    ];

    // iterate over each set of related data and insert it into the database
    for (const [data, table, columnName] of relatedData) {

        let values
        if (Array.isArray(data)) {
            values = data.map(d => [idProject, d]);
        } else {
            values = [[idProject, data]]
        }
        const sql = `INSERT INTO ${table} (id_project, id_${columnName}) VALUES ?`;
        try {
            const [result] = await pool.query(sql, [values]);
            console.log(`${columnName} related`, result.insertId);
        } catch (error) {
            console.log(error)
        }
    }


    res.send(req.body)
}

export const getTechnologies = async (req, res) => {
    const sql = "select * from technology order by name asc"
    const [result] = await pool.query(sql)
    // console.log(result)
    res.json(result)
}


export const getTypes = async (req, res) => {
    const sql = "select * from type "
    const [result] = await pool.query(sql)
    // console.log(result)
    res.json(result)
}

export const getExpLevels = async (req, res) => {
    const sql = "select * from exp_level"
    const [result] = await pool.query(sql)
    // console.log(result)
    res.json(result)
}

export const getimpactAreas = async (req, res) => {
    const sql = "select * from impact_areas"
    const [result] = await pool.query(sql)
    // console.log(result)
    res.json(result)
}

export const getTopics = async (req, res) => {
    const sql = "select * from topics order by name asc"
    const [result] = await pool.query(sql)
    res.json(result)
}



export const getBasicProjectsInfo = async (req, res) => {
    const sql = `
    SELECT 
    p.id, 
    p.name, 
    p.org_name, 
    p.logo,
    GROUP_CONCAT(DISTINCT ia.name) AS impact_areas,
    GROUP_CONCAT(DISTINCT tec.name) AS technologies
    FROM projects p 
    INNER JOIN projects_impact_areas pia ON p.id = pia.id_project 
    INNER JOIN impact_areas ia ON pia.id_impact_area = ia.id 
    INNER JOIN projects_topics ptcs ON p.id = ptcs.id_project 
    INNER JOIN topics tcs ON ptcs.id_topic = tcs.id 
    INNER JOIN projects_technologies ptech ON p.id = ptech.id_project 
    INNER JOIN technology tec ON ptech.id_technology = tec.id 
    GROUP BY p.id`

    const [result] = await pool.query(sql)
    // console.log(result)
    res.json(result)
}


export const getProject = async (req, res) => {
    const projectId = req.params.id
    const sql = `
    SELECT 
        p.id, 
        p.name, 
        p.description, 
        p.contact, 
        p.website, 
        p.org_name, 
        p.logo,
        GROUP_CONCAT(DISTINCT ia.name) AS impact_areas,
        GROUP_CONCAT(DISTINCT tcs.name) AS topics,
        GROUP_CONCAT(DISTINCT tec.name) AS technologies
    FROM  (select * from projects where id = ? ) p
    INNER JOIN projects_impact_areas pia ON p.id = pia.id_project 
    INNER JOIN impact_areas ia ON pia.id_impact_area = ia.id 
    INNER JOIN projects_topics ptcs ON p.id = ptcs.id_project 
    INNER JOIN topics tcs ON ptcs.id_topic = tcs.id 
    INNER JOIN projects_technologies ptech ON p.id = ptech.id_project 
    INNER JOIN technology tec ON ptech.id_technology = tec.id 
    GROUP BY p.id`

    const [result] = await pool.query(sql, [projectId])
    res.json(result)
}



export const getFilterProjects = async (req, res) => {
    const { impactAreas, techs, topics } = req.query;

    console.log(req.query)
    console.log("ia", impactAreas)
    console.log("techs", techs)
    console.log("topics", topics)


    let sql =  `SELECT 
                p.id, 
                p.logo, 
                p.name, 
                p.org_name ,
                GROUP_CONCAT(DISTINCT ia.name) AS impact_areas,
                GROUP_CONCAT(DISTINCT tec.name) AS technologies
                FROM projects p 
                INNER JOIN projects_impact_areas pia ON p.id = pia.id_project 
                INNER JOIN impact_areas ia ON pia.id_impact_area = ia.id 
                INNER JOIN projects_topics ptcs ON p.id = ptcs.id_project 
                INNER JOIN topics tcs ON ptcs.id_topic = tcs.id 
                INNER JOIN projects_technologies ptech ON p.id = ptech.id_project 
                INNER JOIN technology tec ON ptech.id_technology = tec.id 
                WHERE`;

    // Add the impact areas filter
    if (impactAreas) {
        const impactAreaList = impactAreas.split(',');
        const impactAreaClause = ` ia.id IN (${impactAreaList.join(',')})`;
        sql += `${impactAreaClause} AND `;
    }

    // Add the technologies filter
    if (techs) {
        const techList = techs.split(',');
        const techClause = ` ptech.id_technology IN (${techList.join(',')})`;
        sql += `${techClause} AND `;
    }

    // Add the topics filter
    if (topics) {
        const topicList = topics.split(',');
        const topicClause = ` tcs.id IN (${topicList.join(',')})`;
        sql += `${topicClause} AND `;
    }

    // Remove the trailing 'AND' from the query
    sql = sql.slice(0, -5);

    //grupo by
    sql += " GROUP BY p.id"

    


    try {
        const [result] = await pool.query(sql)
        res.json(result)
    } catch (error) {
        console.log(error)
    }

}

export const getImage = async (req, res) => {
    const { filename } = req.params;
    res.sendFile(`${__dirname}/uploads/${filename}`);
}

export const getProjectImpactAreas = async (req, res) => {
    const projectId = req.params.id
    const sql = `select  impact_areas.name 
    from (select id_impact_area from projects_impact_areas where id_project=?) ia
    inner join impact_areas 
    on ia.id_impact_area = impact_areas.id`
    const [result] = await pool.query(sql, [projectId])
    res.json(result)
}

export const getProjectSkills = async (req, res) => {
    const projectId = req.params.id
    const sql = `select t.name , tp.name , e.name
    from (select * from skills where id_project=?) s
    inner join technology t
    on s.id_technology = t.id
    inner join type tp
    on s.id_type = tp.id
    inner join exp_level e
    on s.id_exp_level = e.id`
    const [result] = await pool.query(sql, [projectId])
    res.json(result)
}


