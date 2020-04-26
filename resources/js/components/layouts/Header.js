import React, { Component, Children } from 'react'
import { Button, NavLink, Navbar, NavDropdown, FormControl, Nav, Form, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Logo from './Logo';
import { FaCode, FaGg, FaReact, FaPencilAlt, FaUserCircle } from 'react-icons/fa';
import {FaPlus} from 'react-icons/fa';
import { withRouter } from 'react-router-dom';
import headerCss from '../../../../public/css/header.css';
import LoginModal from '../helpers/LoginModal';
import RegisterModal from '../helpers/RegisterModal';
import Axios from 'axios';


 class Header extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            active: false,
            showLogin: false,
            showRegister: false,
            // loggedIn: false,
            fullname: '',
            email: '',
            password: '',
            errorEmail: '',
            errorPasswor: '',
            errorFullname: '',
            errorLogin: '',
            errorRegister: '',
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleCloseRegister = this.handleCloseRegister.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.submitRegister = this.submitRegister.bind(this)
        this.submitLogin = this.submitLogin.bind(this)
        this.handleRegisterChange = this.handleRegisterChange.bind(this)
        this.logOut = this.logOut.bind(this)
        this.addCourse = this.addCourse.bind(this)

    }
    handleLogin() {
        this.setState({ 
            showLogin: true, 
            showRegister: false
        })
    }
    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('fullname')
        localStorage.removeItem('voting_id')
        this.props.history.push('/')
    }
    handleClose() {
        this.setState({ showLogin: false })
    }
    handleCloseRegister(){
        this.setState({ showRegister: false })
    }
    handleRegister() {
        this.setState({ 
            showLogin: false,
            showRegister: true
        })
    }

    submitRegister(e) {
        e.preventDefault()
        console.log(this.state)
        let credentials  = {
            fullname: this.state.fullname,
            email: this.state.email,
            password: this.state.password
        }
        Axios.post('/api/register', credentials)
        .then(response => {
            if (response.data.success == 200) {
                localStorage.setItem('token', response.data.access_token)
                localStorage.setItem('email', response.data.email)
                localStorage.setItem('fullname', response.data.fullname)
                localStorage.setItem('voting_id', response.data.voting_id)

                this.setState({
                    showLogin: false,
                    showRegister: false,
                })
                window.location.reload(false);
            } else if(response.data.success == false) {
                this.setState({
                    errorEmail: response.data.message.email,
                    errorPassword: response.data.message.password,
                    errorFullname: response.data.message.fullname,
                })
            } else if (response.data.error == 500) {
                this.setState({ errorRegister: response.data.message })
            }
        }).catch(errors => console.log(errors))
    }
    submitLogin(e) {
        e.preventDefault()
        let credentials  = {
            email: this.state.email,
            password: this.state.password
        }
        Axios.post('/api/login', credentials)
        .then(response => {
            if (response.data.success == 200) {
                localStorage.setItem('token', response.data.access_token)
                localStorage.setItem('email', response.data.email)
                localStorage.setItem('fullname', response.data.fullname)
                localStorage.setItem('voting_id', response.data.voting_id)
                this.setState({
                    showLogin: false,
                    showRegister: false,
                })
                this.props.history.push('/profile')
            } else if(response.data.success == false) {
                this.setState({
                    errorEmail: response.data.message.email,
                    errorPassword: response.data.message.password,
                })
            } else if (response.data.error == 401) {
                this.setState({ 
                    errorLogin: response.data.message
                })
            } 
        })
    }
    handleRegisterChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    addCourse() {
        if (localStorage.getItem('token')) {
            this.props.history.push('/add-course')
        } else {
            this.setState({ showLogin: true })
        }
    }
    
    render() {
        let log = {
            width: 50
        }
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Link to='/' className='mr-3'><Logo styleLogo={log} /></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <ul className='mt-1 ulStyle d-flex justify-content-around align-items-center'>
                                <li>
                                    <Link 
                                        to='/programming'
                                        className={ location.pathname == "/programming" || location.pathname == '/' ? 'ulStyle active': 'ulStyle' }>
                                            <FaCode className='mr-2' /> 
                                            Programming 
                                    </ Link>
                                </li>
                                <li>
                                    <Link 
                                        to='/data-science' 
                                    className={ location.pathname == '/data-science' ? 'ulStyle active': 'ulStyle'}>
                                         <FaReact className='mr-2' /> 
                                         Data Science 
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to='/dev-ops' 
                                        className={ location.pathname == '/dev-ops' ? 'ulStyle active': 'ulStyle' }>
                                        <FaGg className='mr-2' /> 
                                        DevOps 
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                    to='/design' 
                                    className={ location.pathname == '/design' ? 'ulStyle active': 'ulStyle' }> 
                                        <FaPencilAlt className='mr-2' /> 
                                        Design 
                                    </Link>
                                </li>
                            </ul>
                        </Nav>
                        <div className='d-flex justify-content-center align-items-center'>
                            <Button onClick={this.addCourse} className="mr-3 btn btn-light text-primary"><FaPlus className='m-2'/>
                                submit tutorial
                            </Button>
                            {
                            localStorage.getItem('token') ? 
                            <>
                                <Link to='/profile'>
                                    <FaUserCircle style={{ fontSize: '1.2rem'}} />
                                </Link>
                                <Button 
                                    onClick={this.logOut}
                                    className='btn btn-light'
                                    >
                                    Sign Out    
                                </Button> </>
                                :
                                <Button 
                                    variant="primary" 
                                    onClick={ this.handleLogin }
                                    className='btn btn-light'
                                    >
                                    Sign Up / Log in
                                </Button>                         
                            }
                        </div>
                        <LoginModal 
                            handleShow={ this.state.showLogin } 
                            handleHide={ this.handleClose }
                            handleRegister={ this.handleRegister }
                            submitLogin={this.submitLogin}
                            handleSubmitChange={this.handleRegisterChange}
                            errorEmail={ this.state.errorEmail }
                            errorPassword={ this.state.errorPassword }
                            errorLogin={this.state.errorLogin}
                        />
                        
                        <RegisterModal 
                            handleShow={ this.state.showRegister } 
                            handleHide={ this.handleCloseRegister }
                            handleLogin={ this.handleLogin }
                            submitRegister={this.submitRegister}
                            handleSubmitChange={this.handleRegisterChange}
                            errorEmail={ this.state.errorEmail }
                            errorPassword={ this.state.errorPassword }
                            errorFullname={ this.state.errorFullname }
                            errorRegister={this.state.errorRegister}
                        />
            
                    </Navbar.Collapse>
                </Navbar>
            </div>

        )
    }
}

export default withRouter(Header)
