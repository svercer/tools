import React, { Component } from 'react'
import { Container, Row, Col, Form, FormControl, FormLabel, Button } from 'react-bootstrap'
import Axios from 'axios'
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export default class CreateTechnologie extends Component {
    constructor(props){
        super(props)
        this.state = {
            main_name: "",
            main_url: "",
            category_id: "",
            main_slug: "",
            errorMain_name: "",
            errorMain_url: "",
            errorCategory_id: "",
            errorMain_slug: "",
            error: "",
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        Axios.get(`/api/check-user`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            if(response.data.error === 401) {
                this.props.history.push('/')
            }
        }).catch(error => {
            if (error) {
                this.props.history.push('/')
            }
        })
       
    }
    
    handleChange(e){
        const { type, name, value} = e.target
        type === 'file' ? this.setState({ [name]: e.target.files[0] }): 
        this.setState({
            [name]: value 
        })
    }

    handleSubmit(e){

        e.preventDefault()
        if (!this.state.main_url) {
            this.setState({ 
                errorMain_url: "Полето е задолжително",
            })
            return 
        }
        console.log(this.state)
        let credentials = new FormData();
        credentials.append('main_name', this.state.main_name)
        credentials.append('main_url', this.state.main_url, this.state.main_url.name )
        credentials.append('category_id', this.state.category_id)
        credentials.append('main_slug', this.state.main_slug)

        Axios.post("/api/create-tech", credentials, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            if (response.data.success == 200) {
                swal({
                    title: "Супер",
                    text: response.data.message,
                    icon: "success",
                    button: "ОК!",
                })
                let form = document.getElementById('techForm')
                form.reset()
                this.setState({
                    main_name: "",
                    category_id: "",
                    main_slug: "",
                })
            } else if (response.data.error == "validation" ) {
                this.setState({
                    errorMain_name: response.data.message.main_name,
                    errorMain_url: response.data.message.main_url,
                    errorCategory_id: response.data.message.category_id,
                    errorMain_slug: response.data.message.main_slug
                })
            } else if (response.data.error == "slug") {
                    this.setState({ error: response.data.message })
            }
        })
    }

    render() {
        return (
            <div>
                <Container>
                <Link to="/admin-dashboard" className='btn btn-danger'>Back</Link>
                    <Row className='mt-5'>
                        <Col>
                            <h4 className='text-center'>Креирај технологија</h4>
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col md={8}>
                            <Form id="techForm" onSubmit={this.handleSubmit}>
                                <Form.Group>
                                    <FormLabel>Име на Технологијата</FormLabel>
                                    <FormControl
                                        type='text'
                                        name='main_name'
                                        value={this.state.main_name}
                                        onChange={this.handleChange}
                                        placeholder="Пример: Java Script , Php, React JS, Angular, .Net, ..."
                                    />
                                </Form.Group>
                                <p className='text-danger'>{this.state.errorMain_name} </p> 

                                <Form.Group>
                                    <FormLabel>Слика</FormLabel>
                                    <FormControl
                                        type='file'
                                        name='main_url'
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                                <p className='text-danger'>{this.state.errorMain_url} </p>


                                <Form.Group>
                                    <FormLabel>Категорија</FormLabel>
                                    <FormControl as='select' custom
                                        name='category_id'
                                        value={this.state.category_id}
                                        onChange={this.handleChange}
                                    >
                                        <option value="0" style={{display: "none"}}>Одбери Категорија</option>
                                        <option value="1" >Programming</option>
                                        <option value="2" >Data Science</option>
                                        <option value="3" >Dev Ops</option>
                                        <option value="4" >Design</option>
                                    </FormControl>
                                </Form.Group>
                                <p className='text-danger'>{this.state.errorCategory_id} </p> 

                                <Form.Group>
                                    <FormLabel>Slug или линк / патека </FormLabel>
                                    <FormControl 
                                        name="main_slug" 
                                        type="text" 
                                        placeholder="Пример: java-script, phyton, php, "
                                        value={this.state.main_slug} 
                                        onChange={this.handleChange}
                                        />
                                    <small className='text-danger'>Напомена! Овој текст треба да е уникатен и претходно да не постои</small>
                                </Form.Group>
                                <p className='text-danger'>{this.state.errorMain_slug} </p> 

                                <Form.Group>
                                    <Button type="submit" className='btn btn-success'>Креирај</Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}


