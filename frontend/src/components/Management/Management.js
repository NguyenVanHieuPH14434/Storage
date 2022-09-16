import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from "react-paginate";
import "./Management.scss";
import ModalCreateManagement from "./ModalCreateManagement";
import ModalUpdateManagement from "./ModalUpdateManagement";

const Management = () => {
  // Get
  const [shelf, setShelf] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/api/shelf/list").then((res) => setShelf(res.data.docs));
  }, [shelf]);

  // Change 
  const [id, setId] = useState("");
  const [nameUpdate, setNameUpdate] = useState("");
  const [descUpdate, setDescUpdate] = useState("");
  
  const handleChange = (id) => {
    setId(id);
    axios.get(`http://localhost:4000/api/shelf/edit/${id}`).then((res) => {
      setNameUpdate(res.data.shelf_name);
      setDescUpdate(res.data.shelf_desc);
      setShowModalUpdateManagement(true);
    })
  }

  // Delete 
  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/api/shelf/delete/${id}`);
  }

  // Search
  const [search, setsearch] = useState("");

  // Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const userPerPage = 7;
  const pagesVisited = pageNumber * userPerPage;
  const pageCount = Math.ceil(shelf.length / userPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }
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
          <Form.Control type="text" placeholder="Nhập tên kệ" className="fip" value={search} onChange = {(e) => setsearch(e.target.value)}/>
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
            <th>ID</th>
            <th>Tên kệ</th>
            <th>Ghi chú</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {shelf
          .slice(pagesVisited, pagesVisited + userPerPage)
          .filter((element) => {
            if(element.shelf_name.includes(search)) {
              return element;
            }
          })
          .map((element, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{element._id}</td>
                <td>{element.shelf_name}</td>
                <td>{element.shelf_desc}</td>
                <td>
                  <Button
                    variant="primary"
                    className="btn"
                    onClick={() => handleChange(element._id)}
                  >
                    Sửa
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(element._id)}>Xóa</Button>
                </td>
              </tr>
            );
          })}
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
            id={id}
            nameUpdate = {nameUpdate}
            setName = {setNameUpdate}
            descUpdate = {descUpdate}
            setDesc = {setDescUpdate}
          />
        }
      </Table>
      <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />

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

export default Management;
