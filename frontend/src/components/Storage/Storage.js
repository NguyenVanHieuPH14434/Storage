/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState ,memo} from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "./Storage.scss";
import ModalCreateStorage from "./ModalCreateStorage";
import Axios from "axios"
import Notification from "./Notification";
import axios from "axios";
function Storage() {
  const [showModalCreateStorage, setShowModalCreateStorage] = useState(false);
  const [checked, setChecked] = useState(false);
  const [show, setShow] = useState(false);
  const[medicine,setMedicine]=useState([])
  const[supplies,setSupplies]=useState([])
  const[data,setData]=useState({
    shelf_number:"",
    lot_number:"",
    product_name:"",
    type:"",
    quantity:"",
    nsx:"",
    hsd:"",
  })
  console.log(data);
  const getValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({...data, [name]: value });
  };
  let getKey = useRef()
  const checkValidate=(n)=>{
    if(n.shelf_number !=="" && n.lot_number!=="" && n.product_name && n.type!=="" && n.quantity!=="" && n.nsx!=="" && n.hsd!==""){
      axios.post('http://localhost:4000/api/storage/create',n)
      .then(()=>{
        console.log('success!');
      })
      .catch(()=>{
        console.log('error');
      })
    }
    else{
      alert("Vui lòng nhập đầy đủ Thông Tin")
    }
  }
  const handleData=(i)=>{
    setData(i)
    setChecked(true)
    setShowModalCreateStorage(!showModalCreateStorage)
  }
  const handleDelete=(i)=>{
    getKey.current = i;
    setShow(true)
  }
  const handleShowCreate=()=>{
    setShowModalCreateStorage(!showModalCreateStorage)
  }
  const handleCreate = () => {
    checkValidate(data)
    // setShowModalCreateStorage(false);
  };
  console.log('warn');
  const handleUpdate=()=>{
    axios.post(`http://localhost:4000/api/storage/update/${data._id}`,data)
    .then(()=>{
      setData({})
      setChecked(false)
      console.log('success!')
    })
    .catch(()=>{
      console.log('error');
    })
    setShowModalCreateStorage(false);
  }
  useEffect(()=>{
      Axios.get('http://localhost:4000/api/storage/list')
      .then((res,req)=> setMedicine(res.data))
      .catch(()=>{
        console.log('error');
      })
  },[])
  useEffect(()=>{
    Axios.get('http://localhost:4000/api/storage/list')
      .then((res,req)=> setSupplies(res.data))
      .catch(()=>{
        console.log('error');
      })
  },[])
  return (
    <div className="lot">
      <Tabs defaultActiveKey="first">
        <Tab eventKey="first" title="Thuốc">
          <Form>
            <Form.Group
              className="mb-3 fcontainer"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label className="ftext">Tìm Kiếm Lô</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên lô"
                className="fip"
              />
              <Button
                variant="success"
                onClick={() => handleShowCreate()}
              >
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
            {medicine.map((el,i)=>{
              return (
                <tr key={i}>
                <td>{i+1}</td>
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
                    onClick={() => handleData(el) }
                  >
                    Sửa
                  </Button>
                  <Button variant="danger" onClick={()=>handleDelete(el._id)} >Xóa</Button>
                </td>
              </tr>
              )
            })}
              
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="second" title="Vật Tự">
        <Form>
            <Form.Group
              className="mb-3 fcontainer"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label className="ftext">Tìm Kiếm Lô</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên lô"
                className="fip"
              />
              <Button
                variant="success"
                onClick={() => setShowModalCreateStorage(true)}
              >
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
            {supplies.map((el,i)=>{
              return (
                <tr key={i}>
                <td>{i+1}</td>
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
                    onClick={() => handleData(i) }
                  >
                    Sửa
                  </Button>
                  <Button variant="danger" onClick={()=>handleDelete(el._id)} >Xóa</Button>
                </td>
              </tr>
              )
            })}
              
            </tbody>
          </Table>
        </Tab>
      </Tabs>
      {<ModalCreateStorage
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
        <Notification index={getKey.current} setShow={setShow} title="Thông Báo Xóa" description="Bạn có chắc chắn muốn xóa không" show={show}/>
      }
    </div>
  );
}

export default memo(Storage);
