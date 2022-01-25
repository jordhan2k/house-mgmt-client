import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { AuthButton, FormBody, FormContainer, FormFooter } from '../../pages/Auth'
import { loginRequest } from '../../redux/actions/authActions'
import { authInputTypes } from '../../utils/constants'
import FormInput from './FormInput'

const loginValidate = values => {
    const error = {};
    if (!values.username) {
        error.username = "Required";
    } else if (values.username.length < 6) {
        error.username = "Must be from 6 chars long"
    }
    if (!values.password) {
        error.password = "Required";
    } else if (values.password.length < 8 || values.password.length > 15) {
        error.password = "Must be from 8 to 15 chars long"
    }
    return error;
}

let LoginForm = ({ username, password }) => {
    const dispatch = useDispatch();

    const handleSubmit = event => {
        event.preventDefault();
        if (username && password) {
            dispatch(loginRequest({ username, password }));
        }
    }

    return (
        <FormContainer component={"form"} onSubmit={handleSubmit}>
            <FormBody >
                <Field
                    name="username"
                    placeholder="Enter your username"
                    component={FormInput}
                    fldType={authInputTypes.username}
                    type="text"
                />

                <Field
                    name="password"
                    fldType={authInputTypes.password}
                    placeholder="Enter password"
                    type="password"
                    component={FormInput}
                />
            </FormBody>

            <FormFooter>
                <AuthButton
                    type="submit"
                    active={true}>
                    Login
                </AuthButton>
                <Link to="/register" style={{ color: "white" }}>
                    <AuthButton>
                        Sign up
                    </AuthButton>
                </Link>
            </FormFooter>
        </FormContainer>
    )
}

LoginForm = reduxForm({
    form: "form/auth/login",
    validate: loginValidate
})(LoginForm);

const selector = formValueSelector("form/auth/login");

LoginForm = connect(state => ({
    username: selector(state, "username"),
    password: selector(state, "password")
}))(LoginForm);

export default LoginForm;
