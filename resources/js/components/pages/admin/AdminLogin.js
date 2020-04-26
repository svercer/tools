import React, { Component } from 'react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import { TextField } from '@material-ui/core';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import Loading from '../../helpers/Loading';

export default class AdminLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errorEmail: '',
            errorPassword: '',
            errorPassword: '',
            loading: false,
        }
        this.submitLogin = this.submitLogin.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    submitLogin(e) {
        e.preventDefault()
        let credentials = {
            email: this.state.email,
            password: this.state.password
        }
        this.setState({ loading: true})
        Axios.post('/api/login-admin', credentials) 
            .then(response => {
                if (response.data.success == 200) {
                    localStorage.setItem('token', response.data.access_token)
                    localStorage.setItem('email', response.data.email)
                    localStorage.setItem('fullname', response.data.fullname)
                    this.setState({
                        showLogin: false,
                        showRegister: false,
                        
                    })
                    this.props.history.push('/admin-dashboard')

                } else if (response.data.success == false) {
                    this.setState({
                        errorEmail: response.data.message.email,
                        errorPassword: response.data.message.password,

                    })
                } else if (response.data.error == 401) {
                    this.setState({
                        errorLogin: response.data.message
                    })
                }
                this.setState({ loading: false})
            })
    }
    handleChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    render() {
        return (
            <div>
                <Container>
                    <Row className='justify-content-center'>
                        <h5 className='text-center m-5'>Овој дел е за логирање на Админ, доколку вие не сте админ, во молиме кликнете
                            <Link to='/profile' className='ml-3'>Овде</Link>
                        </h5>
                        
                        <Col md={6}>
                            {this.state.loading ? <div className='text-center w-100'> <Loading title="Loging in, Please wait..." /> </div> : null }
                            <Form onSubmit={this.submitLogin}>
                            {this.state.errorLogin != '' ? <p className='text-danger'>{this.state.errorLogin}</p> : null}
                            
                            <Form.Group>
                                <TextField
                                    id="email"
                                    label="Email"
                                    type="email"
                                    autoComplete="current-password"
                                    variant="outlined"
                                    className='w-100'
                                    size='small'
                                    name='email'
                                    onChange={this.handleChange}
                                    // error
                                    helperText={this.state.errorEmail}
                                />
                            </Form.Group>
                            <Form.Group>
                                <TextField
                                    id="password"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="outlined"
                                    className='w-100'
                                    size='small'
                                    name='password'
                                    onChange={this.handleChange}
                                    helperText={this.state.errorPassword}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Button type='submit' className='btn btn-primary btn-block btn-sm'>Логирај се!</Button>
                            </Form.Group>
                        </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
