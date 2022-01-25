import { Box, Divider, styled, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { colors } from '../../utils/constants';

const FormContainer = styled('form')(props => ({

}));

const Input = styled('input')(props => ({

}));

const Button = styled('button')(props => ({

}));

const Error = styled(Typography)(props => ({
    fontFamily: "inherit",
    fontWeight: 400,
    fontSize: 13,
    color: colors.primaryRed
}))

const Label = styled(Typography)(props => ({
    fontFamily: "inherit",
    fontWeight: 600,
}));

const renderField = ({
    placeholder,
    input,
    label,
    type,
    meta: { touched, error, warning }
}) => (
    <>
        <Label>{label}</Label>
        <Input
            autoComplete="off"
            placeholder={placeholder}
            type={type}
            {...input} />
        {(touched && error) && <Error>{error}</Error>}
    </>
);

const validate = values => {
    const error = {};
    if (!values.firstName) {
        error.firstName = "Required";
    }

    if (!values.lastName) {
        error.lastName = "Required";
    }

    if (!values.username) {
        error.username = "Required";
    } else if (values.username.length < 6 || values.username.length > 20) {
        error.username = "Must be from to 6 to 20 chars long.";
    }

    if (!values.email) {
        error.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        error.email = "Invalid email.";
    }

    if (!values.password) {
        error.password = "Required";
    } else if (values.password.length < 8 || values.password.length > 15) {
        error.password = "Must be from 8 to 15 chars long.";
    }

    return error;
}

let FormComponent = props => {

    const { handleSubmit } = props;

    return <FormContainer onSubmit={handleSubmit}>

        <Field
            label="First name"
            name="firstName"
            placeholder="Enter your first name"
            component={renderField}
            type="text"
        />

        <Field
            label="Last name"
            name="lastName"
            placeholder="Enter your last name"
            component={renderField}
            type="text"
        />
        <Field
            label="Username"
            name="username"
            placeholder="Enter your username"
            component={renderField}
            type="text"
        />

        <Field
            label="Password"
            name="password"
            placeholder="Enter your password"
            component={renderField}
            type="password"
        />

        <Field
            label="Email"
            name="email"
            placeholder="Enter your email address"
            component={renderField}
            type="email"
        />
        <Divider />
        <Button type='submit'>Submit</Button>
    </FormContainer>;
};

FormComponent = reduxForm({
    form: "redux-form-demo",
    validate
})(FormComponent);

export default React.memo(FormComponent);
