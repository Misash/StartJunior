import { Router } from "express";
import { pool } from "../db.js"
import multer from "multer";
import {
    createProject,
    getTechnologies,
    getTypes,
    getExpLevels,
    getimpactAreas,
    getTopics,
    getBasicProjectsInfo,
    getProject,
    getImage,
    getFilterProjects
} from "../controllers/index.controllers.js"




// multer (se encarga de guardar archivos en carpeta uploads del server)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "server/");
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        cb(null, `uploads/${file.originalname}-${Date.now()}.${ext}`)
    }
});

const upload = multer({
    storage: storage
});



const router = Router()

router.get("/ping", async (req, res) => {
    const [result] = await pool.query("SELECT 1 + 1 as result")
    console.log(result)
    res.json(result)
})



//create project
router.post("/createProject", upload.array("logo"), createProject)
//get technologies
router.get("/techs", getTechnologies)
//get types
router.get("/types", getTypes)
//get ExpLevel
router.get("/expLevels", getExpLevels)
//get Impact Areas
router.get("/impactAreas", getimpactAreas)
//get topics
router.get("/topics", getTopics)

//get projects id,logo,project title,org name,
router.get("/basicProjects", getBasicProjectsInfo)

// get filter projects by impactArea, techs & topics
router.get("/filterprojects", getFilterProjects)

//get all project's info
router.get("/project/:id",getProject)

//get image from uploads
router.get('/uploads/:filename',getImage);


export default router