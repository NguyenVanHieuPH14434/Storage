import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Row, Col } from "react-bootstrap";
import "./Consignment.scss";

const Consignment = () => {
  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  return (
    <div className="consignment">
      <p className="title">Danh sách nhập kho</p>
      <Form>
        <Form.Group
          className="mb-3 fcontainer"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label className="ftext">Tìm Kiếm Hàng Hóa</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhâp tên hàng hóa"
            className="fip"
          />
          <Button variant="success" onClick={handleShow1}>
            THÊM MỚI
          </Button>
        </Form.Group>
      </Form>
      <Table striped bordered hover size="md">
        <thead>
          <tr>
            <th>STT</th>
            <th>ID</th>
            <th>Hàng Hóa</th>
            <th>Số Lô</th>
            <th>Nhà Cung Cấp</th>
            <th>Ngày Nhập Kho</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>5NJ70UUXAI</td>
            <td>Amino Plus</td>
            <td>Lô 1</td>
            <td>CTTP dược phẩn trung ương 2</td>
            <td>21-08-2022</td>
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
          <Button variant="danger" onClick={handleClose1}>
            QUAY LẠI
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal size="lg" show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title className="total">
            Sửa Thông Tin Hàng Hóa
          </Modal.Title>
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
          <Button variant="success">CẬP NHẬT</Button>
          <Button variant="danger" onClick={handleClose2}>
            HỦY
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Consignment;
