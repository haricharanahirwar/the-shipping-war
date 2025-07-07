import './Listofcategory.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { __categoryapiurl } from '../../API_URL';
import { Link } from 'react-router-dom';

function Search() {

    const [cList, setCatList] = useState([]);

    useEffect(() => {
        axios.get(__categoryapiurl + "fetch").then((response) => {
            setCatList(response.data);
            
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <>
            {/* About Start */}
            <div class="container-xxl py-5">
                <div class="container">
                    <div class="row g-5 align-items-center">
                        <div class="col-lg-12">
                            <h1 class="mb-4">Category List <span class="text-primary text-uppercase"></span></h1>
                            <center>
                                <div id="main-output-div" >
                                    {
                                        cList.map((row) => (
                                            <div class="main_part" >
                                              <Link to={`/searchsc/${row.catnm}`}>  <img src={`public/assets/uploads/categoryicons/${row.caticonnm}`} height={120} width={150} /></Link>
                                                <br />
                                                <b>{row.catnm}</b>
                                            </div>
                                        ))
                                    }
                                </div>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
            {/* About End */}
        </>
    )
}

export default Search;


