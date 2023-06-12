import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Badge } from 'react-bootstrap';
import "../css/Card.css"
import { Link } from 'react-router-dom';

function myCard(props) {


  // let logo="https://wwwhatsnew.com/wp-content/uploads/2022/02/linux-seguridad.jpeg"

  // Calculate the number of days since the creation of the post
  const today = new Date();
  const createdDate = new Date(props.createdAt);
  const timeDiff = Math.abs(today.getTime() - createdDate.getTime());
  const daysPassed = Math.ceil(timeDiff / (1000 * 3600 * 24));


  return (


    <Card className="myCard" style={{ width: '18rem' }}>
      <Link to={`/project/${props.id}`} className="card-link">
        <Card.Body >
          <div className="daysPassed">
            <p>{daysPassed}d</p>
          </div>
          <Card.Img variant="top"  className="mylogo" src={props.logo} />
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

          {/* <Link to={`/project/${props.id}`}>
            <Button variant="primary">Details</Button>
          </Link> */}

        </Card.Body>
      </Link>
    </Card>

  );
}

export default myCard;