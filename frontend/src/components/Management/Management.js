import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "./Management.scss";

const Management = () => {
  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false); 
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  return (
    <div className="management">
      <p className="title">Danh sách kệ</p>
      <Form>
        <Form.Group
          className="mb-3 fcontainer"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label className="ftext">Tìm Kiếm Kệ</Form.Label>
          <Form.Control type="text" placeholder="Nhập tên kệ" className="fip" />
          <Button variant="success" onClick={handleShow1}>
            THÊM MỚI
          </Button>
        </Form.Group>
      </Form>
      <Table striped bordered hover size="md">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên kệ</th>
            <th>Ghi chú</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Số 1</td>
            <td>5/10</td>
            <td>
              <Button variant="primary" className="btn" onClick={handleShow2}>
                Sửa
              </Button>
              <Button variant="danger">Xóa</Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <Modal size="lg" show={show1} onHide={handleClose1}>
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
          <Button variant="danger" onClick={handleClose1}>
            QUAY LẠI
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal size="lg" show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title className="total">Sửa Thông Tin Kệ</Modal.Title>
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
          <Button variant="success">CẬP NHẬT</Button>
          <Button variant="danger" onClick={handleClose2}>
            HỦY
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Management;
