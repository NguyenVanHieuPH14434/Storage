import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";
const ModalDeleteConsignment = (props) => {
  const { show, setShow, dataDelete, fetchListConsignments } = props;
  const handleClose = () => {
    setShow(false);
  };

  const deleteConsignment = (_id) => {
    return axios.delete(`http://localhost:4000/api/consignment/delete/${_id}`);
  };

  const handleSubmitDeleteUser = async () => {
    let data = await deleteConsignment(dataDelete._id);
    // console.log(">>> check respon ", data);

    handleClose();
    toast.success("Bạn đã xóa thành công");
    await fetchListConsignments();
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Xóa hàng hóa </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa hàng hóa:{" "}
          <b>
            {dataDelete && dataDelete.product_name
              ? dataDelete.product_name
              : ""}
          </b>{" "}
          ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Quay lại
          </Button>
          <Button variant="primary" onClick={handleSubmitDeleteUser}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteConsignment;
