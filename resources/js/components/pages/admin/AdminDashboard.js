import React, { Component } from 'react'
import Axios from 'axios'
import CourseModel from '../../layouts/CourseModel';
import Loading from '../../helpers/Loading';
import { Container, Row, Col, Button, Form, FormControl } from 'react-bootstrap';
import {Link } from 'react-router-dom'



export default class AdminDashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            token: localStorage.getItem('token'),
            email: localStorage.getItem('email'),
            fullname: localStorage.getItem('fullname'),
            courses: [],
            loading: true,
            // explanation: ''
        }
        // this.myDate = this.myDate.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
        // this.handleChange = this.handleChange.bind(this)
        // this.handleAprove = this.handleAprove.bind(this)
    }
    componentDidMount() {
        Axios.get(`/api/getCoursesForAdmin`, {
            headers : {
                "Authorization": `Bearer ${this.state.token}`
            }
        }).then(response => {
            if (response.data.success === 200) {
                this.setState({ 
                    courses: response.data.items,
                    loading: false
                })
            } else if(response.data.error === 401) {
                this.props.history.push('/admin-login')
            }
        }).catch(error => {
            if (error) {
                this.props.history.push('/admin-login')
            }
        })
    }
    
    
    render() {
        
        if (this.state.loading) {
            return (
                <div className='text-center mt-5'>
                    <Loading /> 
                </div>
            )
        } else {
            return (
                <div>
                    <Container>
                        <Row>
                            <Col>
                                <Link className='btn btn-success' to='/create-technology'>Create Technologie</Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col className=' m-5'>
                                <h3 className='text-center'>Добре дојде: {localStorage.getItem('fullname')}</h3>
                                <Row className='justify-content-center'>
                                    {
                                    this.state.courses.map((item, index) => {
                                        let courseVotes = item.votes.length
                                        return (
                                            <Col key={item.id} className='p-2 ' md={6} >
                                                <div className='p-1 border-radius-3'>
                                                    <CourseModel 
                                                        key={index}
                                                        id={item.id}
                                                        course_url={item.course_url} 
                                                        course_name={item.course_name} 
                                                        course_type={item.course_type} 
                                                        course_price_type={item.course_price_type} 
                                                        course_language={item.course_language} 
                                                        user_name={item.user.fullname} 
                                                        course_aproved={item.course_aproved} 
                                                        created_at={item.created_at}
                                                        votes={courseVotes}
                                                        updated_at={item.updated_at}
                                                    />
                                                </div>
                                            </Col>
                                        );
                                    })}
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        }
    }
}
