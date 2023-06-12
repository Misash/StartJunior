import React from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import "../css/Filter.css"


function Filter({ data, onChange, handleChanges, setValues, css }) {
    return (
      <>
        {data && data.map((item, index) => (
          <ToggleButton
            key={index + item.name}
            className= {css}
            id={index + item.name}
            type="checkbox"
            variant="outline-info"
            checked={data[index].value}
            value="1"
            onChange={(e) => {
              handleChanges(index, setValues, data);
              onChange(e);
            }}
         
          >
            {item.name}
          </ToggleButton>
        ))}
      </>
    );
  }

export default Filter