import React, { useState, useEffect } from "react";
import "../css/Home.css";
import NavBar from "./NavBar";
import Carusel from "./Carusel";
import Canvas from "./Canvas";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import Card from "./Card";
import Row from "react-bootstrap/Row";
import Filter from "./Filter";
import CreatePost from "./CreatePost";
import axios from "axios";
import EmailBox from "./EmailBox";
import FeedbackBox from "./FeedbackBox";
import Footer from "./Footer";

import {
  url,
  getImpactAreas,
  getTechs,
  getTopics,
  getbasicProjectsInfo,
  getFilterProjects,
  getImage,
} from "../api/api.js";

function Home() {
  //FILTERS
  const [ImpactAreas, setImpactAreas] = useState();
  const [techs, setTechs] = useState();
  const [topics, setTopics] = useState();
  const [projects, setProjects] = useState();

  //images
  const [imageUrls, setImageUrls] = useState();

  //CARDS

  // FILTER HANDLER 
  const handleSubmitFilters = (event) => {
    event.preventDefault();

    const impactAreaIds = ImpactAreas.filter((data) => data.value).map(
      (data) => data.id
    );
    const techIds = techs.filter((data) => data.value).map((data) => data.id);
    const topicIds = topics.filter((data) => data.value).map((data) => data.id);

    // Construct the base URL for the fetch request
    let url = "";

    // Add the selected impact areas to the URL
    if (impactAreaIds.length > 0) {
      url += `impactAreas=${impactAreaIds.join(",")}&`;
    }

    // Add the selected technologies to the URL
    if (techIds.length > 0) {
      url += `techs=${techIds.join(",")}&`;
    }

    // Add the selected topics to the URL
    if (topicIds.length > 0) {
      url += `topics=${topicIds.join(",")}&`;
    }

    if (url.length === 0) {
      window.location.reload();
      return;
    }

    //add at the bginning
    url = "/filterprojects?" + url;
    // Remove the trailing '&' from the URL
    url = url.slice(0, -1);

    console.log("final url", url);

    getFilterProjects(url, (response) => setProjects(response["data"]));
  };



  const getIcon = (name) => {
    switch (name) {
      case "Society":
        return "🤝";
      case "Education":
        return "🎓";
      case "Environment":
        return "🌱";
      case "Humanitarian":
        return "🤲";
      case "Accessibility":
        return "♿️";
      case "Science":
        return "🔬";
      case "Health":
        return "💙";
      case "Freedom and Privacy":
        return "🔒";
      default:
        return "";
    }
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
      getImpactAreas((response) =>
        setImpactAreas(
          response["data"].map((data) => ({
            id: data.id,
            name: getIcon(data.name) + data.name,
            value: false,
          }))
        )
      );
    }
    async function getTechsRequest() {
      getTechs((response) =>
        setTechs(
          response["data"].map((data) => ({
            id: data.id,
            name: data.name,
            value: false,
          }))
        )
      );
    }
    async function getTopicsRequest() {
      getTopics((response) =>
        setTopics(
          response["data"].map((data) => ({
            id: data.id,
            name: data.name,
            value: false,
          }))
        )
      );
    }
    async function getProjectsRequest() {
      getbasicProjectsInfo((response) => setProjects(response["data"]));
    }

    getImpactAreasRequest();
    getTechsRequest();
    getTopicsRequest();
    getProjectsRequest();
    // fetchImageUrls();
  }, []);


  return (
    <div>
      <Canvas />
      <NavBar />

      {/* Impact Areas */}
      <Container className="filters">
        <h1 className="slogan"> Coding with Purpose</h1>

        {/* CAROUSEL */}
        <Carusel />

        {/* EMAIL BOX */}
        <EmailBox />


        {/* FILTERS */}
        <Filter
          data={ImpactAreas}
          css="btn-space btn-techs"
          onChange={handleSubmitFilters}
          handleChanges={handleChanges}
          setValues={setImpactAreas}
        />
        <br></br>
        <br></br>
        {/* topics */}
        <Filter
          data={topics}
          css="btn-sm btn-techs"
          onChange={handleSubmitFilters}
          handleChanges={handleChanges}
          setValues={setTopics}
        />
        <br></br>
        <br></br>
        {/* Technologies */}
        <Filter
          data={techs}
          css="btn-sm btn-techs"
          onChange={handleSubmitFilters}
          handleChanges={handleChanges}
          setValues={setTechs}
        />
      </Container>

      <br></br>
      <br></br>

      {/* CARDS */}
      <Container className="filters-cards">
        <Row>
          {projects && projects.length > 0 ? (
            projects.map((p, index) => (
              <Card
                id={p.id}
                key={p.id}
                createdAt={p.created_at}
                // logo={imageUrls[index]}
                // logo={`${url}/${p.logo}`}
                logo={`https://res.cloudinary.com/dnti3vb59/image/upload/v1/${p.logo}`}
                projectTitle={p.name}
                organizationName={p.org_name}
                impactAreas={p.impact_areas}
                skills={p.technologies}
              />
            ))
          ) : (
            <div className="no-results">No results found.</div>
          )}

        </Row>
       
       

      </Container>

      <FeedbackBox />

      <Footer/>

    </div>
  );
}

export default Home;
