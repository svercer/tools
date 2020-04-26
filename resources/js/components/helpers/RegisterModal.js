import React from 'react';
import { Modal, Button, Form, Alert } from "react-bootstrap";
import {TextField} from '@material-ui/core';
import {FaFacebookSquare, FaGithub} from 'react-icons/fa';

function RegisterModal({ handleShow, handleHide, handleLogin , submitRegister, handleSubmitChange, errorEmail, errorPassword, errorFullname, errorRegister }) {


    return (
        <div>
            <Modal show={handleShow} onHide={ handleHide} className='p-2'>
                <Modal.Header closeButton className='d-block'>
                    <Modal.Title className='text-center'>Welcome to  Brainster Tools!</Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-5'>
                    <div className='text-center'>
                        <p className=''>Пријави се за да креираш, гласаш или заследиш</p>
                    </div>
                    <div className='d-flex justify-content-center mb-5'>
                        <Button 
                            className='mr-2 fb-color btn-sm '>
                                <FaFacebookSquare /> 
                                <span> Facebook</span>
                        </Button>
                        <Button 
                            className='git-hub-color btn-sm'> 
                                <FaGithub />  
                                <span> Git Hub</span>
                        </Button>
                    </div>
                    <hr className='bg-warning' />
                   <Form onSubmit={ submitRegister }>
                        <Form.Group>
                            <TextField
                                id="Full Name"
                                label="Full Name"
                                type="text"
                                // autoComplete=""
                                variant="outlined"
                                className='w-100'
                                size='small'
                                name='fullname'
                                onChange={handleSubmitChange}
                                helperText={errorFullname}
                            />
                        </Form.Group>
                        <Form.Group>
                            <TextField
                                id="email"
                                label="Email"
                                type="email"
                                // autoComplete="current-password"
                                variant="outlined"
                                className='w-100'
                                size='small'
                                name='email'
                                onChange={handleSubmitChange}
                                helperText={errorEmail}
                            />
                        </Form.Group>
                        <Form.Group>
                            <TextField
                                id="password"
                                label="Password"
                                type="password"
                                // autoComplete="current-password"
                                variant="outlined"
                                className='w-100'
                                size='small'
                                name='password'
                                onChange={handleSubmitChange}
                                helperText={errorPassword}
                            />
                        </Form.Group>
                        {errorRegister ? <p className='text-danger'>{errorRegister}</p>: null}
                        <Form.Group>
                            <Button type='submit' className='btn btn-primary btn-block'>Регистритај се!</Button>
                        </Form.Group>
                   </Form>
                </Modal.Body>
                <Modal.Footer>
                    <span className='font-italic'> Имате профил ? </span>  
                    <Button variant="secondary" className='btn btn-light btn-sm'  onClick={ handleLogin }>
                        <span className='text-primary'> Логирај се </span>
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
  }
  export default RegisterModal;
  
