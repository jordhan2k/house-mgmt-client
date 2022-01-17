import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { AuthButton, ErrorMessage, FormBody, FormContainer, FormFooter } from '../../pages/Auth'
import { loginRequest } from '../../redux/actions/authActions'
import { authInputTypes } from '../../utils/constants'
import FormInput from './FormInput'

const LoginForm = () => {

    const dispatch = useDispatch();

    const initialForm = {
        username: "",
        password: ""
    }

    const [loginForm, setLoginForm] = useState(initialForm);

    const { username, password } = loginForm;

    const handleInputChange = event => {
        setLoginForm(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(loginRequest(loginForm));
    }

    return (
        <FormContainer component={"form"} onSubmit={event => handleSubmit(event)}>
            <FormBody >
                <FormInput
                    name="username"
                    value={username}
                    type={authInputTypes.username}
                    placeholder="Enter your username"
                    onChange={event => handleInputChange(event)}
                />
                {(username && username.length < 6) && <ErrorMessage >Must be from 6 chars long.</ErrorMessage>}

                <FormInput
                    name="password"
                    value={password}
                    type={authInputTypes.password}
                    placeholder="Enter password"
                    onChange={event => handleInputChange(event)}
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

export default LoginForm
