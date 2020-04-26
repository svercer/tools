import React, { Component } from 'react'
import MainSearchTitle from '../layouts/MainSearchTitle';
import MainSearchBar from '../layouts/MainSearchBar';
import Axios from 'axios';
import MainModel from '../layouts/MainModel';
import { Container, Row, Col } from 'react-bootstrap';
import Loading from '../helpers/Loading';
import { TextField } from '@material-ui/core';

export default class DevOps extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mains: [],
            loading: true,
            filter: '',
        }
        this.handleFilter = this.handleFilter.bind(this)
    }

    async componentDidMount() {
        let category = 3
        await Axios.get(`/api/getMains/${category}`)
            .then( (response) => {
                 this.setState({
                    mains: response.data.items,
                    loading : false,
                 })
                //  console.log(this.state.mains)
                 
            }).catch(error => console.log(error))
    }

    handleFilter(event) {
        const { name, value } = event.target
        this.setState({ 

            [name] : value  
        }, 
        // this.filterCourse
        )
    }
     
    render() {
        if (this.state.loading) {
            return (
                <div className='text-center mt-5'>
                    <Loading title="Loading ..."/>
                </div>
            )
        } else {
            return (
                <div>
                    <MainSearchTitle title='Пронајди ги најдобрите DevOps туторијали'>
                        {/* <MainSearchBar /> */}
                        <form>
                            <TextField
                                style={{width: '60vw'}} 
                                id="search" 
                                label="Search" 
                                variant="outlined" 
                                size='small' 
                                border='red'
                                type='text'
                                name='filter'
                                value={ this.state.filter }
                                onChange={ this.handleFilter }
                            />
                        </form>
                    </MainSearchTitle>
                    <Container className=''>
                        <Row className='justify-content-center'>
                            <Col md={8}>
                                <Row>
                                    {this.state.mains.map((item, index) =>  {
                                        {console.log(item.main_name)}
                                        if (item.main_name.includes(this.state.filter)) {
                                            return (
                                                <MainModel 
                                                key={item.id}
                                                id={item.id} 
                                                main_name={item.main_name} 
                                                main_url={item.main_url} 
                                                main_slug={item.main_slug} 
                                                category_id={item.category_id} 
                                                />
                                            );
                                        }
                                        })}
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
        }
    }
}
