import React from 'react'
import {Container, Row, Col, } from 'react-bootstrap';


export default function MainSearchTitle({title, children}) {
    return (
        <div>
            <Container>
                <Row className='p-5 justify-content-center'>
                    <Col md={12} className=''>
                        <h2 className='text-center'>{title}</h2>
                    </Col>
                        {children}
                </Row>
            </Container>
        </div>
    )
}
