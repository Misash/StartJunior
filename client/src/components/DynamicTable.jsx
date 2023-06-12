import React from "react";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { getTechs } from "../api/api";
import "../css/DynamicTable.css"

function DynamicTable({ inputFields, techs, types, expLevels, setInputFields }) {

  // const [inputFields, setInputFields] = useState([
  //   {
  //     skill: "",
  //     type: "",
  //     expLevel: "",
  //   },
  // ]);



  const addInputField = (evnt) => {
    evnt.preventDefault();
    // console.log(inputFields)
    if (inputFields[inputFields.length - 1].skill !== ""
      && inputFields[inputFields.length - 1].type !== ""
      && inputFields[inputFields.length - 1].expLevel !== ""
    ) {
      setInputFields([
        ...inputFields,
        {
          skill: "",
          type: "",
          expLevel: "",
        },
      ]);
    }
  };


  function removeInputFields(evnt) {
    evnt.preventDefault();
    // console.log(evnt.target)
    const { id } = evnt.target
    const rows = [...inputFields];
    rows.splice(id, 1);
    setInputFields(rows);
  };


  const handleChange = (index, evnt) => {
    console.log(index, evnt)
    // const { name, value } = evnt.target;
    const { name, value } = evnt;
    const list = [...inputFields];
    list[index][name] = value;
    setInputFields(list);
    // console.log("LIST:",list)
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8">
          {inputFields.map((data, index) => {
            const { skill, type, expLevel } = data;
            return (
              <div className="row my-3" key={index}>
                <div className="col">
                  <div className="form-group">


                    <Dropdown
                      value={skill}
                      name="skill"
                      onSelect={(evnt) => handleChange(index, { name: "skill", value: evnt }) }
                    >
                      <Dropdown.Toggle variant="outline-info" id="dropdown-basic">
                        { (skill === "") ? "Tech" : skill}
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="scrollable-menu">

                        {techs && techs.map((tech) => (
                          <Dropdown.Item eventKey={tech.name} >{tech.name}</Dropdown.Item>
                        ))}
                      </Dropdown.Menu>

                    </Dropdown>

                    {/* <input
                      type="text"
                      onChange={(evnt) => handleChange(index, evnt)}
                      value={skill}
                      name="skill"
                      className="form-control"
                      placeholder="Full Name"
                    /> */}

                  </div>
                </div>
                <div className="col">


                  <Dropdown
                    onSelect={(evnt) => handleChange(index, { name: "type", value: evnt })}
                  >
                    <Dropdown.Toggle variant="outline-info" id="dropdown-basic">
                      {(type === "") ? "Type" : type}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {types && types.map((type) => (
                        <Dropdown.Item eventKey={type.name} >{type.name}</Dropdown.Item>
                      ))}

                    </Dropdown.Menu>

                  </Dropdown>

                  {/* <input
                    type="email"
                    onChange={(evnt) => handleChange(index, evnt)}
                    value={emailAddress}
                    name="emailAddress"
                    className="form-control"
                    placeholder="Email Address"
                  /> */}



                </div>
                <div className="col">

                  <Dropdown
                    onSelect={(evnt) => handleChange(index, { name: "expLevel", value: evnt })}
                  >
                    <Dropdown.Toggle variant="outline-info" id="dropdown-basic">
                      {(expLevel === "") ? "Exp. Level" : expLevel}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {expLevels && expLevels.map((expLevel) => (
                        <Dropdown.Item eventKey={expLevel.name} >{expLevel.name}</Dropdown.Item>
                      ))}
                    </Dropdown.Menu>

                  </Dropdown>



                  {/* <input
                    type="text"
                    onChange={(evnt) => handleChange(index, evnt)}
                    value={salary}
                    name="salary"
                    className="form-control"
                    placeholder="Salary"
                  /> */}


                </div>
                <div className="col">
                  {inputFields.length !== 1 ? (
                    <button
                      id={index}
                      className="btn btn-outline-danger"
                      onClick={(e) => removeInputFields(e)}
                    >
                      Remove
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}

          <div className="row">
            <div className="col-sm-12">
              <button
                className="btn btn-outline-success "
                onClick={addInputField}
              >
                Add New
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-4"></div>
    </div>
  );
}

export default DynamicTable;
