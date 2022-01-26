import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { AuthButton, FormBody, FormContainer, FormFooter } from '../../pages/Auth'
import { loginRequest } from '../../redux/actions/authActions'
import { authInputTypes, colors } from '../../utils/constants'
import { loginValidate } from '../../utils/formValidators'
import FormInput from './FormInput';
import { Box, styled, Typography } from '@mui/material';

const Label = styled("label")({
    fontSize: 14,
    fontWeight: 500,
    marginLeft: 10,
    color: colors.secondaryDarkBlue
})

let LoginForm = ({ username, password, staySignedIn }) => {
    const dispatch = useDispatch();

    const handleSubmit = event => {
        event.preventDefault();
        if (username && password) {
            dispatch(loginRequest({ username, password, staySignedIn }));
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

                <Box display="flex" alignItems="center">
                    <Field
                        name="staySignedIn"
                        type="checkbox"
                        component="input"
                        id="stay-signed-in"
                    />
                    <Label htmlFor="stay-signed-in">Stay signed in</Label>
                </Box>
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
    password: selector(state, "password"),
    staySignedIn: selector(state, "staySignedIn")
}))(LoginForm);

export default LoginForm;
