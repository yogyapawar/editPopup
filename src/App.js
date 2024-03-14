import './App.css';
import 'react-responsive-modal/styles.css';
import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { PlusCircle, Edit, Trash2 } from 'react-feather';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

function App() {
  const blankUser = {
    "name": "",
    "email": "",
    "role": "",
    "address": ""
  }
  const [user, setUser] = useState(blankUser);
  const [userdata, setUserdata] = useState([]);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState('Add');
  const [editIndex, setEditindex] = useState(null);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setUser(blankUser);
    setAction("Add");
  }
  const addUser = () => {
    setUserdata([...userdata, user]);
    setUser(blankUser);
    onCloseModal();
  }
  const editUser = (index) => {
    setAction('Edit');
    const selectedUser = userdata.find((x, i) => i === index);
    setUser(selectedUser);
    setEditindex(index);
    onOpenModal();
  }

  const updateUser = () => {
    const newUsers = userdata.map((x,i) => {
      if(i === editIndex) {
        x = user;
      }
      return x;
    });
    setUserdata(newUsers);
    setUser(blankUser);
    setEditindex(null);
    onCloseModal();
  }

  const deleteUser = (index) => {
    const newUsers = userdata.filter((x,i) => {return i !== index});
    setUserdata(newUsers);
  }

  // validation
  // const [value, setValue] = useState ({
  //   name:'',
  //   email: '',
  //   role:'',
  //   address:''
  // })
  // function handleInput(event) {
  //   const newObj = {...value, [event.target.name]: event.target.value}
  //   setValue(newObj);
  // }
  // function handleValidation(event){

  // }
  return (
    <div className="container">
      <div className='row wrap-section'>
        <div className='col-md-12'>
        <div className="d-flex justify-content-center">
        <h1>CRUD APP</h1>
      </div>
      <div className="toolbar">
        <button className="btn" onClick={onOpenModal}>
          <PlusCircle size={16}></PlusCircle>
          <span>Add</span>
        </button>
      </div>
      <hr />
      {/* <p>{JSON.stringify(userdata)}</p> */}
      {userdata.length > 0 &&
      <Table className="table table-striped">
        <Thead>
          <Tr>
            <Th>Name:</Th>
            <Th>Email:</Th>
            <Th>Role:</Th>
            <Th>Address:</Th>
            <Th>Action:</Th>
          </Tr>
        </Thead>
        <Tbody>
          {userdata.length > 0 && userdata.map((user, index) => {
            return (
              <Tr>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.role}</Td>
                <Td>{user.address}</Td>
                <Td>
                  <button className="btn ml1" onClick={() => editUser(index)}>
                    <Edit size={16}></Edit>
                    <span>Edit</span>
                  </button>
                  <button className="btn ml2" onClick={() => deleteUser(index)}>
                    <Trash2 size={16}></Trash2>
                    <span>Delete</span>
                  </button>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
}
{userdata.length === 0 &&
  <h2 style={{color: "red"}}>
    No data found...!
  </h2>
}
      <Modal open={open} onClose={onCloseModal} center>
        <div className="form formDesign">
          <h2>{action} User</h2>
          {/* <p>{JSON.stringify(user)}</p> */}
          <label htmlFor="Name">Name:</label>
          <input type="text" value={user.name} onChange={(e) => setUser({ ...user, "name": e.target.value })} />
          <label htmlFor="Name">Email:</label>
          <input type="text" value={user.email} onChange={(e) => setUser({ ...user, "email": e.target.value })} />
          <label htmlFor="Name">Role:</label>
          <input type="text" value={user.role} onChange={(e) => setUser({ ...user, "role": e.target.value })} />
          <label htmlFor="Name">Address:</label>
          <textarea name="address" value={user.address} id="" cols="30" rows="4" onChange={(e) => setUser({ ...user, "address": e.target.value })}></textarea>
          {action === 'Add' && <button className="btn" onClick={() => addUser()}>Submit</button>}
          {action === 'Edit' && <button className="btn" onClick={() => updateUser()}>Update</button>}
        </div>
      </Modal>
        </div>
      </div>
    </div>
  )
}

export default App;
