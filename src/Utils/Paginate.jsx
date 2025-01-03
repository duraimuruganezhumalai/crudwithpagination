import React from "react";
import _ from "lodash";

const Paginate = (alluserdata, currentPage, pageSize) => {


    let startIndex = (currentPage - 1) * pageSize
    console.log("startindex", startIndex);


    return _(alluserdata).slice(startIndex, startIndex + pageSize).value()

    // return (
    //     <React.Fragment>


    //     </React.Fragment>
    // )
}

export default Paginate;