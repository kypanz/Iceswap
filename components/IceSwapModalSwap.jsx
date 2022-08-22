import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function IceSwapModalSwap({ changeTokenSelected, supportedTokens, tokenType  }) {

  // variables
  const [show, setShow] = useState(false);
  const [actualToken, setActualToken] = useState('');

  // functions
  const handleClose = () => {
    changeTokenSelected(actualToken,tokenType);
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const chToken = (e) => {
    setActualToken(e.target.value);
  }

  useEffect(()=>{

  },[]);

  // render
  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{marginTop:'10px',marginBottom:'10px'}} >
        Change token
      </Button>

      <Modal show={show} onHide={handleClose} style={{color:'white'}} key={tokenType}>
        <Modal.Header closeButton>
          <Modal.Title> Select Token </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Token to swap : </Form.Label>
                <input list="browsers" name="myBrowser" style={{marginLeft:'35px',marginTop:'15px'}} onChange={(e)=>chToken(e)} />
                <datalist id="browsers">
                    <option name="addressTokenHere" value="Filecoin" />
                    {/* 
                      cont[0] => address
                      cont[1] => info of that token
                    */}
                    {supportedTokens.map((cont,index)=>{
                      return <option name={cont[0]} value={cont[1].name} key={cont[0]} > {cont[0]} </option>
                    })}
                </datalist>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Select
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default IceSwapModalSwap;