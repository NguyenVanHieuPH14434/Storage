import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './Consignment.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalCreateConsignment from './ModalCreateConsignment';
import ModalUpdateConsignment from './ModalUpdateConsignment';
import ModalDeleteConsignment from './ModalDeleteConsignment';
import { FaSearch } from 'react-icons/fa';
import {
    getAllConsigment,
    getAllProducer,
    getConsignmentWithPaginate,
    searchConsigment,
} from '../../services/apiServices';
import ReactPaginate from 'react-paginate';
import { toLower } from 'lodash';

const Consignment = () => {
    const [listConsignments, setListConsignments] = useState([]);
    const [listProducer, setListProducer] = useState([]);

    const [showModalCreateConsignment, setShowModalCreateConsignment] = useState(false);

    const [showModalUpdateConsignment, setShowModalUpdateConsignment] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});

    const [showModalDeleteConsignment, setShowModalDeleteConsignment] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [search, setSearch] = useState('');

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

    const fetchListConsignmentsWithPaginate = async (page) => {
        let response = await getConsignmentWithPaginate(page);
        if (response) {
            // console.log(response.data);
            setListConsignments(response.data.docs);
            setPageCount(response.data.totalPage);
        }
    };

    const fetchListProducer = async () => {
        let response = await getAllProducer();
        if (response) {
            setListProducer(response.data.docs);
        }
    };

    useEffect(() => {
        if (search === '') {
            fetchListConsignmentsWithPaginate(1);
            fetchListProducer();
        }

        setListConsignments(listConsignments.filter((item) => item.product_name.toLowerCase().includes(search)));
    }, [search]);

    const handlePageClick = (event) => {
        fetchListConsignmentsWithPaginate(+event.selected + 1);
        setCurrentPage(+event.selected + 1);
        // console.log(`User requested page number ${event.selected}`);
    };

    return (
        <div className="consignment">
            <br />
            <p className="title">Danh sách nhập kho</p>
            <br />
            <Form>
                <Form.Group className="mb-3 fcontainer" controlId="exampleForm.ControlInput1">
                    <Form.Label className="ftext">
                        <FaSearch className="fs-6 text-success" /> &nbsp;
                        <b className="text-success">Tìm Kiếm Hàng Hóa</b>
                    </Form.Label>
                    <Form.Control
                        type="text"
                        name="search"
                        onChange={(ev) => setSearch(ev.target.value)}
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
                        <th className="text-center">STT</th>
                        <th className="text-center">ID</th>
                        <th className="text-center">Hàng Hóa</th>
                        <th className="text-center">Số Lô</th>
                        <th className="text-center">Nhà Cung Cấp</th>
                        <th className="text-center">Ngày Nhập Kho</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listConsignments &&
                        listConsignments.length > 0 &&
                        listConsignments.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="text-center">{(currentPage - 1) * 10 + index + 1}</td>
                                    <td className="text-center">{item._id}</td>
                                    <td>{item.product_name}</td>
                                    <td>{item.lot_number}</td>
                                    <td>{item.producer_name}</td>
                                    <td className="text-center">{item.ctime}</td>
                                    <td className="text-center">
                                        <Button
                                            variant="primary"
                                            className="btn"
                                            onClick={() => handleShowUpdateConsignment(item)}
                                        >
                                            Sửa
                                        </Button>{' '}
                                        &nbsp;
                                        <Button variant="danger" onClick={() => handleShowDeleteConsignment(item)}>
                                            Xóa
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    {listConsignments && listConsignments.length === 0 && (
                        <tr>
                            <td colSpan={'7'} align={'center'}>
                                Không có dữ liệu hiển thị
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className="d-flex justify-content-center">
                {listConsignments.length * pageCount <= 10 ? (
                    ''
                ) : (
                    <ReactPaginate
                        nextLabel="Tiếp >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="< Trước"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                        forcePage={currentPage - 1}
                    />
                )}
            </div>

            {
                <ModalCreateConsignment
                    show={showModalCreateConsignment}
                    setShow={setShowModalCreateConsignment}
                    listProducer={listProducer}
                    fetchListConsignments={fetchListConsignments}
                    fetchListConsignmentsWithPaginate={fetchListConsignmentsWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            }
            {
                <ModalUpdateConsignment
                    show={showModalUpdateConsignment}
                    setShow={setShowModalUpdateConsignment}
                    dataUpdate={dataUpdate}
                    listProducer={listProducer}
                    fetchListConsignments={fetchListConsignments}
                    fetchListConsignmentsWithPaginate={fetchListConsignmentsWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            }
            {
                <ModalDeleteConsignment
                    show={showModalDeleteConsignment}
                    setShow={setShowModalDeleteConsignment}
                    dataDelete={dataDelete}
                    listProducer={listProducer}
                    fetchListConsignments={fetchListConsignments}
                    fetchListConsignmentsWithPaginate={fetchListConsignmentsWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
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
