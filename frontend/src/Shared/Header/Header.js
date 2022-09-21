import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import logo from "./images/logoPK.png";
import transaction from "./images/icon-transaction.svg";
import inventory from "./images/inventory.svg";
import user from "./images/user.svg";

import { IoMdLock } from "react-icons/io";
import { MdOutlineExitToApp } from "react-icons/md";
import "./Header.scss";

const Header = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Navbar bg="success" expand="sm">
        <Container fluid>
          <Navbar.Brand>
            <img src={logo} alt="logo" className="logo"></img>
          </Navbar.Brand>
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0 menu">
              <Nav.Item className="transaction">
                <Link to="/transaction" className="link">
                  <img
                    src={transaction}
                    alt="transaction"
                    className="img1"
                  ></img>
                  <p className="para1">GIAO DỊCH</p>
                </Link>
              </Nav.Item>
              <Dropdown className="inventory">
                <Dropdown.Toggle variant="success" className="container1">
                  <img src={inventory} alt="inventory" className="img2"></img>
                  <p className="para2">KHO</p>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/producer">
                    Nhà Cung Cấp
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/consignment">
                    Nhập Lô
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/storage">
                    Lưu kho
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/pharmacy">
                    Thuốc
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/management">
                    Quản Lý Kệ thuốc
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
            <Dropdown className="user">
              <Dropdown.Toggle variant="success" className="container2">
                <img src={user} alt="user"></img>
                <p className="para3">NGUYỄN THÙY TRINH</p>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleShow} className="lock">
                  <IoMdLock size={25.6} />
                  <p className="name">Đổi mật khẩu</p>
                </Dropdown.Item>
                <NavDropdown.Divider />
                <Dropdown.Item className="exit">
                  <MdOutlineExitToApp size={25.6} />
                  <p className="name">Thoát</p>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="total">Cập nhật mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Họ Tên</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên Tài Khoản</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Mật Khẩu Mới</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Xác Nhận Lại Mật Khẩu Mới</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success">CẬP NHẬT</Button>
          <Button variant="danger" onClick={handleClose}>
            HỦY
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
