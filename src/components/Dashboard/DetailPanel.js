import { Box, Dialog, Divider, styled, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { WelcomeText } from '../Common/TopBar';

const DetailContainer = styled(Box)(props => ({
    padding: "10px 20px",
}));

const Image = styled('img')(props => ({
    width: 200,
    height: 200,
    objectFit: "cover",
    boxShadow: "0 0 8px 2px rgba(0, 0, 0, .1)",
    borderRadius: 5
}));

const Field = styled(Box)(props => ({
    display: "flex",
    margin: "5px 0",
    width: 350
}));

const Property = styled(Typography)(props => ({
    flex: 2,
    fontFamily: "inherit",
    fontWeight: 600
}));
const Value = styled(Typography)(props => ({
    flex: 3,
    fontFamily: "inherit",
    fontWeight: 400
}));

const DetailPanel = ({ show, onClose, item, imageSrc }) => {
    return <Dialog open={show} onClose={onClose}>
        <DetailContainer>
            <WelcomeText>{item.name}</WelcomeText>
            <Divider />
            <Box display="flex">
                <Box display="flex" flexDirection="column" justifyContent="space-between">
                    <Field>
                        <Property>Item code</Property>
                        <Value>{item.itemCode}</Value>
                    </Field>
                    <Field>
                        <Property>Price</Property>
                        <Value>{item.price.toLocaleString("en-US")} VND</Value>
                    </Field>
                    <Field>
                        <Property>Location</Property>
                        <Value>{item.location}</Value>
                    </Field>
                    <Field>
                        <Property>Function</Property>
                        <Value>{item.itemFunction}</Value>
                    </Field>
                    <Field>
                        <Property>Expire date</Property>
                        <Value>{moment(item.expireDate).format("yyyy-MM-DD")}</Value>
                    </Field>
                    <Field>
                        <Property>Purchase date</Property>
                        <Value>{moment(item.purchase).format("yyyy-MM-DD")}</Value>
                    </Field>
                </Box>
                <Box display="flex" alignItems="center" padding="10px 0">
                    <Image src={imageSrc} />
                </Box>
            </Box>
        </DetailContainer>
    </Dialog>
};

export default DetailPanel;
