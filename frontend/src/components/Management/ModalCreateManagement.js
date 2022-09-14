import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "./Management.scss";

const ModalCreateManagement = (props) => {
  const { show, setShow } = props;
  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title className="total">Thêm Mới Kệ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên Kệ</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ghi Chú</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success">THÊM MỚI</Button>
          <Button variant="danger" onClick={handleClose}>
            QUAY LẠI
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateManagement;
