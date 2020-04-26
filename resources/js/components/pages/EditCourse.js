import React, { Component } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { TextField, FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText } from '@material-ui/core';
import Axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

export default class EditCourse extends Component {
    constructor(props){
        super(props)
        this.state = {
            token: localStorage.getItem('token'),
            course: [],
            main: [],

            course_name: "",
            course_url: "",
            course_type: "",
            course_language: "",
            course_price_type: "",

            errorCourse_name:"",
            errorCourse_language: "", 
            errorCourse_price_type: "", 
            errorCourse_type: "", 
            errorCourse_url: "", 
        }  
        this.handleChange = this.handleChange.bind(this) 
        this.handleSubmit = this.handleSubmit.bind(this) 
    }

    componentDidMount(){
        Axios.get(`/api/edit-course/${this.props.match.params.id}`, {
            headers: {
                "Authorization": `Bearer ${this.state.token}`
            }
        })
        .then(response => {
            this.setState({
                course: response.data.item,
                main: response.data.item.main
            })
        })
    }
    handleChange(e){
        const {name, value} = e.target
        this.setState({
            [name]:value
        })
    }
    handleSubmit(e){
        e.preventDefault()
        let credentials = {
            id: this.state.course.id,
            course_name: this.state.course_name,
            course_url: this.state.course_url,
            course_type: this.state.course_type,
            course_language: this.state.course_language,
            course_price_type: this.state.course_price_type,
        }
        Axios.post("/api/update-course", credentials, {
            headers: {
                "Authorization": `Bearer ${this.state.token}`
            }
        })
        .then(response => {
            if (response.data.success == 200) {
                swal({
                    title: "Успешно го изменивте туторијалот",
                    text: response.data.message,
                    icon: "success",
                    button: "ОК!",
                     
                    })
                setTimeout(  () => this.props.history.push('/profile'), 3000 )
            } else if(response.data.error) {
                this.setState({ 
                    errorCourse_url: response.data.message.course_url, 
                    errorCourse_name: response.data.message.course_name,  
                    errorCourse_price_type:response.data.message.course_price_type,  
                    errorCourse_type:response.data.message.course_type,
                    errorCourse_language:response.data.message.course_language, 
                })
            }
        })
    }

    render() {
        return (
            <div>
                <Container>
                    <Row className='justify-content-center'>
                        <Col md={8} >
                            <Form onSubmit={this.handleSubmit} className='mt-5'>
                                <h4 className='text-center'>Креирај Туторијал</h4>
                                <Form.Group>
                                    <Form.Control
                                        id="course_name"
                                        // label="Име на туторијалот"
                                        type="text"
                                        // variant="outlined"
                                        className='w-100'
                                        size='small'
                                        name='course_name'
                                        defaultValue={this.state.course.course_name}
                                        // helperText={this.state.errorCourse_name}
                                        onChange={this.handleChange}
                                    />
                                    {this.state.errorCourse_name ? <p className='text-danger'>{this.state.errorCourse_name}</p>: null}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        id="course_url"
                                        // label="Линк до туторијалот: https://example.com"
                                        type="text"
                                        // autoComplete="current-password"
                                        variant="outlined"
                                        className='w-100'
                                        
                                        name='course_url'
                                        defaultValue={this.state.course.course_url}
                                        // error
                                        // helperText={this.state.errorCourse_url}
                                        onChange={this.handleChange}
                                    /> 
                                </Form.Group>
                                <Form.Group className='d-flex justify-content-around'>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Видео или Друг Формат</FormLabel>
                                        <RadioGroup aria-label="gender" name='course_type' onChange={this.handleChange}>
                                            <FormControlLabel value="0"  control={<Radio />} label="Видео" />
                                            <FormControlLabel value="1"  control={<Radio />} label="Друг формат" />
                                            
                                        </RadioGroup>
                                        <FormHelperText>{this.state.errorCourse_type}</FormHelperText>
                                    </FormControl>
                                {/* </Form.Group>
                                <Form.Group> */}
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Цена</FormLabel>
                                        <RadioGroup aria-label="gender" name='course_price_type'  onChange={this.handleChange} >
                                            <FormControlLabel value="0"  control={<Radio />} label="Бесплатен" />
                                            <FormControlLabel value="1"  control={<Radio />} label="Платен" />
                                        </RadioGroup>
                                        <FormHelperText>{this.state.errorCourse_price_type}</FormHelperText>
                                    </FormControl>
                                </Form.Group>

                                <Form.Group>
                                        <Form.Label>Технологија</Form.Label>
                                        <Form.Control  
                                            name="main_id" 
                                            disabled 
                                            defaultValue={this.state.main.main_name} 
                                        />
                                </Form.Group>

                                <Form.Group>
                                <Form.Label>Избери Јазик на кој се предава туторијалот</Form.Label>
                                    <Form.Control as="select" size="sm" custom name="course_language" onChange={this.handleChange}>
                                        <option style={{display: 'none'}}>Одбери</option>
                                        <option value={0}>Англиски</option>
                                        <option value={1}>Шпански</option>
                                        <option value={2}>Германски</option>
                                        <option value={3}>Француски</option>
                                    </Form.Control>
                                    { this.state.errorCourse_language !== '' ? 
                                            <p className='text-danger mt-1 '>Полето е задолжително</p> : null}
                                </Form.Group>
                                <Form.Group>
                                    <Button type='submit' className='btn btn-sm btn-sm-block btn-success mr-3'>
                                            Измени
                                    </Button>
                                    <Link className='btn btn-danger btn-sm' to='/profile'>Откажи</Link>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
