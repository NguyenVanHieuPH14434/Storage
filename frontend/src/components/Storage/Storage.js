/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './Storage.scss';
import ReactPaginate from 'react-paginate';
import ModalCreateStorage from './ModalCreateStorage';
import Axios from 'axios';
import Notification from './Notification';
import axios from 'axios';
function Storage() {
    let itemsPerPage = 10;
    const [show, setShow] = useState(false);
    const [showModalCreateStorage, setShowModalCreateStorage] = useState(false);
    const [checked, setChecked] = useState(false);
    const [medicine, setMedicine] = useState([]);
    const [tabIndex, setTabIndex] = useState('');
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState({
        shelf_number: '',
        lot_number: '',
        product_name: '',
        type: '',
        quantity: '',
        nsx: '',
        hsd: '',
    });
    console.log(data);
    // phan trang
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    let Count = 0;
    let sum = Count * itemsPerPage;
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        if (show === false && showModalCreateStorage === false) {
            Axios.get('http://localhost:4000/api/storage/list')
                .then((res, req) => {
                    setMedicine(res.data.docs);
                })
                .catch(() => {
                    console.log('error');
                });
        }
    }, [show, showModalCreateStorage]);
    useEffect(() => {
        Axios.get('http://localhost:4000/api/storage/list')
            .then((res, req) => {
                setMedicine(res.data.docs);
            })
            .catch(() => {
                console.log('error');
            });
    }, []);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(medicine.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(medicine.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, medicine]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % medicine.length;
        setItemOffset(newOffset);
        setCurrentPage(+event.selected + 1);
    };

    useEffect(() => {
        setCurrentItems(medicine.filter((el) => el.product_name.includes(search)));
    }, [search, medicine]);

    const getValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData({ ...data, [name]: value });
    };
    let getKey = useRef();
    const checkValidate = (n) => {
        //create
        if (tabIndex === '1') {
            if (
                n.shelf_number !== '' &&
                n.lot_number !== '' &&
                n.product_name &&
                n.type !== '' &&
                n.quantity !== '' &&
                n.nsx !== '' &&
                n.hsd !== ''
            ) {
                axios
                    .post('http://localhost:4000/api/storage/create', n)
                    .then(() => {
                        setMedicine(medicine);
                        setShowModalCreateStorage(false);
                        setData({});
                        console.log('success!');
                    })
                    .catch(() => {
                        console.log('error');
                    });
            } else {
                setShowModalCreateStorage(true);
                alert('Vui lòng nhập đầy đủ Thông Tin');
            }
        }
        //update
        if (tabIndex === '2') {
            if (
                n.shelf_number !== '' &&
                n.lot_number !== '' &&
                n.product_name &&
                n.type !== '' &&
                n.quantity !== '' &&
                n.nsx !== '' &&
                n.hsd !== ''
            ) {
                axios
                    .post(`http://localhost:4000/api/storage/update/${data._id}`, data)
                    .then(() => {
                        window.location.reload()
                        setChecked(false);
                        setShowModalCreateStorage(!setShowModalCreateStorage);
                        setData({});
                        console.log('success!');
                    })
                    .catch(() => {
                        console.log('error');
                    });
            } else {
                setShowModalCreateStorage(true);
                alert('Vui lòng nhập đầy đủ Thông Tin');
            }
        }
    };
    const handleData = (i) => {
        setData(i);
        setTabIndex('2');
        setChecked(true);
        setShowModalCreateStorage(true);
    };
    const handleDelete = (i) => {
        getKey.current = i;
        setShow(true);
    };
    const handleShowCreate = () => {
        setShowModalCreateStorage(true);
        setTabIndex('1');
    };
    const handleCreate = () => {
        checkValidate(data);
        setTabIndex('1');
    };
    console.log('warn');
    const handleUpdate = () => {
        checkValidate(data);
        setTabIndex('2');
    };

    // useEffect(()=>{
    //   Axios.get('http://localhost:4000/api/storage/list')
    //     .then((res,req)=> setSupplies(res.data))
    //     .catch(()=>{
    //       console.log('error');
    //     })
    // },[])
    return (
        <div className="lot">
            <Tabs defaultActiveKey="first">
                <Tab eventKey="first" title="Thuốc">
                    <Form>
                        <Form.Group className="mb-3 fcontainer" controlId="exampleForm.ControlInput1">
                            <Form.Label className="ftext">Tìm Kiếm Lô</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên lô"
                                className="fip"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button variant="success" onClick={() => handleShowCreate()}>
                                THÊM MỚI
                            </Button>
                        </Form.Group>
                    </Form>
                    <Table striped bordered hover size="md">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Số Lô</th>
                                <th>Tên Hàng Hóa</th>
                                <th>Kệ</th>
                                <th>Loại</th>
                                <th>SL</th>
                                <th>Mã QR</th>
                                <th>NSX</th>
                                <th>HSD</th>
                                <th>Ngày Nhập</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems &&
                                currentItems
                                    .map((el, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{(currentPage - 1) * 10 + i + 1}</td>
                                                <td>{el.lot_number}</td>
                                                <td>{el.product_name}</td>
                                                <td>{el.shelf_number}</td>
                                                <td>{el.type}</td>
                                                <td>{el.quantity}</td>
                                                <td></td>
                                                <td>{el.nsx}</td>
                                                <td>{el.hsd}</td>
                                                <td>{el.ctime}</td>
                                                <td>
                                                    <Button
                                                        variant="primary"
                                                        className="btn"
                                                        onClick={() => handleData(el)}
                                                    >
                                                        Sửa
                                                    </Button>
                                                    <Button variant="danger" onClick={() => handleDelete(el._id)}>
                                                        Xóa
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                    .slice(sum, sum + itemsPerPage)}
                        </tbody>
                    </Table>
                </Tab>

                <Tab eventKey="second" title="Vật Tự">
                    <Form>
                        <Form.Group className="mb-3 fcontainer" controlId="exampleForm.ControlInput1">
                            <Form.Label className="ftext">Tìm Kiếm Lô</Form.Label>
                            <Form.Control type="text" placeholder="Nhập tên lô" className="fip" />
                            <Button variant="success" onClick={() => setShowModalCreateStorage(true)}>
                                THÊM MỚI
                            </Button>
                        </Form.Group>
                    </Form>
                    <Table striped bordered hover size="md">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Số Lô</th>
                                <th>Tên Hàng Hóa</th>
                                <th>Kệ</th>
                                <th>Loại</th>
                                <th>SL</th>
                                <th>Mã QR</th>
                                <th>NSX</th>
                                <th>HSD</th>
                                <th>Ngày Nhập</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </Table>
                </Tab>
            </Tabs>
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
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
            />
            {
                <ModalCreateStorage
                    checked={checked}
                    data={data}
                    handleCreate={handleCreate}
                    getValue={getValue}
                    handleUpdate={handleUpdate}
                    show={showModalCreateStorage}
                    setShow={setShowModalCreateStorage}
                />
            }
            {
                <Notification
                    index={getKey.current}
                    setShow={setShow}
                    title="Thông Báo Xóa"
                    description="Bạn có chắc chắn muốn xóa không"
                    show={show}
                />
            }
        </div>
    );
}

export default Storage;
