import React, { Component } from 'react';
import axios from 'axios';
import { Pagination, Table, Button } from 'reactstrap';
import PaginationPage from '../Common/PaginationPage';
import Paginate from '../Utils/Paginate';


class Crudapp extends Component {


    constructor() {
        super()

        this.state = {
            userData: [],
            pageSize: 4,
            currentPage: 2
        }

    }

    componentDidMount() {
        this._allUsersData();
    }




    handleOnDeleteUserdata = (id) => {

        axios.delete(`http://localhost:3004/crudappdb/${id}`,).then((res) => {
            console.log("delete", id);

            this._allUsersData()
        })
    }

    _allUsersData() {
        axios.get('http://localhost:3004/crudappdb').then((res) => {
            // console.log(res.data);
            this.setState({
                userData: res.data
            })

        })
    }

    handleOnPageClick = (page) => {
        console.log("click method", page);
        this.setState({
            currentPage: page
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