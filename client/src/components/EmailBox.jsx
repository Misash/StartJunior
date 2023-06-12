import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import MailchimpSubscribe from "react-mailchimp-subscribe";
import "../css/EmailBox.css"



function EmailBox() {

    const postUrl = `https://app.us21.list-manage.com/subscribe/post?u=${process.env.REACT_APP_MAILCHIMP_U}&id=${process.env.REACT_APP_MAILCHIMP_ID}`


    const CustomForm = ({ status, message, onValidated }) => {

        const [email, setEmail] = useState('');
        const [alertMessage, setAlertMessage] = useState('');
        const [alertVariant, setAlertVariant] = useState('');

        const handleSubmit = (e) => {
            e.preventDefault(); //stop refreshing when form submits
            email &&
                email.indexOf("@") > -1 &&
                onValidated({
                    MERGE0: email
                });
        }


        useEffect(() => {

            if (status === "success") {
                setAlertVariant('success');
                setAlertMessage('Email successfully subscribed!');
                setTimeout(() => {
                    clearFields()
                }, 5000); // Hide the alert after 5 seconds
            } else if (status === "error") {
                setAlertVariant('danger');
                setAlertMessage('Failed to subscribe. Please try again later.');
                setTimeout(() => {
                    clearFields()
                }, 5000); // Hide the alert after 5 seconds
            }
        }, [status])

        const clearFields = () => {
            setEmail('');
            setAlertMessage('');
            setAlertVariant('');
        }



        return (
            <div className='EmailBoxContaniner'>
                <Form className="emailBoxForm" onSubmit={handleSubmit}>
                    <p className='labelEmail'>Receive emails of new World-Changing Projects 👇</p>
                    <Form.Group controlId="emailForm" className="d-flex">
                        {/* <Form.Label>Receive emails of new Projects</Form.Label> */}
                        <div className="input-group">
                            <Form.Control
                                type="email"
                                placeholder="Type your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button type="submit" variant="outline-info">
                                Subscribe
                            </Button>
                        </div>
                    </Form.Group>
                </Form>

                {alertMessage && (
                    <Alert variant={alertVariant} className="mt-2 d-inline-block custom-alert">
                        {alertMessage}
                    </Alert>
                )}
            
            </div>
        );


    };


    return (
        <div>
            <MailchimpSubscribe
                url={postUrl}
                render={({ subscribe, status, message }) => (
                    <CustomForm
                        status={status}
                        message={message}
                        onValidated={formData => subscribe(formData)}
                    />
                )}
            />
        </div>

    );
}



export default EmailBox