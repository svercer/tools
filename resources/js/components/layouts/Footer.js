import React, { Component } from 'react'
import { Container, Row, Col, Form, Button, } from 'react-bootstrap';
import Logo from './Logo';
import FooterLinks from './FooterLinks';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram, FaWordpress } from 'react-icons/fa';
import swal from 'sweetalert';
import Axios from 'axios'
import Loading from '../helpers/Loading';

export default class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            loading: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.setState({ loading: true})
        console.log('submited')
        console.log(this.state)
        let credentials = {
            email: this.state.email
        }
        Axios.post('/api/subs/user', credentials)
            .then(response => {
                if (response.data.success == 200) {
                    swal({
                        title: "Супер",
                        text: response.data.message,
                        icon: "success",
                        button: "ОК!",
                    })
                    this.setState({loading: false})
                } else if (response.data.error == 500) {
                    swal({
                        title: "Ooops",
                        text: response.data.message,
                        icon: "error",
                        button: "ОК!",
                    })
                    this.setState({loading: false})

                } else {
                    swal({
                        title: "Ooops",
                        text: "Се случи грешка, пробајте подоцна",
                        icon: "error",
                        button: "ОК!",
                    })
                    this.setState({loading: false})

                }
            }).catch(error => console.log(error))
    }
    render() {
        let log = {
            width: '100%'
        }

        return (
            <div id='footer'>
                <Container className='mt-5'>
                    <Row className='mb-3 align-items-center'>
                        <Col md={4} xs={12}>
                            <Logo styleLogo={log} />
                        </Col>
                        <Col md={8}>
                            <Row className='mt-5 mt-md-0'>
                                <Col xs={12} sm={12} md={4}>
                                    <FooterLinks
                                        title='Теми'
                                        link1='Дизајн'
                                        link2='Технологија'
                                        link3='Претприемништво'
                                        link4='Маркетинг'
                                    />
                                </Col>
                                <Col xs={12} sm={12} md={4}>
                                    <FooterLinks
                                        title='Курсеви'
                                        link1='Курсеви и работилници'
                                        link2='Академии'
                                        link3='Пакет курсеви'
                                        link4='Настани'
                                    />
                                </Col>
                                <Col xs={12} sm={12} md={4}>
                                    <FooterLinks
                                        title='Компанија'
                                        link1='За нас'
                                        link2='Кариери'
                                        link3='Блог'
                                        link4='Новости'
                                    />
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col>
                                    <h6>Претплати се на нашиот билтен</h6>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <div className='text-center w-100'>{this.state.loading ? <Loading title="Ве молиме почекајте"/> : null}</div>
                                <Form onSubmit={this.handleSubmit} className='form-inline w-100' >
                                    <Col md={7} sm={12} xs={12}>
                                        <Form.Group>
                                            <Form.Control
                                                style={{ width: '100%' }}
                                                type='email'
                                                placeholder='Вашиот имејл'
                                                className='inputBorder  '
                                                size='lg'
                                                name='email'
                                                onChange={this.handleChange}
                                                value={this.state.email}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4} sm={12} xs={12}>
                                        <Form.Group>
                                            <Button
                                                type='submit'
                                                style={{
                                                    backgroundColor: "#ff1300",
                                                }} className='btn btn-sm b btn-block btn-danger'>
                                                <span style={{ margin: 0 }}>Испрати</span>
                                            </Button>
                                        </Form.Group>
                                    </Col>
                                </Form>
                            </Row>
                            <Row className='mt-3'>
                                <Col style={{ fontSize: '1.1rem' }} md={6} className='d-flex justify-content-around '>
                                    <FaFacebookF />
                                    <FaLinkedinIn />
                                    <FaTwitter />
                                    <FaInstagram />
                                    <FaWordpress />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <Container fluid>

                    <Row>
                        <Col className='text-center p-3 lastfooter w-100'>
                            <p className='m-0'>&copy; Copyright Brainster 2020, all rights reserved</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
