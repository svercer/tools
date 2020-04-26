import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { TextField, FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText } from '@material-ui/core';
import Axios from 'axios';
import swal from 'sweetalert';

class AddCourse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            course_url: '',
            course_name: '',
            course_price_type: '',
            course_type: '',
            course_language: '',
            main_id: '',
            token: localStorage.getItem('token'),
            allMains: [],
            errorCourse_url: '', 
            errorCourse_name: '', 
            errorCourse_price_type: '', 
            errorCourse_type: '', 
            errorCourse_language: '', 
            errorMain_id: '',
            errorCourse: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    async componentDidMount() {
        // function getMains() {
            let token = localStorage.getItem('token')
            await Axios.get('/api/getMains',{ 
            headers: {
                'Authorization': `Bearer ${token}`
              }} )
            .then(response => {
                this.setState({ allMains: response.data.mains }) 
            })
        // }
    }
    

    handleChange(e){
        const { name, type, value, checked } = e.target
            type == 'checkbox' ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
    }
    handleSubmit(e) {
        e.preventDefault()
        console.log('submited')
        const {course_url, course_name, course_price_type, course_type, course_language, main_id, token } = this.state
        let data = {
            course_url, 
            course_name, 
            course_price_type, 
            course_type, 
            course_language, 
            main_id, 
            token,
        }
        Axios.post("/api/addCourse/create-course", data, { 
            headers: {
                'Authorization': `Bearer ${token}`
            } 
        })
        .then(response => {
            if (response.data.success == 200) {
                swal({
                    title: "Успешно креиравте туторијал",
                    text: "Ке биде разгледан од тимот на Браинстер, од како ке биде одобрен ке биде листан во соодветната категорија!",
                    icon: "success",
                    button: "ОК!",
                     
                    })
                setTimeout(  () => this.props.history.push('/profile'), 3000 )
            } else if(response.data.error == 'validation') {
                this.setState({ 
                    errorCourse_url: response.data.message.course_url, 
                    errorCourse_name: response.data.message.course_name,  
                    errorCourse_price_type:response.data.message.course_price_type,  
                    errorCourse_type:response.data.message.course_type,
                    errorCourse_language:response.data.message.course_language, 
                    errorMain_id:response.data.message.main_id,
                })
            } else if (response.data.error == 500) {
                this.setState({ errorCourse: response.data.message })
            }
        })
        .catch(error => console.log(error))
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
                                    <TextField
                                        id="course_name"
                                        label="Име на туторијалот"
                                        type="text"
                                        // autoComplete="current-password"
                                        variant="outlined"
                                        className='w-100'
                                        size='small'
                                        name='course_name'
                                        // error
                                        helperText={this.state.errorCourse_name}
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <TextField
                                        id="course_url"
                                        label="Линк до туторијалот: https://example.com"
                                        type="text"
                                        // autoComplete="current-password"
                                        variant="outlined"
                                        className='w-100'
                                        size='small'
                                        name='course_url'
                                        // error
                                        helperText={this.state.errorCourse_url}
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className='d-flex justify-content-around'>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Видео или Друг Формат</FormLabel>
                                        <RadioGroup aria-label="gender" name='course_type' value={this.state.course_type}  onChange={this.handleChange}>
                                            <FormControlLabel value="0"  control={<Radio />} label="Видео" />
                                            <FormControlLabel value="1"  control={<Radio />} label="Друг формат" />
                                            
                                        </RadioGroup>
                                        <FormHelperText>{this.state.errorCourse_type}</FormHelperText>
                                    </FormControl>
                                {/* </Form.Group>
                                <Form.Group> */}
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Цена</FormLabel>
                                        <RadioGroup aria-label="gender" name='course_price_type' value={this.state.course_price_type}  onChange={this.handleChange} >
                                            <FormControlLabel value="0"  control={<Radio />} label="Бесплатен" />
                                            <FormControlLabel value="1"  control={<Radio />} label="Платен" />
                                        </RadioGroup>
                                        <FormHelperText>{this.state.errorCourse_price_type}</FormHelperText>
                                    </FormControl>
                                </Form.Group>
                                <Form.Group>
                                        <Form.Label>Избери Технологија</Form.Label>
                                        <Form.Control as="select" size="sm" custom name="main_id" onChange={this.handleChange} >
                                            <option style={{display: 'none'}}>Одбери</option>
                                            {this.state.allMains.map((item, index) => {
                                                return <option key={index} value={item.id} >{item.main_name}</option>
                                            })}
                                        </Form.Control>
                                        { this.state.errorMain_id !== '' ? 
                                            <p className='text-danger mt-1 '>Полето е задолжително</p> : null}
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
                                        {this.state.errorCourse ? <p className='text-danger'>{this.state.errorCourse}</p> : null}
                                <Form.Group>
                                    <Button type='submit' className='btn btn-sm btn-sm-block btn-success'>
                                            Креирај
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                {/* {console.log(this.state)} */}
            </div>
        )
    }
}

export default AddCourse