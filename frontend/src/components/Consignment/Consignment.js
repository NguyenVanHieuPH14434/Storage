import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "./Consignment.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalCreateConsignment from "./ModalCreateConsignment";
import ModalUpdateConsignment from "./ModalUpdateConsignment";
import ModalDeleteConsignment from "./ModalDeleteConsignment";
import { getAllConsigment, getAllProducer } from "../../services/apiServices";

const Consignment = () => {
  const [listConsignments, setListConsignments] = useState([]);
  const [listProducer, setListProducer] = useState([]);

  const [showModalCreateConsignment, setShowModalCreateConsignment] =
    useState(false);

  const [showModalUpdateConsignment, setShowModalUpdateConsignment] =
    useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

  const [showModalDeleteConsignment, setShowModalDeleteConsignment] =
    useState(false);
  const [dataDelete, setDataDelete] = useState({});

  const handleShowCreateConsignment = () => {
    setShowModalCreateConsignment(true);
  };

  const handleShowUpdateConsignment = (consignment) => {
    setShowModalUpdateConsignment(true);
    setDataUpdate(consignment);
  };

  const handleShowDeleteConsignment = (item) => {
    setShowModalDeleteConsignment(true);
    setDataDelete(item);
  };

  const fetchListConsignments = async () => {
    let response = await getAllConsigment();
    if (response) {
      setListConsignments(response.data.docs);
    }
  };

  const fetchListProducer = async () => {
    let response = await getAllProducer();
    if (response) {
      setListProducer(response.data.docs);
    }
  };

  useEffect(() => {
    fetchListConsignments();
    fetchListProducer();
  }, []);

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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Consignment;
