import React from 'react';
import Axios from 'axios';
import { withRouter, Redirect, Route } from 'react-router-dom';
import Loading from '../helpers/Loading';
import MainSearchTitle from '../layouts/MainSearchTitle';
import MainSearchBar from '../layouts/MainSearchBar';
import { Container, Row, Col, Form, InputGroup, FormControl, FormCheck, Badge } from 'react-bootstrap';
import CourseModel from '../layouts/CourseModel';
import { TextField, Radio } from '@material-ui/core';
import LoginModal from '../helpers/LoginModal';
import Feedback from 'react-bootstrap/Feedback';

class TechList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            title: '',
            video: false,
            book: false,
            paid: false,
            free: false,
            language: 5,
            noFilter: 'all',
            avlFilterVideo: false,
            filterVideoCount: 0,
            avlFilterBook: false,
            filterBookCount: 0,
            avlFilterFree: false,
            filterFreeCount: 0,
            avlFilterPaid: false,
            filterPaidCount: 0,
            slug: this.props.match.params.slug,
            courses: [],
            sortedCourses: [],
            token: localStorage.getItem('token'),
            voting_id: localStorage.getItem('voting_id'),
        }
        this.handleChange = this.handleChange.bind(this)
        this.myFilter = this.myFilter.bind(this)
    }
    async componentDidMount() {
        await Axios.get(`/api/getCourses/${this.state.slug}`)
        .then(response =>  {
            if (response.data.success == 200) {
                response.data.items.map(item => {
                    if (item.course_type == 0) {
                        this.setState({avlFilterVideo: true  })
                    }
                    if (item.course_type == 1) {
                        this.setState({avlFilterBook : true  })
                    }
                    if (item.course_price_type == 0) {
                        this.setState({avlFilterFree : true  })
                    }
                    if (item.course_price_type == 1) {
                        this.setState({avlFilterPaid : true })
                    }
                })
                this.setState({
                    courses: response.data.items,
                    loading: false,
                })
                
                this.setState({ 
                    filterVideoCount : this.state.courses.filter(item => item.course_type == 0).length,
                    filterBookCount : this.state.courses.filter(item => item.course_type == 1).length,
                    filterFreeCount : this.state.courses.filter(item => item.course_price_type == 0).length,
                    filterPaidCount : this.state.courses.filter(item => item.course_price_type == 1).length
                })

            }
            
        })
    }
    handleChange(event) {
        const target = event.target
        const value = target.type == 'checkbox' ? target.checked : target.value
        const name = event.target.name

        this.setState({ 
            [name] : value 
            }, 
            this.myFilter,
        )
    }
    myFilter(){
        
        let {
            courses,
            sortedCourses,
            title,
            video,
            book,
            paid,
            free,
            language,
            noFilter,
        } = this.state
        language = parseInt(language)
        
        let tempCourses = [...courses]
        if ( book ) {
            tempCourses = tempCourses.filter( item =>  item.course_type == 1 )
        } 
        if ( video ) {
            tempCourses = tempCourses.filter( item =>  item.course_type == 0 )
        } 
        if (paid) {
            tempCourses = tempCourses.filter(item => item.course_price_type == 1)
        }
        if (free) {
            tempCourses = tempCourses.filter(item => item.course_price_type == 0)
        }
        
        if (language != 5) {
            tempCourses = tempCourses.filter(item => {
                return item.course_language == language
            }) 
            if ( tempCourses.length == 0 ) {
                this.setState({ noFilter: "Нема курсеви со избраниот јазик, одберете подолу некој од другите курсеви ... "})
            } else {
                this.setState({ noFilter: "all"})
            }
        }
        
        
        this.setState({ 
            sortedCourses : tempCourses,
        })

    }
    render() {
        let myCourses
        if (this.state.sortedCourses.length == 0) {
             myCourses = this.state.courses
        } else {
             myCourses = this.state.sortedCourses
        } 
        if (this.state.loading) {
            return (
                <div className='text-center mt-5'>
                    <Loading title=" Loading Courses..." /> 
                </div>
            )
        } else {
            return (
                <div>
                    <Container className=''>
                        <Row>
                            <Col >
                                <MainSearchTitle title='Пронајдете ги најдобрите туторијали' >
                                        <TextField
                                            style={{ width: '60vw' }} 
                                            id="title" 
                                            label="Пребарај ..." 
                                            variant="outlined"  
                                            size='small' 
                                            border='red'
                                            type='text'
                                            name='title'
                                            value={this.state.title}
                                            onChange={ this.handleChange }
                                        />
                                </MainSearchTitle>
                            </Col>
                        </Row>
                        <Row className='d-flex justify-content-center align-items-center'>
                            <Col md={1} sm={12} xs={12}><h5 className=''> Филтри</h5></Col>
                            <Col md={11} sm={12} xs={12} className='w-100 d-flex flex-column flex-md-row justify-content-md-around'>
                                <div className='p-3 d-flex flex-md-row justify-content-around align-items-center'>
                                    <div className=' d-flex align-items-center justify-content-around'>
                                        <Form.Check 
                                            type="switch"
                                            id="video-switch"
                                            label="Video"
                                            checked={this.state.video} 
                                            onChange={this.handleChange} 
                                            name='video'
                                            className='text-secondary'
                                            // {this.state.filter}
                                             disabled={this.state.avlFilterVideo ? false : true }
                                        /> 
                                        <Badge pill variant={this.state.filterVideoCount != 0 ? 'success' : 'danger'} className='m-1'>{this.state.filterVideoCount}</Badge>
                                    </div>
                                    <div className=' d-flex align-items-center justify-content-around'>
                                        <Form.Check 
                                            type="switch"
                                            id="book-switch"
                                            label="Book"
                                            checked={this.state.book} 
                                            onChange={this.handleChange} 
                                            name='book'
                                            className='text-secondary' 
                                            disabled={this.state.avlFilterBook ? false : true }
                                            />
                                        <Badge pill variant={this.state.filterBookCount != 0 ? 'success' : 'danger'} className='m-1'>{this.state.filterBookCount}</Badge>
                                    </div>
                                    <div className=' d-flex align-items-center justify-content-around'>  
                                        <Form.Check 
                                            type="switch"
                                            id="free-switch"
                                            label="Free"
                                            checked={this.state.free} 
                                            onChange={this.handleChange} 
                                            name='free'
                                            className='text-secondary'
                                            disabled={this.state.avlFilterFree ? false : true }
                                        />
                                        <Badge pill variant={this.state.filterFreeCount != 0 ? 'success' : 'danger'} className='m-1'>{this.state.filterFreeCount}</Badge>
                                    </div>
                                    <div className=' d-flex align-items-center justify-content-around'>
                                        <Form.Check 
                                            type="switch"
                                            id="paid-switch"
                                            label="Paid"
                                            checked={this.state.paid} 
                                            onChange={this.handleChange} 
                                            name='paid'
                                            className='text-secondary'
                                            disabled={this.state.avlFilterPaid ? false : true }
                                        />
                                        <Badge pill variant={this.state.filterPaidCount != 0 ? 'success' : 'danger'} className='m-1'>{this.state.filterPaidCount}</Badge>
                                    </div>
                                </div>                                    
                                <div className='px-1 d-flex align-items-center justify-content-center'>  
                                    <Form.Label className='text-center m-0 p-2 font-italic text-danger font-weight-bold'>Јазик</Form.Label>
                                    <Form.Control as="select" custom size="sm" value={this.state.language} name='language' onChange={this.handleChange} className=''>
                                        <option value='' style={{display: "none"}}>Одбери Јазик</option>
                                        <option value='0' >English</option>
                                        <option value='1'>Spanish</option>
                                        <option value='2'>German</option>
                                        <option value='3'>Franch</option>
                                    </Form.Control>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {console.log(this.state.noFilter)}
                                <h5 className='text-danger'> {this.state.noFilter != 'all' ? this.state.noFilter : null }</h5>
                            </Col>
                        </Row>
                        <Row className='justify-content-center'>
                            <Col md={12}>
                                <Row>
                                    {   
                                        myCourses.map((item, index) =>  {
                                        // this.state.sortedCourses.map((item, index) =>  {
                                        let courseVotes = item.votes.length
                                        let color = 'none'
                                        let status = false
                                        item.votes.map(vote => {
                                            if (vote.user_id == this.state.voting_id) {
                                                color = 'red'
                                                status = true
                                            } 
                                        })
                                      
                                        if (item.course_name.toLowerCase().includes(this.state.title.toLowerCase())) {
                                            return (
                                                <Col md={6} key={item.id} className='p-1 '>
                                                    <CourseModel 
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
                                                        color={color}
                                                        status={status}
                                                    />
                                                </Col>
                                            );
                                        } 
                                    })
                                    }
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
        }
    }

}


export default withRouter(TechList);



