import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Row, Col } from "react-bootstrap";
import "./Producer.scss";
import ModalCreateProducer from "./ModalCreateProducer";
import ModalUpdateProducer from "./ModalUpdateProducer";

const Producer = () => {
  const [showModalCreateProducer, setShowModalCreateProducer] = useState(false);
  const [showModalUpdateProducer, setShowModalUpdateProducer] = useState(false);

  return (
    <div className="producer">
      <p className="title">Danh sách nhà cung cấp</p>
      <Form>
        <Form.Group
          className="mb-3 fcontainer"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label className="ftext">Tìm Kiếm Nhà Cung Cấp</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên nhà cung cấp"
            className="fip"
          />
          <Button
            variant="success"
            onClick={() => setShowModalCreateProducer(true)}
          >
            THÊM MỚI
          </Button>
        </Form.Group>
      </Form>
      <Table striped bordered hover size="md">
        <thead>
          <tr>
            <th>STT</th>
            <th>ID</th>
            <th>Tên</th>
            <th>Địa Chỉ</th>
            <th>Số Điện Thoại</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>5NJ70UUXAI</td>
            <td>CTTP dược phẩn trung ương 2</td>
            <td>KCN Mê Linh Thanh Oai Hà Nội</td>
            <td>0984563147</td>
            <td>nguyenngocducdandon@gmail.com</td>
            <td>
              <Button
                variant="primary"
                className="btn"
                onClick={() => {
                  setShowModalUpdateProducer(true);
                }}
              >
                Sửa
              </Button>
              <Button variant="danger">Xóa</Button>
            </td>
          </tr>
        </tbody>
      </Table>
      {
        <ModalCreateProducer
          show={showModalCreateProducer}
          setShow={setShowModalCreateProducer}
        />
      }
      {
        <ModalUpdateProducer
          show={showModalUpdateProducer}
          setShow={setShowModalUpdateProducer}
        />
      }
    </div>
  );
};

export default Producer;
