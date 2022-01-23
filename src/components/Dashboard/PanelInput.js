import { Box, styled, Typography } from '@mui/material'
import React from 'react'

const Container = styled(Box)(props => ({
    marginBottom: 5
}));

const Label = styled(Typography)({
    fontFamily: "inherit",
    fontWeight: 500,
    fontSize: 14,
    textTransform: "capitalize",
});

const Input = styled('input')(props => ({
    border: "none",
    outline: "none",
    minWidth: 300,
    padding: 5,
    boxSizing: "content-box",
    borderRadius: 5,
    border: "0.5px solid rgba(0,0,0,.1)"
}));


const PanelInput = ({ label ,...rest }) => {
    return (
        <Container >
            <Label>{label}</Label>
            <Input {...rest} />
        </Container>

    )
}

export default PanelInput
