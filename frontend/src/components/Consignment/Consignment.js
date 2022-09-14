import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Row, Col } from "react-bootstrap";
import "./Consignment.scss";
// import { getAllConsigment } from "../../services/apiServices";
import ModalCreateConsignment from "./ModalCreateConsignment";
import ModalUpdateConsignment from "./ModalUpdateConsignment";
import axios from "axios";
import ModalDeleteConsignment from "./ModalDeleteConsignment";

const Consignment = () => {
  const [showModalCreateConsignment, setShowModalCreateConsignment] =
    useState(false);
  const [showModalUpdateConsignment, setShowModalUpdateConsignment] =
    useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [showModalDeleteConsignment, setShowModalDeleteConsignment] =
    useState(false);
  const [dataDelete, setDataDelete] = useState({});

  const [listConsignments, setListConsignments] = useState([]);
  const [listProducer, setListProducer] = useState([]);

  const handleShowCreateConsignment = () => {
    setShowModalCreateConsignment(true);
  };

  const handleShowUpdateConsignment = (item) => {
    setShowModalUpdateConsignment(true);
    setListConsignments(item);
    setDataUpdate(item);
  };

  const handleShowDeleteConsignment = (item) => {
    setShowModalDeleteConsignment(true);
    setDataDelete(item);
  };

  useEffect(() => {
    fetchListConsignments();
    fetchListProducer();
  }, []);

  const getAllConsigment = () => {
    return axios.get("http://localhost:4000/api/consignment/list");
  };

  const fetchListConsignments = async () => {
    let response = await getAllConsigment();
    console.log(response);
    if (response) {
      setListConsignments(response.data);
    }
  };
  const getAllProducer = () => {
    return axios.get("http://localhost:4000/api/producer/list");
  };

  const fetchListProducer = async () => {
    let response = await getAllProducer();
    console.log(response);
    if (response) {
      setListProducer(response.data);
    }
  };
  const getConsigment = (_id) => {
    return axios.get(`http://localhost:4000/api/consignment/edit/${_id}`);
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
          {/* <tr>
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
          </tr> */}
          {listConsignments &&
            listConsignments.length > 0 &&
            listConsignments.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item._id}</td>
                  <td>{item.product_name}</td>
                  <td>{item.lot_number}</td>
                  <td>{item.producer_name}</td>
                  <td>{item.ctime}</td>
                  <td>
                    <Button
                      variant="primary"
                      className="btn"
                      onClick={() => handleShowUpdateConsignment(item)}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleShowDeleteConsignment(item)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              );
            })}
          {listConsignments && listConsignments.length === 0 && (
            <tr>
              <td colSpan={"7"} align={"center"}>
                Không có dữ liệu hiển thị
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {
        <ModalCreateConsignment
          show={showModalCreateConsignment}
          setShow={setShowModalCreateConsignment}
          listProducer={listProducer}
          fetchListConsignments={fetchListConsignments}
        />
      }
      {
        <ModalUpdateConsignment
          show={showModalUpdateConsignment}
          setShow={setShowModalUpdateConsignment}
          dataUpdate={dataUpdate}
          listProducer={listProducer}
          fetchListConsignments={fetchListConsignments}
        />
      }
      {
        <ModalDeleteConsignment
          show={showModalDeleteConsignment}
          setShow={setShowModalDeleteConsignment}
          dataDelete={dataDelete}
          listProducer={listProducer}
          fetchListConsignments={fetchListConsignments}
        />
      }
    </div>
  );
};

export default Consignment;
