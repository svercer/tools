import React from 'react';
import Axios from 'axios';
import { withRouter, Redirect, Route } from 'react-router-dom';
import Loading from '../helpers/Loading';
import MainSearchTitle from '../layouts/MainSearchTitle';
import MainSearchBar from '../layouts/MainSearchBar';
import { Container, Row, Col } from 'react-bootstrap';
import CourseModel from '../layouts/CourseModel';
import { TextField } from '@material-ui/core';
import LoginModal from '../helpers/LoginModal';


class TechList1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            title: '',
            slug: this.props.match.params.slug,
            courses: [],
            sortedCourses: [],
            token: localStorage.getItem('token'),
            voting_id: localStorage.getItem('voting_id'),
        }
        this.handleChange = this.handleChange.bind(this)
        // this.myFilter = this.myFilter.bind(this)
    }

    async componentDidMount() {
        await Axios.get(`/api/getCourses/${this.state.slug}`)
        .then(response =>  {
            if (response.data.success === 200) {
                this.setState({
                    courses: response.data.items,
                    loading: false,
                })
            }
        })
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({ 
            [name] : value  
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
                    <MainSearchTitle title='Пронајдете ги најдобрите туторијали' >
                        {/* <MainSearchBar onChange={this.handleChange} /> */}
                        {/* <form> */}
                            <TextField
                                style={{ width: '60vw' }} 
                                id="search" 
                                label="Search" 
                                variant="outlined"  
                                size='small' 
                                border='red'
                                type='text'
                                name='title'
                                // value={ this.state.filter }
                                onChange={ this.handleChange }
                               
                            />
                        {/* </form> */}
                    </MainSearchTitle>
                    <Container className=''>
                        <Row className='justify-content-center'>
                            <Col md={12}>
                                <Row>
                                    {
                                        this.state.courses.map((item, index) =>  {
                                        let courseVotes = item.votes.length
                                        let color = 'none'
                                        let status = false
                                        item.votes.map(vote => {
                                            if (vote.user_id == this.state.voting_id) {
                                                color = 'red'
                                                status = true
                                            } else {
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


export default withRouter(TechList1);



