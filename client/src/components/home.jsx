import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Carusel from "./Carusel";
import Canvas from "./Canvas";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ToggleButton from "react-bootstrap/ToggleButton";
import Card from "./Card";
import Row from "react-bootstrap/Row";
import CreatePost from "./CreatePost";
import "../css/Home.css"

import {
  url,
  getImpactAreas,
  getTechs,
  getTopics,
  getbasicProjectsInfo,
  getFilterProjects
} from "../api/api.js"

function Home() {

  //FILTERS
  const [ImpactAreas, setImpactAreas] = useState();
  const [techs, setTechs] = useState()
  const [topics, setTopics] = useState()
  const [projects, setProjects] = useState()

  //CARDS

  const handleSubmitFilters = (event) => {
    event.preventDefault();

    const impactAreaIds = ImpactAreas.filter(data => data.value).map(data => data.id);
    const techIds = techs.filter(data => data.value).map(data => data.id);
    const topicIds = topics.filter(data => data.value).map(data => data.id);

    // Construct the base URL for the fetch request
    let url = "";

    // Add the selected impact areas to the URL
    if (impactAreaIds.length > 0) {
      url += `impactAreas=${impactAreaIds.join(',')}&`;
    }

    // Add the selected technologies to the URL
    if (techIds.length > 0) {
      url += `techs=${techIds.join(',')}&`;
    }

    // Add the selected topics to the URL
    if (topicIds.length > 0) {
      url += `topics=${topicIds.join(',')}&`;
    }


    if (url.length === 0) {
      return;
    }

    //add at the bginning 
    url = '/filterprojects?' + url
    // Remove the trailing '&' from the URL
    url = url.slice(0, -1);

    console.log("final url", url)

    getFilterProjects(url ,response => setProjects(response["data"]))


  };



  const handleImpactAreas = (index) => {
    let newArr = [...ImpactAreas];
    newArr[index].value = !newArr[index].value;
    setImpactAreas(newArr);
  };

  const handleChanges = (index, setData, data) => {
    let newArr = [...data];
    newArr[index].value = !newArr[index].value;
    setData(newArr);
  };

  //REQUESTS
  useEffect(() => {
    async function getImpactAreasRequest() {
      getImpactAreas((response) => setImpactAreas(
        response["data"].map(data => ({
          id: data.id,
          name: data.name,
          value: false
        }))
      ))
    }
    async function getTechsRequest() {
      getTechs((response => setTechs(
        response["data"].map(data => ({
          id: data.id,
          name: data.name,
          value: false
        }))
      )))
    }
    async function getTopicsRequest() {
      getTopics((response => setTopics(
        response["data"].map(data => ({
          id: data.id,
          name: data.name,
          value: false
        }))
      )))
    }
    async function getProjectsRequest() {
      getbasicProjectsInfo(response => setProjects(response["data"]))
    }

    getImpactAreasRequest()
    getTechsRequest()
    getTopicsRequest()
    getProjectsRequest()

  }, [])

  return (
    <div>
     
      <Canvas/>
      <NavBar />

      {/* Impact Areas */}
      <Container className="filters">
        { ImpactAreas && ImpactAreas.map((area, index) => (
          <ToggleButton
            className="btn-space"
            id={index + area.name}
            type="checkbox"
            variant="outline-info"
            checked={ImpactAreas[index].value}
            value="1"
            onChange={(e) => handleChanges(index, setImpactAreas, ImpactAreas)}
          >
            {area.name}
          </ToggleButton>
        ))}
      </Container>


      <Container className="filters">

        {/* topics */}
        {topics && topics.map((item, index) => (
          <ToggleButton
            className="btn-sm btn-techs"
            id={index + item.name}
            type="checkbox"
            variant="outline-info"
            checked={topics[index].value}
            value="1"
            onChange={(e) => handleChanges(index, setTopics, topics)}
          >
            {item.name}
          </ToggleButton>
        ))}


        <br></br><br></br>

        {/* Technologies */}
        {techs && techs.map((item, index) => (
          <ToggleButton
            className="btn-sm btn-techs"
            id={index + item.name}
            type="checkbox"
            variant="outline-info"
            checked={techs[index].value}
            value="1"
            onChange={(e) => handleChanges(index, setTechs, techs)}
          >
            {item.name}
          </ToggleButton>
        ))}

      </Container>

      <Container className="filters">
        <Button variant="info" onClick={handleSubmitFilters}>Apply Filters</Button>
      </Container>

      {/* CARDS */}

      <Container className="filters-cards">
        <Row>

          {projects && projects.map((p) => (

            <Card
              id={p.id}
              key={p.id}
              logo={`${url}/${p.logo}`}
              projectTitle={p.name}
              organizationName={p.org_name}
              impactAreas={p.impact_areas}
              skills={p.technologies}
            />

          ))}

        </Row>
      </Container>
    </div>
  );
}

export default Home;
