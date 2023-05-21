import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Badge } from 'react-bootstrap';
import "../css/Card.css"
import { Link } from 'react-router-dom';

function myCard(props) {


  // let logo="https://wwwhatsnew.com/wp-content/uploads/2022/02/linux-seguridad.jpeg"

  return (
    <Card className="myCard" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Img variant="top" src={props.logo} />
        <Card.Title>{props.projectTitle}</Card.Title>
        <Card.Text>
          {/* <img  className="logo" src={props.logo} alt="Logo" /> */}
          <h6> {props.organizationName} </h6>
          {/* impact areas */}
          <span>
            {props.impactAreas.split(',').map((area) => (
              // <button key={area}>{area.trim()}</button>
              <Badge key={area} bg="primary"> {area.trim()}</Badge>
            ))}
          </span>
          <br />
          {/* skills */}
          <span>
            {props.skills.split(',').map((skill) => (
              <Badge key={skill} bg="info"> {skill.trim()}</Badge>
              // <button key={skill}>{skill.trim()}</button>
            ))}
          </span>
          <br />
        </Card.Text>

        <Link to={`/project/${props.id}`}>
          <Button variant="primary">Details</Button>
        </Link>

      </Card.Body>
    </Card>
  );
}

export default myCard;