import { Box, styled, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthButton, FormBody, FormContainer, FormFooter } from '../../pages/Auth';
import { authInputTypes, colors } from '../../utils/constants';
import FormInput from './FormInput';
import { connect, useDispatch } from 'react-redux';
import { registerRequest } from '../../redux/actions/authActions';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { gradePassword, registerValidate } from '../../utils/formValidators';

const PasswordStrength = styled(Box)(props => ({
    margin: "10px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative"
}));

const Level = styled(Box)(props => ({
    width: 50,
    height: 5,
    backgroundColor: props.active ? colors.primaryYellow : "white",
    borderRadius: 5,
    marginLeft: 5,
    boxShadow: "0 0 3px 1px rgba(0, 0, 0, .1)"
}));


let RegisterForm = ({ username, password, confirmPassword }) => {

    const dispatch = useDispatch();

    const [passwordScore, setPasswordScore] = useState(0);

    useEffect(() => {
        setPasswordScore(gradePassword(password, confirmPassword));
    }, [password, confirmPassword]);

    const handleSubmit = event => {
        event.preventDefault();
        if (username && password && passwordScore === 3) {
            dispatch(registerRequest({ username, password }));
        }
    }
    return (
        <FormContainer component={"form"} onSubmit={event => handleSubmit(event)}>
            <FormBody >
                <Field
                    name="username"
                    type={authInputTypes.username}
                    placeholder="Enter your username"
                    component={FormInput}
                />

                <Field
                    name="password"
                    type={authInputTypes.password}
                    placeholder="Enter password"
                    component={FormInput}
                />

                <Field
                    name="confirmPassword"
                    type={authInputTypes.password}
                    placeholder="Enter confirm password"
                    component={FormInput}
                />

                <PasswordStrength>
                    <Box display="flex" alignItems="center">
                        <Typography
                            variant="body2"
                            fontFamily="inherit"
                            fontWeight={600}
                        >Password strength
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center">
                        <Level active={passwordScore >= 1} />
                        <Level active={passwordScore >= 2} />
                        <Level active={passwordScore === 3} />
                    </Box>
                </PasswordStrength>
            </FormBody>

            <FormFooter>
                <Link to="/login" style={{ color: "white" }}>
                    <AuthButton>
                        Login
                    </AuthButton>
                </Link>

                <AuthButton
                    type="submit"
                    active={true}>
                    Sign up
                </AuthButton>
            </FormFooter>
        </FormContainer>
    )
}

RegisterForm = reduxForm({
    form: "form/auth/register",
    validate: registerValidate
})(RegisterForm);

const selector = formValueSelector("form/auth/register");

RegisterForm = connect(state => ({
    username: selector(state, "username"),
    password: selector(state, "password"),
    confirmPassword: selector(state, "confirmPassword")
}))(RegisterForm);

export default RegisterForm;
