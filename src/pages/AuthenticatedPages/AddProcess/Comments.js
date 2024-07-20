import React, { useState, useEffect } from "react";
import Styles from "./Style.module.css"
import { Button, Input } from 'antd';
import axios from 'axios';
const token = localStorage.getItem('token');
const companyId = localStorage.getItem('companyId');
const { REACT_APP_DETAILS_URL } = process.env;
const { TextArea } = Input;

export default function Comments({id}) {
    const [comment, setComment] = useState('')
    const [commentList, setCommentList] = useState([]);

    const fetchData = () => {
        console.log(token)
        axios
            .get(`${REACT_APP_DETAILS_URL}comment/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                setCommentList(res.data);
                console.log(res)
            })
            .catch((error) => {
                console.error('Error while submitting form:', error);
            });
    };
    const submitForm = () => {
        const payload = {
            "name": comment,
            "processId": id,
            "userId": companyId
        };

        axios
            .post(`${REACT_APP_DETAILS_URL}comment`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                console.log(res)
                fetchData();
                setComment("")
            })
            .catch((error) => {
                console.error('Error while submitting form:', error);
            });
    };
 
    useEffect(() => {
        fetchData()
    }, []);

    return (
        <>
            <div className={Styles.comments}>
                <div className={Styles.main}>
                    {commentList.map(val => (
                        <div key={val.id}>
                            <div className={Styles.comment}>{val.name}</div>
                            <div className={Styles.datetime}>{val.user.name}</div>
                        </div>
                    ))}
                </div>
                <div className={Styles.footer}>
                    <TextArea value={comment} onChange={({ target }) => setComment(target.value)} type="text" rows={2} placeholder="Enter Comments" />
                    <Button onClick={() => submitForm()} style={{
                        backgroundColor: 'rgb(0, 62, 107)',
                        color: '#ffffff',
                        marginLeft: '20px'
                    }}>Submit</Button>
                </div>
            </div>
        </>
    )
}