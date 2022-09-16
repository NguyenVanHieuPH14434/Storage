import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Notification({ description,title, show, setShow, index }) {
    const handleClose = () => setShow(false);
    const handleDelete = (i) => {
        axios.delete(`http://localhost:4000/api/storage/delete/${i}`)
            .then((res, req) => {
                window.location.reload()
                setShow(false)
                console.log('success');
            })
            .catch(() => {
                console.log('error');
            });
    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{description}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={()=>handleDelete(index)}>
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Notification;
