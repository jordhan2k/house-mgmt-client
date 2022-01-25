import { styled } from '@mui/material';
import React from 'react'
import { authInputTypes, colors } from '../../utils/constants';
import userImg from '../../assets/images/user.png';
import keyImg from '../../assets/images/key.png';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { ErrorMessage } from '../../pages/Auth';

const FormInputContainer = styled('div')(props => ({
    width: "100%",
    borderRadius: 25,
    border: "none",
    boxShadow: "0 0 5px 2px rgba(0, 0, 0, .2)",
    padding: 10,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    margin: "10px 0",
    boxSizing: "border-box"
}));

const Input = styled('input')(props => ({
    border: "none",
    padding: 5,
    outline: "none",
    flex: 1,
    ":: placeholder": {

    }
}));

const SmallImg = styled('img')(props => ({
    width: 25,
    height: 25,
    margin: "0 10px"
}));

const FormInput = ({ fldType, type, status, input, label, meta: { touched, error, warning }, ...rest }) => {
    return (
        <>
            <FormInputContainer>
                <SmallImg src={fldType === authInputTypes.username ? userImg : keyImg} />
                <Input
                    {...input}
                    required
                    type={type}
                    {...rest} />

                {(touched && error) && <CancelOutlinedIcon style={{ fill: colors.primaryRed }} />}
                {(touched && !error) && <CheckCircleOutlineRoundedIcon style={{ fill: colors.primaryGreen }} />}
            </FormInputContainer>
            {(touched && error) && <ErrorMessage>{error}</ErrorMessage>}
        </>
    )
}

export default FormInput;
