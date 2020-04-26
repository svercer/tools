import React from 'react'
import {TextField} from '@material-ui/core';
import {Row, Col} from 'react-bootstrap';

export default function MainSearchBar({myFunction}) {
    return (
        <>
        <Row className='mt-3'>
            <Col md={12}>
                <TextField 
                    style={{width: '60vw'}} 
                    id="search" 
                    label="Search" 
                    variant="outlined" 
                    size='small' 
                    border='red'
                    type='text'
                    onChange={myFunction}
                />
            </Col>
        </Row>       
        </>
    )
}
