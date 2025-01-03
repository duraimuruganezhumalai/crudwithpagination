import React from "react";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import _ from "lodash";


const PaginationPage = ({ itemCount, pageSize, currentPage, onPageChange }) => {

    let pagination = Math.ceil(itemCount / pageSize)
    console.log("pages---", pagination);

    let pages = _.range(1, pagination + 1)


    return (
        <React.Fragment>
            <section className="d-flex justify-content-center">
                <Pagination aria-label="Page navigation example">
                    {
                        pages.map((page, index) => (
                            <PaginationItem key={index} active={page === currentPage}>
                                <PaginationLink onClick={() => onPageChange(page)}>{page}</PaginationLink>
                            </PaginationItem>
                        ))
                    }
                </Pagination>
            </section>
        </React.Fragment>
    )
}

export default PaginationPage;