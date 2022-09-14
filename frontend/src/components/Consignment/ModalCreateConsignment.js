import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Row, Col } from "react-bootstrap";
import "./Consignment.scss";

const ModalCreateConsignment = (props) => {
  const { show, setShow } = props;
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title className="total">Thêm Hàng Hóa Nhập Kho</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Row>
                <Form.Label>Tên Hàng Hóa</Form.Label>
                <Form.Control
                  type="text"
                  style={{ width: "90%", marginLeft: "3%" }}
                />
              </Row>
              <Row>
                <Form.Label>Số Lô</Form.Label>
                <Form.Control
                  type="text"
                  style={{ width: "90%", marginLeft: "3%" }}
                />
              </Row>
            </Col>
            <Col>
              <Row>
                <Form.Label>Nhà Cung Cấp</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  style={{ width: "90%", marginLeft: "3%" }}
                >
                  <option>Chọn nhà Cung Cấp</option>
                  <option value="1">CTTP dược phẩn trung ương 2</option>
                </Form.Select>
              </Row>
              <Row>
                <Form.Label>Ngày Nhập Kho</Form.Label>
                <Form.Control
                  type="date"
                  style={{ width: "90%", marginLeft: "3%" }}
                />
              </Row>
            </Col>
          </Row>
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

export default ModalCreateConsignment;
