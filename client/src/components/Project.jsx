import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import "../css/Project.css"
import { useParams } from "react-router-dom";
import { getProjectById, url } from "../api/api.js"
import { Button, Badge } from 'react-bootstrap';


function Project() {

  const { id } = useParams();
  const [project, setProject] = useState()


  //REQUESTS
  useEffect(() => {

    async function getProjectRequest() {
      getProjectById(id, response => setProject(response["data"][0]))
    }
    getProjectRequest()
  }, [])


  // const renderSkills = () => {
  //   const techs = project.technology_names.split(',')
  //   const types = project.type_names.split(',')
  //   const exp = project.exp_names.split(',')

  //   return (
  //     <div>
  //       { techs.map((tag, index) => (
  //         <div key={index}>
  //           <button >{tag.trim()}</button>
  //           <button >{types[index].trim()}</button>
  //           <button >{exp[index].trim()}</button>
  //           <br />
  //         </div>
  //       ))}
  //     </div>
  //   )
  // };

  const render = (table) => {
    const data = project[table].split(',')

    return (
      <div>
        {data.map((tag, index) => (
          <Button variant="info" className="m-1">
            {tag.trim()}
          </Button>
        ))}
      </div>
    )
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar />

      <Card className="myProject">
        {/* logo  */}
        <Card.Img
          className="mylogo mx-auto"
          variant="top"
          // src={`${url}/${project.logo}`}
          src={`https://res.cloudinary.com/dnti3vb59/image/upload/v1/${project.logo}`}
        />

        <Card.Body>
          <Card.Link href={project.contact} target="_blank" rel="noreferrer">Contact</Card.Link>
          <Card.Link href={project.website} target="_blank" rel="noreferrer">Website</Card.Link>
        </Card.Body>
        <Card.Body>
          {/* project title */}
          <Card.Title>{project.name}</Card.Title>
          {/* organization namme */}
          <Card.Title>{project.org_name}</Card.Title>
          {/* Description */}
          <Card.Text>
            <div dangerouslySetInnerHTML={{ __html: project.description }} />
          </Card.Text>
        </Card.Body>

        {/* skills */}
        <Card.Body>
          <Card.Title>Skills</Card.Title>
          {project && render("technologies")}
        </Card.Body>

        {/* Impact Areas */}
        <Card.Body>
          <Card.Title>Impact Areas</Card.Title>
          {project && render("impact_areas")}
        </Card.Body>

        {/* topics */}
        <Card.Body>
          <Card.Title>Topics</Card.Title>
          {project && render("topics")}
        </Card.Body>


      </Card>

    </div>
  );
}




export default Project