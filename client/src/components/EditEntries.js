import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';


function EditEntries(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [day, setDay]=useState(props.entry.day.substring(0, props.entry.day.indexOf("T")));
   
  const [sunrise, setSunrise]=useState(props.entry.sunrise);
  const [description, setDescription]=useState(props.entry.description)
  const id = props.entry.id;
  const handleShow = () => {
    setDay(props.entry.day.substring(0, props.entry.day.indexOf("T")));   
    
    setSunrise(props.entry.sunrise);
    setDescription(props.entry.description);
    setShow(true);
  }
  
  

  function changeHandler1(e){
    setDay(e.target.value); 
  }
  function changeHandler2(e){
    setSunrise(e.target.value);
  }
  function changeHandler3(e){
    setDescription(e.target.value);
  }

  const clickHandler = async (e)=>{
    e.preventDefault();
    console.log(day)
    
    const body = {
      day: day,
      sunrise: sunrise,
      description:description
    };
  

    try{
        const res = await fetch(`/timer/${id}`, {
          method:"PUT",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(body)
        });
       
        window.location="/"
        

    } catch (err){
      console.error(err.message)
    }

    handleClose();
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
          <Button variant="primary" id={id} onClick={clickHandler}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditEntries;