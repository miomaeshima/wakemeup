import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';


function EditEntries(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [day, setDay]=useState(props.entry.day.substring(0, props.entry.day.indexOf("T")));
  const [sunrise, setSunrise]=useState(props.entry.sunrise);
  const [description, setDescription]=useState(props.entry.description)

  console.log(day.substring(0, day.indexOf("T")))

  function changeHandler1(e){
    setDay(e.target.value); 
  }
  function changeHandler2(e){
    setSunrise(e.target.value);
  }
  function changeHandler3(e){
    setDescription(e.target.value);
  }

  function clickHandler(){
      console.log(day, sunrise, description)
  }
  

  

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <Form.Row>
            <Col>
                <Form.Control type="date" value={day} onChange={changeHandler1}/>
            </Col>
            <Col>
                <Form.Control type="time" value={sunrise} onChange={changeHandler2}/>
            </Col>
        </Form.Row>
        <Form.Row>
            <Col>
                <Form.Control type="text" value={description} onChange={changeHandler3}/>
            </Col>
        </Form.Row>        
        </Form>
       </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={clickHandler}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditEntries;