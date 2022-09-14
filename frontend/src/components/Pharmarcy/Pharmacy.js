import React, { useState } from "react";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Row, Col } from "react-bootstrap";
import "./Pharmacy.scss";

const Pharmacy = () => {
  const [show1, setShow1] = useState(false); 

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  return (
    <div className="pharmacy">
      <Tabs defaultActiveKey="first">
        <Tab eventKey="first" title="Thuốc">
          <Form>
            <Form.Group
              className="mb-3 fcontainer"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label className="ftext">Tìm Kiếm Thuốc</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên thuốc"
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
                <th>Số Lô</th>
                <th>Tên Hàng Hóa</th>
                <th>Kệ</th>
                <th>Loại</th>
                <th>SL</th>
                <th>Mã QR</th>
                <th>NSX</th>
                <th>HSD</th>
                <th>Ngày Nhập</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Lô 1</td>
                <td>Amino Plus</td>
                <td>Số 1</td>
                <td>Hộp</td>
                <td>7</td>
                <td></td>
                <td>21-07-2020</td>
                <td>21-07-2022</td>
                <td>21-08-2020</td>
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
              <Modal.Title className="total">Thêm Lô</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <Row>
                    <Form.Label>Tên Kệ</Form.Label>
                    <Form.Control
                      type="text"
                      style={{ width: "90%", marginLeft: "3%" }}
                    />
                  </Row>
                  <Row>
                    <Form.Label>Tên Lô</Form.Label>
                    <Form.Control
                      type="text"
                      style={{ width: "90%", marginLeft: "3%" }}
                    />
                  </Row>
                  <Row>
                    <Form.Label>Sản Phẩm</Form.Label>
                    <Form.Control
                      type="text"
                      style={{ width: "90%", marginLeft: "3%" }}
                    />
                  </Row>
                  <Row>
                    <Form.Label>Phân Loại</Form.Label>
                    <Form.Select aria-label="Default select example"
                      style={{ width: "90%", marginLeft: "3%" }}
                    >
                      <option>Chọn Phân Loại</option>
                      <option value="1">Thuốc</option>
                      <option value="2">Vật Tư</option>
                    </Form.Select>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Form.Label>Số Lượng</Form.Label>
                    <Form.Control
                      type="text"
                      style={{ width: "90%", marginLeft: "3%" }}
                    />

                  </Row>
                  <Row>
                    <Form.Label>Ngày Nhập Kho</Form.Label>
                    <Form.Control
                      type="date"
                      style={{ width: "90%", marginLeft: "3%" }}
                    />
                  </Row>
                  <Row>
                    <Form.Label>Ngày Sản Xuất</Form.Label>
                    <Form.Control
                      type="date"
                      style={{ width: "90%", marginLeft: "3%" }}
                    />
                  </Row>
                  <Row>
                    <Form.Label>Ngày Hết Hạn</Form.Label>
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
                Sửa Thông Tin Lô
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <Row>
                    <Form.Label>Tên Kệ</Form.Label>
                    <Form.Control
                      type="text"
                      style={{ width: "90%", marginLeft: "3%" }}
                    />
                  </Row>
                  <Row>
                    <Form.Label>Tên Lô</Form.Label>
                    <Form.Control
                      type="text"
                      style={{ width: "90%", marginLeft: "3%" }}
                    />
                  </Row>
                  <Row>
                    <Form.Label>Sản Phẩm</Form.Label>
                    <Form.Control
                      type="text"
                      style={{ width: "90%", marginLeft: "3%" }}
                    />
                  </Row>
                  <Row>
                    <Form.Label>Phân Loại</Form.Label>
                    <Form.Select aria-label="Default select example"
                      style={{ width: "90%", marginLeft: "3%" }}
                    >
                      <option>Chọn Phân Loại</option>
                      <option value="1">Thuốc</option>
                      <option value="2">Vật Tư</option>
                    </Form.Select>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Form.Label>Số Lượng</Form.Label>
                    <Form.Control
                      type="text"
                      style={{ width: "90%", marginLeft: "3%" }}
                    />

                  </Row>
                  <Row>
                    <Form.Label>Ngày Nhập Kho</Form.Label>
                    <Form.Control
                      type="date"
                      style={{ width: "90%", marginLeft: "3%" }}
                    />
                  </Row>
                  <Row>
                    <Form.Label>Ngày Sản Xuất</Form.Label>
                    <Form.Control
                      type="date"
                      style={{ width: "90%", marginLeft: "3%" }}
                    />
                  </Row>
                  <Row>
                    <Form.Label>Ngày Hết Hạn</Form.Label>
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
        </Tab>
        <Tab eventKey="second" title="Vật Tư">
          Vật Tư
        </Tab>
      </Tabs>
    </div>
  );
};

export default Pharmacy;
