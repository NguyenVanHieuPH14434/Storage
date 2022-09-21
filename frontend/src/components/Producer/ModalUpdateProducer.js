import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import "./Producer.scss";
import Axios from "axios";
const ModalUpdateProducer = (props) => {
  const { show, setShow, handelcheck,setHandleCheck, index } = props;
  const handleClose = () => {
    setShow(false);
  };

  const handleDelete = (index) => {
     Axios.delete(`http://localhost:4000/api/producer/delete/${index}`)
          .then(() => {
              setShow(!show)
               setHandleCheck(!handelcheck)
          })
          .catch(function (error) {});
  }
  return (
    <>
      <Modal size="lg" backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="total">
            Cảnh Báo !
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          bạn có chắc chắn muốn xóa  không ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => handleDelete(index)}>delete</Button>
          <Button variant="danger" onClick={handleClose}>
            HỦY
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateProducer;
