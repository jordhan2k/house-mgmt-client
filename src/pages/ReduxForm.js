import { Typography } from '@mui/material';
import React from 'react';
import { connect, useSelector } from 'react-redux';
import { formValueSelector } from 'redux-form';
import FormComponent from '../components/ReduxForm/FormComponent';

let ReduxForm = (props) => {

    const { firstName, lastName, email } = props;

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`{${firstName}, ${lastName}, ${email}`)
    }

    return (
        <>
            <Typography>Login Form</Typography>
            <FormComponent handleSubmit={handleSubmit} />
        </>
    );
};

const selector = formValueSelector("redux-form-demo");

ReduxForm = connect(state => {
    const { firstName, lastName, email } = selector(state, "firstName", "lastName", "email");
    return { firstName, lastName, email };
})(ReduxForm);

export default ReduxForm;
