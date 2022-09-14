import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "./Management.scss";
import ModalCreateManagement from "./ModalCreateManagement";
import ModalUpdateManagement from "./ModalUpdateManagement";

const Management = () => {
  const [showModalCreateManagement, setShowModalCreateManagement] =
    useState(false);
  const [showModalUpdateManagement, setShowModalUpdateManagement] =
    useState(false);
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
          <Button
            variant="success"
            onClick={() => setShowModalCreateManagement(true)}
          >
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
              <Button
                variant="primary"
                className="btn"
                onClick={() => setShowModalUpdateManagement(true)}
              >
                Sửa
              </Button>
              <Button variant="danger">Xóa</Button>
            </td>
          </tr>
        </tbody>
        {
          <ModalCreateManagement
            show={showModalCreateManagement}
            setShow={setShowModalCreateManagement}
          />
        }
        {
          <ModalUpdateManagement
            show={showModalUpdateManagement}
            setShow={setShowModalUpdateManagement}
          />
        }
      </Table>
    </div>
  );
};

export default Management;
