import React, {useState} from 'react';
import { Modal, Button, Form, Alert } from "react-bootstrap";
import {TextField} from '@material-ui/core';
import { FaFacebookSquare, FaGithub } from 'react-icons/fa';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Loading from '../helpers/Loading';

function responseFacebook(response){
    console.log('fb response: ', response)
    const facebook = 'facebook'
    Social(response.email, response.name, facebook)
}

async function Social(email, fullname, provider){
    let credentails = {
        email: email,
        fullname: fullname,
    }
    await Axios.post(`/api/sign-in/${provider}`, credentails)
    .then(response => {
        if (response.data.success == 200) {
            localStorage.setItem('token', response.data.access_token)
            localStorage.setItem('email', response.data.email)
            localStorage.setItem('fullname', response.data.fullname)
            localStorage.setItem('voting_id', response.data.voting_id)
            location.href = '/profile'
            setLoading = false

        } else if(response.data.success == false) {
            // this.setState({
            //     errorEmail: response.data.message.email,
            //     errorPassword: response.data.message.password,
                
            // })
        } else if (response.data.error == 401) {
            // this.setState({ 
            //     errorLogin: response.data.message
            // })
        } 
    }).catch(error => console.log(error))

}

function LoginModal({ 
        handleShow, 
        handleHide, 
        handleRegister, 
        submitLogin, 
        handleSubmitChange, 
        errorEmail, 
        errorPassword, 
        errorLogin,
      }) {
    const [loading, setLoading] = useState(false)
    return (
        <div>
            <Modal show={handleShow} onHide={ handleHide} >
                <Modal.Header closeButton className='d-block'>
                    <Modal.Title className='text-center'>Welcome to  Brainster Tools!</Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-5'>
                    <div className='text-center'>
                        <p className=''>Пријави се за да креираш, гласаш или заследиш</p>
                    </div>
                    {loading ? <div className='text-center w-100 m-3'>  <Loading title='Please wait' /> </div>: null}
                    <div className='d-flex justify-content-center mb-5'>
                        <FacebookLogin
                            appId="519824758709123"
                            autoLoad={false}
                            callback={responseFacebook}
                            fields="name,email"
                            render={renderProps => (
                                <Button className=' mr-2 fb-color btn-sm text-white' onClick={renderProps.onClick}>
                                    <FaFacebookSquare /> 
                                    <span className=''> Facebook</span>
                                </Button>
                            )}
                            onClick={() => setLoading(true)}
                        />
                        {/* <Button 
                            className='git-hub-color btn-sm text-white'> 
                                <FaGithub />  
                                <span> Git Hub</span>
                        </Button> */}
                        
                        {/* <GitHubLogin clientId="761c9ba181c79f888f0b"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                        /> */}
                    </div>
                    <hr className='bg-warning' />
                    {/* {errorLogin.map(errors => console.log(errors.data))} */}
                    {errorLogin != '' ? <Alert className='alert-danger'>{ errorLogin }</Alert> : null}
                    <Form onSubmit={submitLogin}>
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
                                onChange={handleSubmitChange}
                                // error
                                helperText={errorEmail}
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
                                onChange={handleSubmitChange}
                                helperText={errorPassword}

                            />
                        </Form.Group>
                        <Form.Group>
                            <Button type='submit' className='btn btn-primary btn-block btn-sm'>Логирај се!</Button>
                        </Form.Group>
                   </Form>
                </Modal.Body>
                <Modal.Footer>
                    <span className='font-italic'> Доколку немате профил: </span>
                    <Button 
                        onClick={ handleRegister }
                        className='btn btn-light btn-sm'
                    >
                        <span className='text-primary'> Креирај сега</span>
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
  }
  export default LoginModal;
  
