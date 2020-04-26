import React, { Component } from 'react'
import {Container, Row, Col, Form, Alert, Button } from 'react-bootstrap'
import Axios from 'axios'
import CourseModel from '../layouts/CourseModel';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import {TiDeleteOutline} from 'react-icons/ti';
import {FaEdit} from 'react-icons/fa';
import Loading from '../helpers/Loading';

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullname: localStorage.getItem('fullname'),
            email: localStorage.getItem('email'),
            token: localStorage.getItem('token'),
            myCourses: [],
            loading: true,
        }
        // this.getCourses = this.getCourses.bind(this)
        this.loadingCourses = this.loadingCourses.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        Axios.get(`/api/getCourses/slug/${this.state.token}`, {
            headers : {
                "Authorization": `Bearer ${this.state.token}`
            }
        }).then(response => {
            console.log(response.data)
            this.setState({ 
                myCourses: response.data.items,
                loading: false,
            })
        })
    }
    loadingCourses(){
        Axios.get(`/api/getCourses/slug/${this.state.token}`, {
            headers : {
                "Authorization": `Bearer ${this.state.token}`
            }
        }).then(response => {
            this.setState({ 
                myCourses: response.data.items
            })
        })
    }
    handleDelete(e) {
        let id = e.target.getAttribute('courseid')
        let data = {
            id: id
        }
        console.log(id)
        const confirmDialog =  window.confirm('Are you sure?')
        if (confirmDialog) {
           Axios.post(`/api/delete-course` , data , {
               headers: {
                   "Authorization": `Bearer ${localStorage.getItem('token')}`,
                   "Content-type": "Application/json"
               }
           })
           .then(response => {
               if (response.data.success) {
                   swal({
                       title: "Good job!",
                       text: response.data.message,
                       icon: "success",
                       button: "OK!",
                   });
                   // window.location.reload(false)
                   this.loadingCourses()
               }
           })
           .catch(errors => console.log(errors))
       }
    }
    
    render() {
        return (
        <div>
            <Container>
                <Row className='mt-5'>
                    <Col md={12}>
                        <h5 className='text-center '>Добре дојдовте {this.state.fullname}</h5>
                        <p>Курсеви кои ги имате прикачено</p>
                        <Row>
                            {this.state.loading ? <div className='text-center'><Loading title="Loading courses ..."/></div> : null}
                        {this.state.myCourses.map((item, index) => {
                            let voteCount = item.votes.length

                            return (
                                // <div key={item.id}>
                            <Col md={6} key={item.id} className='p-1 '>
                                <CourseModel 
                                    id={item.id} 
                                    course_url={item.course_url} 
                                    course_name={item.course_name} 
                                    course_type={item.course_type} 
                                    course_price_type={item.course_price_type} 
                                    course_language={item.course_language} 
                                    user_id={item.user.fullname} 
                                    course_aproved={item.course_aproved} 
                                    created_at={item.created_at}
                                    callBack={this.loadingCourses}
                                    votes={voteCount}
                                />
                                {location.pathname == '/profile' ? 
                                    <div className='align-self-baseline'>
                                        <Link to={`/edit-course/${item.id}`} >
                                            <FaEdit 
                                                className='text-warning'
                                                style={{fontSize: '1.4rem', fontWeight: 'bold'}}
                                            />
                                        </Link>
                                        <TiDeleteOutline 
                                            style={{fontSize: '1.4rem', fontWeight: 'bold'}} 
                                            onClick={ this.handleDelete } 
                                            courseid={item.id} 
                                            className='text-danger cursor-pointer'
                                        />
                                    </div>
                                : null}
                                {/* </div> */}
                            </Col>
                            );
                            })}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
        )
    }
}
