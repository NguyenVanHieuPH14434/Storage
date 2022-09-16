import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Row, Col } from 'react-bootstrap';
import './Producer.scss';
import ModalCreateProducer from './ModalCreateProducer';
import ModalUpdateProducer from './ModalUpdateProducer';
import Axios from 'axios';
import axios from 'axios';

const Producer = () => {
    const [showModalCreateProducer, setShowModalCreateProducer] = useState(false);
    const [showModalUpdateProducer, setShowModalUpdateProducer] = useState(false);
    const [handelcheck, setHandleCheck] = useState(false);
    const [isChecked, setIsChecked] = useState(true);
    const [dataSearch, setDataSearch] = useState('');
    let getKey = useRef();

    //call api 1 lần
    useEffect(() => {
        Axios.get('http://localhost:4000/api/producer/list')
            .then((response) => {
                setListInfoProducer(response.data.docs);
            })
            .catch(function (error) {});
    }, [handelcheck]);

    // lấy dữ liệu ở thêm
    const [infoProducer, setInfoProducer] = useState({
        _id: '',
        producer_name: '',
        producer_address: '',
        producer_phone: '',
        producer_email: '',
    });
    const [listInfoProducer, setListInfoProducer] = useState([]);
    const [ListData, setListData] = useState([listInfoProducer]);
    useEffect(() => {
        Axios.get('http://localhost:4000/api/producer/list')
            .then((response) => {
                setListInfoProducer(response.data.docs);
            })
            .catch(function (error) {});
    }, []);

    const onChangeInfoProducer = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInfoProducer({ ...infoProducer, [name]: value });
    };

    // create
    const handleCreate = () => {
        let { producer_name, producer_address, producer_email, producer_phone } = infoProducer;
        let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if (
            producer_name != '' &&
            producer_address != '' &&
            producer_email != ''
            //  && producer_phone != ""
        ) {
            if (producer_phone != '') {
                if (vnf_regex.test(producer_phone) == false) {
                    alert('Số điện thoại của bạn không đúng định dạng!');
                } else {
                    Axios.post('http://localhost:4000/api/producer/create', infoProducer)
                        .then(() => {
                            setInfoProducer({
                                _id: '',
                                producer_name: '',
                                producer_address: '',
                                producer_phone: '',
                                producer_email: '',
                            });
                            setHandleCheck(!handelcheck);
                        })
                        .catch(function (error) {});

                    setListInfoProducer([...listInfoProducer, infoProducer]);

                    setShowModalCreateProducer(!showModalCreateProducer);
                }
            } else {
                alert('Bạn chưa điền số điện thoại!');
            }
        } else {
            return alert('vui lòng điền đầy đủ thông tin');
        }
    };
    // delete
    const onclickDelete = (id) => {
        // setInfoProducer(post)
        getKey.current = id;
        setShowModalUpdateProducer(!showModalUpdateProducer);
    };

    // update
    const onclickUpdate = (post) => {
        setShowModalCreateProducer(!showModalCreateProducer);
        setInfoProducer(post);
        setIsChecked(!isChecked);
    };
    const handleUpdate = (id) => {
        let { producer_name, producer_address, producer_email, producer_phone } = infoProducer;
        let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if (
            producer_name != '' &&
            producer_address != '' &&
            producer_email != ''
            //  && producer_phone != ""
        ) {
            if (producer_phone != '') {
                if (vnf_regex.test(producer_phone) == false) {
                    alert('Số điện thoại của bạn không đúng định dạng!');
                } else {
                    setInfoProducer({ ...infoProducer, _id: id });
                    axios
                        .post(`http://localhost:4000/api/producer/update/${infoProducer._id}`, infoProducer)
                        .then((res) => {
                            setInfoProducer({
                                _id: '',
                                producer_name: '',
                                producer_address: '',
                                producer_phone: '',
                                producer_email: '',
                            });
                            setHandleCheck(!handelcheck);
                            setIsChecked(!isChecked);
                        })
                        .catch((err) => console.log(err));

                    setShowModalCreateProducer(!showModalCreateProducer);
                }
            } else {
                alert('Bạn chưa điền số điện thoại!');
            }
        } else {
            return alert('vui lòng điền đầy đủ thông tin');
        }
    };

    // get dataSearch
    const onChangeSearch = (e) => {
        let value = e.target.value;
        setDataSearch(value);
    };
    useEffect(() => {
        setListData(listInfoProducer.filter((item) => item.producer_name.includes(dataSearch)));
    }, [dataSearch, listInfoProducer]);

    return (
        <div className="producer">
            <p className="title">Danh sách nhà cung cấp</p>
            <Form>
                <Form.Group className="mb-3 fcontainer" controlId="exampleForm.ControlInput1">
                    <Form.Label className="ftext">Tìm Kiếm Nhà Cung Cấp</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập tên nhà cung cấp"
                        className="fip"
                        value={dataSearch}
                        onChange={(e) => onChangeSearch(e)}
                    />
                    <Button variant="success" onClick={() => setShowModalCreateProducer(!showModalCreateProducer)}>
                        THÊM MỚI
                    </Button>
                </Form.Group>
            </Form>
            <Table striped bordered hover size="md">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Địa Chỉ</th>
                        <th>Số Điện Thoại</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {ListData.map((post, key) => {
                        return (
                            <tr key={key}>
                                <td>{key}</td>
                                <td>{post._id}</td>
                                <td>{post.producer_name}</td>
                                <td>{post.producer_address}</td>
                                <td>{post.producer_phone}</td>
                                <td>{post.producer_email}</td>
                                <td>
                                    <Button variant="primary" className="btn" onClick={() => onclickUpdate(post)}>
                                        Sửa
                                    </Button>
                                    <Button variant="danger" onClick={() => onclickDelete(post._id)}>
                                        Xóa
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <ModalCreateProducer
                show={showModalCreateProducer}
                setShow={setShowModalCreateProducer}
                infoProducer={infoProducer}
                onChangeInfoProducer={onChangeInfoProducer}
                handleCreate={handleCreate}
                isChecked={isChecked}
                handleUpdate={handleUpdate}
                handelcheck={handelcheck}
                setHandleCheck={setHandleCheck}
            />

            <ModalUpdateProducer
                show={showModalUpdateProducer}
                setShow={setShowModalUpdateProducer}
                setInfoProducer={setInfoProducer}
                infoProducer={infoProducer}
                index={getKey.current}
                setHandleCheck={setHandleCheck}
                handelcheck={handelcheck}
            />
        </div>
    );
};

export default Producer;
