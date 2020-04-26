import React, { useState } from 'react';
import css from "../../../../public/css/style.css";
import {Col, Badge, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GoArrowUp } from 'react-icons/go';
import axios from 'axios';
import swan from 'sweetalert';
import Loading from '../helpers/Loading';

export default function CourseModel({ id, course_url, course_name, course_type, course_price_type, course_language, user_name, course_aproved, created_at, votes, voteUp, color, status, updated_at }) {

    function myDate(date) {
        let transformedDate = new Date(date)
        let dd = transformedDate.getDate()
        if (dd < 10) {
            dd = '0'+dd
        }
        let mm = transformedDate.getMonth() + 1
        if (mm < 10 ) {
            mm = '0'+mm
        }
        let yyyy = transformedDate.getFullYear()

        let returnDate = `${dd}/${mm}/${yyyy}`
        return returnDate
    }
    const [voteColor, setVoteColor] = useState(color)
    const [vote, setVote] = useState(status)
    const [voteCount, setVoteCount] = useState(votes)
    const [aproved, setAproved] = useState(course_aproved)
    const [explanation, setExplanation] = useState()
    const [courseid, setCourseId] = useState(id)
    const [loading, setLoading] = useState(false)
    const [loadingApp, setLoadingApp] = useState(false)
    let [language, setLanguage] = useState(course_language)
    const [languageClass, setLanguageClass] = useState()

    function lan(language) {
        if (language == 0) {
            return "English"
        } else if(language == 1) {
            return  "Spanish"
        } else if (language == 2) {
            return "German"
        } else if (language == 3) {
            return "Franch"
        }
    } 

    function my(e){
        if (!localStorage.getItem('token')) {
            swal({
                title: "Грешка",
                text: "Мора да бидете логирани за да гласате",
                icon: "error",
                button: "ОК!",
            })
        }
        const element = e.target
        let vote = element.getAttribute('voted')
        let courseid = e.target.getAttribute('courseid')
        console.log('vote: ',vote)
        if (localStorage.getItem('voting_id') && vote == 'false') {
            console.log('vote ')
            // voting query
            let credentials = {
                courseid: courseid,
                token: localStorage.getItem('token')
            }
            axios.post('/api/vote-up', credentials, {
                headers: { 
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`}
            })
            .then(response => {
                setVoteCount(response.data.votes)
                setVoteColor('red')
                element.setAttribute('voted','true')
            })

        } else {
            console.log('delete vote')
            // delete query
            let credentials = {
                courseid: courseid,
                token: localStorage.getItem('token')
            }
            axios.post('/api/vote-down', credentials, {
                headers: { 
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`}
            })
            .then(response => {
                setVoteCount(response.data.votes)
                setVoteColor('grey')
                element.setAttribute('voted','false')
            })
        }
    } 
    function handleChange(e){
        const {name, value} = e.target
       setExplanation(value)
    }
    function handleSubmit(e){
        e.preventDefault()
        // let courseid = e.target.getAttribute('decline')
        let credentials = {
            courseid:courseid,
            text:explanation
        }
        setLoading(true)
        axios.post('/api/course/decline', credentials, {
            headers: {
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            if (response.data.success == 200) {
                setAproved(0)
                swal({
                    title: "Супер",
                    text: "Tуторијалот беше успешно ДЕАКТИВИРАН!",
                    icon: "success",
                    button: "ОК!",
                })
                setLoading(false)
                let textarea = document.getElementById('explanation')
                textarea.value = ''
            } else {
                swal({
                    title: "X",
                    text: "Пробајте подоцна",
                    icon: "error",
                    button: "ОК!",
                })
            }


        })
    }
    function handleAprove(e){
        let courseid = e.target.getAttribute('votecourseid')
        console.log('cid', courseid)
        let credentials = {
            courseid: courseid,
        }
        setLoadingApp(true)

        axios.post("/api/course/approve", credentials, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            console.log(response.data)
            if (response.data.success == 200) {
                setAproved(1)
                swal({
                    title: "Супер",
                    text: "Tуторијалот беше успешно одобрен!",
                    icon: "success",
                    button: "ОК!",
                })
                setLoadingApp(false)
            } else {
                swal({
                    title: "X",
                    text: "Пробајте подоцна",
                    icon: "error",
                    button: "ОК!",
                })
            }
        })
    }   

    return (
        <div>
            <div className='courseDiv d-flex justify-content-start align-items-start border p-2'>
                <div className='mr-5'>
                    <div 
                        className=' voteDiv d-flex flex-column align-items-center justify-content-around p-2' 
                        style={{ backgroundColor: voteColor }}>
                        {location.pathname != '/admin-dashboard' ? <img 
                            src='images/arrow.svg' 
                            style={{ width: '20px'}} 
                            onClick={ my } 
                            voted={ status ? 'true' : 'false'}
                            courseid={id}
                            className='voteIcon cursor-pointer'
                        /> 
                        : null
                        }
                        <span className='text-white font-weight-bold'>{voteCount}</span>
                    </div>
                </div>
                <div className='ml-1 d-flex flex-column'>
                    <div className='mb-2'>
                        <a href={course_url} target="_blank">
                            <p className='m-0'>{course_name}</p>
                        </a>
                        <p className='m-0'><small> Submited by :</small> 
                            <span className='font-italic'> {user_name} </span> 
                            <small className='font-weight-bold'>on: </small> <span className='font-italic text-secondary'>{ myDate(created_at)  }</span>
                        </p>
                    </div>
                    <div className=''>
                        <span className='m-1'> <Badge pill variant="primary"> {course_type == 0 ? 'video' : 'book'} </Badge></span>
                        <span className='m-1'>
                            <Badge pill variant={course_price_type == 0 ? 'success' : 'secondary' }> { course_price_type == 0 ? 'free' : 'paid' } </Badge>
                        </span>
                        <span className='m-1'>
                            {/* { course_language == 0 ? 'English' : 'Other' } */}
                           <Badge pill variant='warning'>{lan(language)}</Badge>
                        </span>
                        <span className='m-1'> 
                            <Badge pill variant={aproved == 1 ? 'success' : 'danger'}> {aproved == 1 ? "Approved by Brainster" : "Not approved"} </Badge> 
                        </span>
                    </div>
                </div>
            </div>
            {location.pathname == '/admin-dashboard' ?
            <div>   
                <div>Обновен на {myDate(updated_at)}</div>
                <div className='text-center'>{loadingApp ? <Loading title={"Ве молиме почекајте"}/> : null}</div>
                <div>
                    <Button onClick={handleAprove} votecourseid={id} className='btn btn-sm btn-success mt-1 approve' type='button'>Одобри</Button>
                </div>
                <hr className='bg-warning'/>
                <div className='d-flex flex-column'>
                    <Form onSubmit={handleSubmit}>
                        <div className='text-center'>{ loading ? <Loading title={"Ве молиме почекајте"}/> : null}</div>
                        <p className='mb-1'>Објаснување: </p>
                        <Form.Control as='textarea' 
                            placeholder=' Напишете кратко објаснување доколку не го одобрувате овој тутотијал' 
                            name='explanation'
                            onChange={handleChange}
                            id='explanation'
                        />
                        {/* <input type='hidden' name='courseid' value={id} /> */}
                        <Button type='submit' className='mt-1 btn btn-sm btn-danger decline'>Не одобрувај</Button>
                    </Form>
                </div>
            </div> : null
            }
        </div>
    )
}
