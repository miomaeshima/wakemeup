import React, { Fragment, useState } from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const InputEntries = () => {
  const [day, setDay] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [description, setDescrtiption] = useState("");

  const changeHandler1 = (e) => {
    
    setDay(e.target.value);
  };
  const changeHandler2 = (e) => {
    setSunrise(e.target.value);
  };
  const changeHandler3 = (e) => {
    setDescrtiption(e.target.value);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    
    const body = {
      day: day,
      sunrise: sunrise,
      description: description,
    };
    
    try {
      const response = await fetch("http://localhost:5000/timer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response)

      window.location="/"
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
    <Form onSubmit={onSubmitForm}>
    <Form.Row>
    <Col>
      <Form.Control type="date" value={day} onChange={changeHandler1}/>
    </Col>
    <Col>
      <Form.Control type="time" value={sunrise} onChange={changeHandler2}/>
    </Col>
    <Col>
      <Form.Control type="text" placeholder="what song?" value={description} onChange={changeHandler3}/>
    </Col>
    <Col>
     <Button variant="success" as="input" type="submit" value="Add" />
    </Col>
    </Form.Row>
    </Form>
    </Fragment>
  );
};


export default InputEntries;
