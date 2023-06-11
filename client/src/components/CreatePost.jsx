import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../css/CreatePost.css";
import DynamicTable from "./DynamicTable";
import Dropdown from "react-bootstrap/Dropdown";
import HtmlEditor from "./HtmlEditor";
import Modal from 'react-bootstrap/Modal';
import ToggleButton from "react-bootstrap/ToggleButton";
import { Alert } from 'react-bootstrap';
import {
  createProject, getTechs,
  getTypes,
  getExpLevels,
  getImpactAreas,
  getTopics
} from "../api/api.js"
import axios from "axios"

function CreatePost() {

  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [status, setStatus] = useState(false)
  const [showChecker, setShowChecker] = useState(false);
  const handleShowChecker = () => setShowChecker(true);
  const handleCloseChecker = () => {
    // id created succesfully
    if (status) {
      // redirect to home
      setShowChecker(false);
      window.location.href = '/';
    } else {
      //reload
      setShowChecker(false);
      window.location.reload();
    }
  }

  //Alert logo handler 
  const [showInvalidFormatAlert, setShowInvalidFormatAlert] = useState(false);


  //project name
  const [projectName, setProjectName] = useState("");
  //description
  const [description, setDescription] = useState("");
  //skills
  const [inputFields, setInputFields] = useState([
    {
      skill: "",
      type: "",
      expLevel: "",
    },
  ]);
  //skills/ technologies
  const [techs, setTechs] = useState()
  //organization name
  const [orgName, setOrgName] = useState("");
  //logo file img/png
  const [logo, setLogo] = useState(undefined)
  //impacts Areass
  const [impactAreas, setImpactAreas] = useState()
  // Topics
  const [topics, setTopics] = useState()
  // contact
  const [contact, setContact] = useState("")
  // website
  const [website, setWebsite] = useState("")
  //repository
  const [repo, setRepo] = useState("")


  const isValidUrl = urlString => {
    var inputElement = document.createElement('input');
    inputElement.type = 'url';
    inputElement.value = urlString;

    if (!inputElement.checkValidity()) {
      return false;
    } else {

      return true;
    }
  }

  const isValidEmail = str => {
    // Regular expression to check if string is email
    const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    return regexExp.test(str);
  }

  const isEmptySkill = () => {
    console.log(inputFields)
    return !(inputFields[0].skill.length && inputFields[0].type.length && inputFields[0].expLevel.length)
  }

  const isEmptyImpactAreas = () => {
    for (let i = 0; i < impactAreas.length; i++) {
      if (impactAreas[i].value) {
        return false
      }
    }
    return true
  }

  const isEmptyTopics = () => {
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].value) {
        return false
      }
    }
    return true
  }

  const isEmptyTechs = () => {
    for (let i = 0; i < techs.length; i++) {
      if (techs[i].value) {
        return false
      }
    }
    return true
  }





  const handleChanges = (index, setData, data) => {
    let newArr = [...data];
    newArr[index].value = !newArr[index].value;
    setData(newArr);
  };

  //GET REQUESTS

  useEffect(() => {


    async function getTechsRequest() {
      getTechs((response) => setTechs(
        response["data"].map(data => ({
          id: data.id,
          name: data.name,
          value: false
        }))
      ))
    }
    // async function getTechsRequest() {
    //   getTechs((response) => setTechs(response.data))
    // }
    // async function getTypesRequest() {
    //   getTypes((response) => setTypes(response.data))
    // }
    // async function getExpLevelsRequest() {
    //   getExpLevels((response) => setExpLevels(response.data))
    // }

    async function getImpactAreasRequest() {
      getImpactAreas((response) => setImpactAreas(
        response["data"].map(data => ({
          id: data.id,
          name: data.name,
          value: false
        }))
      ))
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

    getTopicsRequest()
    getTechsRequest()
    getImpactAreasRequest()
  }, [])


  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (file && allowedTypes.includes(file.type)) {
      setLogo(file);
      setShowInvalidFormatAlert(false); // Hide the alert if a valid file is selected
    } else {
      // setLogo(null);
      setShowInvalidFormatAlert(true); // Show the alert for invalid file format
    }
  }



  //submit form to create a new Project
  const submitHandlr = (e) => {
    e.preventDefault();
    //check if any field is empty
    if (projectName.length && description.length && !isEmptyTechs() &&
       orgName.length && !isEmptyImpactAreas() && !isEmptyTopics() && contact.length
      && website.length && (logo != undefined)) {

    
      const data = new FormData()

     
      //adding topics
      topics.map((obj) => {
        if (obj.value) { data.append("topics", obj.id) }
      })

      //adding impactAreas
      impactAreas.map((obj) => {
        if (obj.value) { data.append("impactAreas", obj.id) }
      })

      //adding Techs
      techs.map((obj) => {
        if (obj.value) { data.append("techs", obj.id) }
      })


      data.append("projectName", projectName)
      data.append("description", description)
      data.append("orgName", orgName)
      data.append("logo", logo)
      data.append("contact", contact)
      data.append("website", website)
      // data.append("repo", repo)

      for (var [key, value] of data.entries()) {
        console.log(key, value);
      }

       //send data to server
       createProject(data, (response) => {
        if (response.status === 200) {
          setStatus(true)
          handleShowChecker()
        } else {
          setStatus(false)
          handleShowChecker()
        }
      });

    } else {
      handleShow()
    }
  }



  // console.log(description)

  return (
    <div>

      <NavBar />
      <Form className="myForm" >
        {/* Project Name */}
        <Form.Group className="mb-3" controlId="formProject">
          <Form.Label> Position </Form.Label>
          <Form.Control type="text" placeholder="Enter the position" onChange={(e) => setProjectName(e.target.value)} />
        </Form.Group>
        {/* Description */}
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <HtmlEditor setTextEditor={setDescription} />
        </Form.Group>
        {/* Skills */}

        <Form.Group className="mb-3" controlId="formSkills">
          <Form.Label>Skills</Form.Label> <br />
          {techs && techs.map((tec, index) => (
            <ToggleButton
              className="btn-space"
              id={index + tec.name}
              type="checkbox"
              variant="outline-info"
              checked={techs[index].value}
              value="1"
              onChange={(e) => handleChanges(index, setTechs, techs)}
              style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}
            >
              {tec.name}
            </ToggleButton>
          ))}
        </Form.Group>


        {/* Organization Name */}
        <Form.Group className="mb-3" controlId="formOrgName">
          <Form.Label>Organization Name </Form.Label>
          <Form.Control type="text" placeholder="Enter the organization name" 
          onChange={(e) => setOrgName(e.target.value)} />
        </Form.Group>


        {/* Logo */}
        <Form.Group className="mb-3" controlId="formLogo">
          <Form.Label>Logo</Form.Label>
          <Form.Control type="file" accept=".jpg, .jpeg, .png" onChange={(e) => handleLogoChange(e)} />
        </Form.Group>

         {/* Invalid Format Alert */}
         {showInvalidFormatAlert && (
          <Alert variant="danger" onClose={() => setShowInvalidFormatAlert(false)} dismissible>
            Invalid file format. Please select a JPG or PNG file.
          </Alert>
        )}

        {/* Impact Area */}
        <Form.Group className="mb-3" controlId="formImpactArea">
          <Form.Label>Impact Areas</Form.Label> <br />

          {impactAreas && impactAreas.map((area, index) => (
            <ToggleButton
              className="btn-space"
              id={index + area.name}
              type="checkbox"
              variant="outline-info"
              checked={impactAreas[index].value}
              value="1"
              onChange={(e) => handleChanges(index, setImpactAreas, impactAreas)}
              style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}
            >
              {area.name}
            </ToggleButton>
          ))}
        </Form.Group>

        {/* Topics */}
        <Form.Group className="mb-3" controlId="formTopics">
          <Form.Label>Topics</Form.Label> <br />

          {topics && topics.map((area, index) => (
            <ToggleButton
              className="btn-space "
              id={index + area.name}
              type="checkbox"
              variant="outline-info"
              checked={topics[index].value}
              value="1"
              onChange={(e) => handleChanges(index, setTopics, topics)}
              style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}
            >
              {area.name}
            </ToggleButton>
          ))}
        </Form.Group>

        {/* Contact */}
        <Form.Group className="mb-3" controlId="formContact">
          <Form.Label>Contact</Form.Label>
          <Form.Control type="text" placeholder="Enter email or link" onChange={(e) => setContact(e.target.value)} />
          <Form.Text className="text-muted">
            Email or link to contact you
          </Form.Text>
        </Form.Group>

        {/* Website */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Website</Form.Label>
          <Form.Control type="text" placeholder="Enter your website's link" 
          onChange={(e) => setWebsite(e.target.value)} />
        </Form.Group>

        <div style={{ textAlign: "center", padding: "1%" }} >
          <Button onClick={submitHandlr} variant="outline-info" type="submit" className="btn-lg">
            Submit
          </Button>
        </div>
      </Form>

      {/* Modal succesfully created */}
      <Modal
        show={showChecker}
        onHide={handleCloseChecker}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {status ? "Your project has been successfully created." :
            "Your project was not created successfully."}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseChecker}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal pop up*/}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Hey!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Don't forget to complete the fields:
          <ul>
            {!projectName.length && <li>Project Name</li>}
            {!description.length && <li>Description</li>}
            {techs && isEmptyTechs() && <li>Techs</li>}
            {!orgName.length && <li>Organization Name</li>}
            {impactAreas && isEmptyImpactAreas() && <li>Impact Area</li>}
            {topics && isEmptyTopics() && <li>Topics</li>}
            {!contact.length && <li>Contact</li>}
            {!website.length && <li>Website</li>}
            {logo === undefined && <li>Logo</li>}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


    </div>
  );
}

export default CreatePost;
