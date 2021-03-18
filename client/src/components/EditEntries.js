import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';


function EditEntries(entry) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function changeHandler1(){
      return 

  }
  function changeHandler2(){
      return

  }
  function changeHandler3(){
      return

  }
  function onSubmitForm(){
      return
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
        <Form onSubmit={onSubmitForm}>
        <Form.Row>
            <Col>
                <Form.Control type="date" value={entry.day} onChange={changeHandler1}/>
            </Col>
            <Col>
                <Form.Control type="time" value={entry.sunrise} onChange={changeHandler2}/>
            </Col>
        </Form.Row>
        <Form.Row>
            <Col>
                <Form.Control type="text" value={entry.description} onChange={changeHandler3}/>
            </Col>
        </Form.Row>        
        </Form>
       </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditEntries;