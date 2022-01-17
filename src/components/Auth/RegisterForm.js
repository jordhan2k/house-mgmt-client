import { Box, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthButton, ErrorMessage, FormBody, FormContainer, FormFooter } from '../../pages/Auth';
import { authInputTypes, colors } from '../../utils/constants';
import FormInput from './FormInput';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { useDispatch, useSelector } from 'react-redux';
import { checkUsernameSucceed, chekUsernameRequest, registerRequest } from '../../redux/actions/authActions';

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



const RegisterForm = () => {

    const dispatch = useDispatch();
    const passwordPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");

    const initialForm = {
        username: "",
        password: "",
        confirmPassword: "",
        passwordMatch: null,
        passwordScore: null
    };

    const [registerForm, setRegisterForm] = useState(initialForm);

    const { username, password, confirmPassword, passwordMatch, passwordScore } = registerForm;

    const handleUsernameChange = (event) => {
        setRegisterForm(prevState => ({
            ...prevState,
            username: event.target.value
        }));
    }

    const gradePassword = password => {
        let score = 0;
        if (password.length >= 8 && password.length <= 15) score++;
        if (passwordPattern.test(password)) score++;
        return score;
    }


    const handlePasswordChange = event => {
        setRegisterForm(prevState => ({
            ...prevState,
            password: event.target.value,
            passwordScore: gradePassword(event.target.value)
        }));
    }

    const handleConfirmPasswordChange = event => {
        setRegisterForm(prevState => ({
            ...prevState,
            passwordMatch: password === event.target.value,
            confirmPassword: event.target.value
        }));
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (username && password && passwordMatch && passwordScore === 2) {
            dispatch(registerRequest({ username, password }));
        } else {
            return;
        }
    }
    return (
        <FormContainer component={"form"} onSubmit={event => handleSubmit(event)}>
            <FormBody >
                <FormInput
                    name="username"
                    value={username}
                    type={authInputTypes.username}
                    placeholder="Enter your username"
                    onChange={event => handleUsernameChange(event)}
                />
                {(username && username.length < 6) && <ErrorMessage >Must be from 6 chars long.</ErrorMessage>}
              


                <FormInput
                    name="password"
                    value={password}
                    type={authInputTypes.password}
                    placeholder="Enter password"
                    onChange={event => handlePasswordChange(event)}
                    status={passwordScore === 2 && "success"}
                />
                {(passwordScore !== 2 && password) && <>
                    <ErrorMessage >Must be from 8 to 15 chars long.</ErrorMessage>
                    <ErrorMessage>Must contain at leat 1 uppercase, 1 lowercase, 1 digit and 1 special character.</ErrorMessage>
                </>}

                <FormInput
                    name="confirmPassword"
                    value={confirmPassword}
                    type={authInputTypes.password}
                    placeholder="Enter password"
                    onChange={event => handleConfirmPasswordChange(event)}
                    status={passwordMatch === true ? "success" : (passwordMatch === false ? "error" : "")}
                />
                {passwordMatch === false && <ErrorMessage >Password do not match.</ErrorMessage>}

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
                        <Level active={passwordScore === 2} />
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

export default RegisterForm
