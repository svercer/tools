import React from 'react'
import css from "../../../../public/css/style.css";
import {Col} from 'react-bootstrap';
import {Link } from 'react-router-dom';

export default function MainModel({ id, main_name, main_url, main_slug, category_id  }) {
    return (
        <Col md={4} className='p-1 '>
            <Link to={main_slug} className='mainLink'>
                <div id={id} className='mainDiv border main-card p-3' >  
                    <div className='d-flex justify-content-left align-items-center'>
                        <img className='mainCardImg mr-3' alt="" src={'storage/'+main_url} />  
                        <p className="m-0 p-0">{main_name}</p> 
                    </div>
                </div>
            </Link>
        </Col>
    )
}
