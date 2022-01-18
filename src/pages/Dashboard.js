import { Box, Button, Dialog, Divider, Grid, Paper, styled, Typography } from '@mui/material'
import React, { useState } from 'react'
import Calendar from 'react-calendar';
import SidePanel from '../components/Common/SidePanel';
import TopBar from '../components/Common/TopBar';
import '../customCSS/calendar.css';
import { colors } from '../utils/constants';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

const Container = styled(Box)(props => ({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "inherit"
}));

const ContentWrapper = styled(Box)(props => ({
    display: "flex",
    flex: 1,
    width: "100%",
}))

const ContentPanel = styled(Box)(props => ({
    flex: 8,
    height: "calc(100vh - 60px)",
    paddingBottom: 20,
    boxSizing: "border-box",
    // overflowY: "scroll"
}));

const Toolbar = styled(Box)(props => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px"
}))

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    // height: 200

}));

const ActionButton = styled('button')(props => ({
    backgroundColor: props.bg,
    color: !props.color ? "white" : props.color,
    border: "none",
    padding: "8px 10px",
    textTransform: "none",
    borderRadius: 10,
    fontWeight: 600,
    boxShadow: "0 0 4px 1px rgba(0, 0, 0, .2)",
    cursor: "pointer",
    textTransform: "uppercase"
}));

const Input = styled('input')(props => ({
    border: "none",
    outline: "none"
}));

const Dashboard = () => {

    const [showDialog, setShowDialog] = useState(false);

    return (
        <Container>
            <TopBar />
            <ContentWrapper>
                <ContentPanel>
                    <Toolbar>
                        <Box>
                            <ChevronLeftRoundedIcon />
                            <ChevronRightRoundedIcon />
                        </Box>

                        <ActionButton bg={colors.primaryBlue} onClick={() => setShowDialog(true)}>
                            + Add a new item
                        </ActionButton>
                    </Toolbar>
                    <Box style={{
                        height: "calc(100vh - 56px - 60px)",
                        overflowY: "scroll",
                        padding: 10,
                        boxSizing: "border-box"
                    }}>
                        <Grid container spacing={4} >
                            <Grid item xs={3}>
                                <Item>xs=3</Item>
                            </Grid>
                        </Grid>
                    </Box>
                </ContentPanel>
                <Divider orientation='vertical' />
                <SidePanel />
            </ContentWrapper>

            <Dialog
                open={showDialog}
                onClose={() => setShowDialog(false)}
            >
                <Box
                    style={{
                        padding: 20,
                        border: 10
                    }}
                    component="form"
                >
                    <Input placeholder="Enter item name" />
                    <Input placeholder="Choose expire date " />
                    <Input placeholder="Choose location " />
                    <Input placeholder="Enter item code" />
                    <Input placeholder="Choose function" />
                    <Input type="file" accept="image/*" />

                    <Divider style={{ margin: "10px 0" }} />

                    <Box
                        display="flex"
                        width="100%"
                        alignItems="center"
                        justifyContent="space-between">
                        <ActionButton bg="white" color={colors.secondaryDarkBlue}>Cancel</ActionButton>
                        <ActionButton bg={colors.primaryBlue}>Save</ActionButton>
                    </Box>
                </Box>

            </Dialog>
        </Container >
    )
}

export default Dashboard
