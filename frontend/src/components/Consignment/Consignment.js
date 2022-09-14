import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Row, Col } from "react-bootstrap";
import "./Consignment.scss";
import ModalCreateConsignment from "./ModalCreateConsignment";
import ModalUpdateConsignment from "./ModalUpdateConsignment";

const Consignment = () => {
  const [showModalCreateConsignment, setShowModalCreateConsignment] =
    useState(false);
  const [showModalUpdateConsignment, setShowModalUpdateConsignment] =
    useState(false);
  const handleShowCreateConsignment = () => {
    setShowModalCreateConsignment(true);
  };

  const handleShowUpdateConsignment = () => {
    setShowModalUpdateConsignment(true);
  };

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
          <Button variant="success" onClick={handleShowCreateConsignment}>
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
              <Button
                variant="primary"
                className="btn"
                onClick={handleShowUpdateConsignment}
              >
                Sửa
              </Button>
              <Button variant="danger">Xóa</Button>
            </td>
          </tr>
        </tbody>
      </Table>
      {
        <ModalCreateConsignment
          show={showModalCreateConsignment}
          setShow={setShowModalCreateConsignment}
        />
      }
      {
        <ModalUpdateConsignment
          show={showModalUpdateConsignment}
          setShow={setShowModalUpdateConsignment}
        />
      }
    </div>
  );
};

export default Consignment;
