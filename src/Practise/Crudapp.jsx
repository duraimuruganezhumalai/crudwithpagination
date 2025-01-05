import React, { Component } from 'react';
import axios from 'axios';
import {
    Pagination, Table, Button, ModalHeader,
    ModalFooter, FormGroup, Modal, ModalBody, Form, Input
} from 'reactstrap';
import PaginationPage from '../Common/PaginationPage';
import Paginate from '../Utils/Paginate';


class Crudapp extends Component {


    constructor() {
        super()

        this.state = {
            userData: [],
            createUserModal: false,
            editUserModal: false,
            createNewUser: {
                name: '',
                place: ''
            },
            editUserData: {
                id: '',
                name: '',
                place: ''
            },
            validationErrorFields: {},
            pageSize: 4,
            currentPage: 1
        }

    }

    componentDidMount() {
        this._allUsersData();
    }

    handlecreateUserModal = () => {
        this.setState({
            createUserModal: !this.state.createUserModal
        })
    }

    handleOnInputChange = (newUser, inputField, value) => {
        console.log("onchange input", newUser, inputField, value);

        this.setState((prevState) => ({
            [newUser]: {
                ...prevState[newUser],
                [inputField]: value
            }

        }))

    }
    handleEditUserData = (id, name, place) => {
        console.log("edit user modal -----------");

        this.setState({
            editUserData: {
                id,
                name,
                place
            },
            editUserModal: !this.state.editUserModal
        })
    }

    handleUpdateUserData = () => {

        let isformValid = this.editValidationError();

        if (isformValid) {

            let { id, name, place } = this.state.editUserData;

            axios.put(`http://localhost:3004/crudappdb/${id}`, { name, place }).then((res) => {
                this._allUsersData();
                console.log(res);

                this.setState({
                    editUserData: {
                        name: '',
                        place: ''
                    },
                    editUserModal: !this.state.editUserModal
                })

            })
        }

    }
    handleOnDeleteUserdata = (id) => {

        axios.delete(`http://localhost:3004/crudappdb/${id}`,).then((res) => {
            console.log("delete", id);

            this._allUsersData()
        })
    }



    handleOnPageClick = (page) => {
        console.log("click method", page);
        this.setState({
            currentPage: page
        })

    }

    handleClickPostData = () => {

        const isformValid = this.validationError();
        console.log("form validation status", isformValid);

        if (isformValid) {
            axios.post('http://localhost:3004/crudappdb', this.state.createNewUser).then((res) => {
                let { userData } = this.state;
                userData.push(res.data)

                this.setState({
                    userData,
                    createUserModal: !this.state.createUserModal,
                    createNewUser: {
                        name: '',
                        place: ''
                    }
                })
            })
        }

    }



    validationError() {

        let { name, place } = this.state.createNewUser;
        let error = {}

        if (!name) {
            error['name'] = 'Enter your name'
        }
        if (!place) {
            error['place'] = 'Enter your place'
        }

        this.setState({
            validationErrorFields: error
        })

        return Object.keys(error).length === 0

    }
    editValidationError() {

        let { name, place } = this.state.editUserData;
        let error = {}

        if (!name) {
            error['name'] = 'Enter your name'
        }
        if (!place) {
            error['place'] = 'Enter your place'
        }

        this.setState({
            validationErrorFields: error
        })

        return Object.keys(error).length === 0

    }
    _allUsersData() {
        axios.get('http://localhost:3004/crudappdb').then((res) => {
            // console.log(res.data);
            this.setState({
                userData: res.data
            })

        })
    }

    render() {


        let { currentPage, pageSize } = this.state;
        let { userData: alluserdata } = this.state;

        let pageData = Paginate(alluserdata, currentPage, pageSize)
        console.log("slice data", pageData);


        let userData = pageData.map((user, index) => (
            <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.place}</td>
                <td>
                    <Button
                        color="success"
                        onClick={() => this.handleEditUserData(user.id, user.name, user.place)}
                    >Edit</Button>
                </td>
                <td>
                    <Button
                        color='danger'
                        onClick={() => this.handleOnDeleteUserdata(user.id)}

                    >Delete</Button>
                </td>
            </tr>

        ))


        return (
            <React.Fragment>
                <h3>CRUD APPLICATION</h3>
                <section>
                    <Button
                        onClick={this.handlecreateUserModal}
                    >Create a Book</Button>
                </section>
                <section>
                    <Modal isOpen={this.state.createUserModal} toggle={this.handlecreateUserModal}>
                        <ModalHeader toggle={this.handlecreateUserModal}>Create User Data</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <span style={{ color: "red" }}>{this.state.validationErrorFields.name}</span>
                                    <Input
                                        type="text"
                                        placeholder="Enter your name"
                                        name="name"
                                        value={this.state.createNewUser.name}
                                        onChange={(e) => this.handleOnInputChange('createNewUser', 'name', e.target.value)}

                                    />
                                </FormGroup>
                                <FormGroup>
                                    <span style={{ color: "red" }}>{this.state.validationErrorFields.place}</span>
                                    <Input
                                        type="text"
                                        placeholder="Enter your place"
                                        name="place"
                                        value={this.state.createNewUser.place}
                                        onChange={(e) => this.handleOnInputChange('createNewUser', 'place', e.target.value)}

                                    />
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color='primary'
                                onClick={this.handleClickPostData}
                            >Create a Book</Button>
                            <Button
                                color='danger'
                                onClick={this.handlecreateUserModal}
                            >Cancel</Button>

                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={this.state.editUserModal} toggle={this.handleEditUserData}>
                        <ModalHeader toggle={this.handlecreateUserModal}>Create User Data</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <span style={{ color: "red" }}>{this.state.validationErrorFields.name}</span>
                                    <Input
                                        type="text"
                                        placeholder="Enter your name"
                                        name="name"
                                        value={this.state.editUserData.name}
                                        onChange={(e) => this.handleOnInputChange('editUserData', 'name', e.target.value)}

                                    />
                                </FormGroup>
                                <FormGroup>
                                    <span style={{ color: "red" }}>{this.state.validationErrorFields.place}</span>
                                    <Input
                                        type="text"
                                        placeholder="Enter your place"
                                        name="place"
                                        value={this.state.editUserData.place}
                                        onChange={(e) => this.handleOnInputChange('editUserData', 'place', e.target.value)}

                                    />
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color='primary'
                                onClick={() => this.handleUpdateUserData()}
                            >Update a Book</Button>
                            <Button
                                color='danger'
                                onClick={this.handleEditUserData}
                            >Cancel</Button>

                        </ModalFooter>
                    </Modal>
                </section>
                <section>
                    <Table>
                        <thead>
                            <tr>
                                <td>Id</td>
                                <td>Name</td>
                                <td>Place</td>
                                <td>Edit</td>
                                <td>Delete</td>
                            </tr>
                        </thead>
                        <tbody>
                            {userData}
                        </tbody>
                    </Table>
                </section>
                <PaginationPage
                    itemCount={this.state.userData.length}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handleOnPageClick}
                />
            </React.Fragment>
        )
    }
}

export default Crudapp;