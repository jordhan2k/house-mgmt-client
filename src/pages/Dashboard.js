import { Box, Grid, styled, Tab, Tabs, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../customCSS/calendar.css';
import { colors } from '../utils/constants';
import AddEditItemPanel from '../components/Dashboard/AddEditItemPanel';
import { useDispatch, useSelector } from 'react-redux';
import { getGuestRequest } from '../redux/actions/houseItemActions';
import ItemCard from '../components/Dashboard/ItemCard';
import { openAddPanel } from '../redux/actions/helperActions';
import { useLocation, useParams } from 'react-router-dom';
import { isAuthorized } from '../utils/helpers';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { addCommentRequest, fetchCommentsRequest } from "../redux/actions/commentActions"
import CommentCard from '../components/Dashboard/CommentCard';
import CommentGroup from '../components/Dashboard/CommentGroup';
import Scrollbars from 'react-custom-scrollbars';


export const ContentWrapper = styled(Box)(props => ({
    display: "flex",
    flex: 1,
    width: "100%",
}));

export const ContentPanel = styled(Box)(props => ({
    flex: 8,
    height: "calc(100vh - 60px)",
    paddingBottom: 20,
    boxSizing: "border-box",
    color: colors.secondaryDarkBlue
}));

export const Toolbar = styled(Box)(props => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "5px 10px",
    paddingRight: 20
}))

export const ActionButton = styled('button')(props => ({
    backgroundColor: props.bg,
    color: !props.color ? "white" : props.color,
    border: "none",
    padding: "8px 10px",
    borderRadius: 10,
    fontWeight: 600,
    boxShadow: "0 0 4px 1px rgba(0, 0, 0, .2)",
    cursor: "pointer",
    textTransform: "uppercase"
}));

const TabTitle = styled(Tab)(props => ({
    padding: 0,
    textTransform: "none",
    fontFamily: "inherit",
    color: colors.secondaryDarkBlue,
    lineHeight: 1,
    minHeight: 48
}));

const CommentInput = styled('input')(props => ({


}));

const CommentList = styled(Box)(props => ({
    padding: 10
}))

const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return value === index && (<Scrollbars
        style={{
            height: "calc(100vh - 60px - 68px)",
            padding: 10,
            boxSizing: "border-box"
        }} {...other} >
        {children}
    </Scrollbars>)
}

const Dashboard = () => {

    const [comment, setComment] = useState("");
    const [tabIndex, setTabIndex] = useState(0);
    const handleChangeTabIndex = (event, newValue) => setTabIndex(newValue);

    const user = useSelector(state => state.auth.user);
    const { myHouse, currentGuestHouse } = useSelector(state => state.house);
    const { targetedHouse, comments } = useSelector(state => state.house.comments);
    const { show } = useSelector(state => state.helper.addEditPanel);

    const dispatch = useDispatch();
    const location = useLocation();
    const params = useParams();

    useEffect(() => {
        if (params.hasOwnProperty("id")) {
            console.log(params.id);
            console.log(params.houseId);
            dispatch(getGuestRequest(params.id));
            dispatch(fetchCommentsRequest(params.houseId));
        } else {
            dispatch(fetchCommentsRequest(user.houses[0]));
        }
    }, [params, dispatch]);

    useEffect(() => { }, []);

    let itemsBody;
    if (location.pathname.includes("dashboard")) {
        itemsBody = myHouse && myHouse.items.map(item => !item.isDeleted && (
            <ItemCard key={item._id} item={item} />))
    }
    if (location.pathname.includes("house")) {
        itemsBody = currentGuestHouse && currentGuestHouse.items.map(item => !item.isDeleted && (
            <ItemCard key={item._id} item={item} />))
    }

    const handleSubmitComment = event => {
        event.preventDefault();
        if (comment) {
            const newComment = {
                postedBy: user._id,
                content: comment,
                about: targetedHouse,
                level: 1
            }
            dispatch(addCommentRequest(newComment));
            setComment("");
        }
    }

    return (
        <ContentPanel>
            <Toolbar>
                <Box>
                    <Tabs value={tabIndex} onChange={handleChangeTabIndex}>
                        <TabTitle label="Items" {...a11yProps(0)} />
                        <TabTitle label="Comments" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                {(isAuthorized(location, params, user) && tabIndex === 0) && <ActionButton bg={colors.primaryBlue} onClick={() => dispatch(openAddPanel())}>
                    + Add a new item
                </ActionButton>}
            </Toolbar>

            <TabPanel value={tabIndex} index={0}>
                <Grid style={{ padding: "10px 0" }} container spacing={4} >
                    {itemsBody}
                </Grid>
            </TabPanel>

            <TabPanel value={tabIndex} index={1}>
                <Typography style={{ padding: 10 }} fontFamily="inherit" fontWeight={600}>Add a comment</Typography>
                <Box
                    onSubmit={handleSubmitComment}
                    component="form"
                    style={{
                        maxWidth: "880px",
                        display: "flex",
                        border: "1px solid rgba(0, 0, 0, .2)",
                        margin: "0 10px",
                        borderRadius: 10,
                        overflow: "hidden",
                        padding: 10,
                        alignItems: "center"
                    }}>
                    <CommentInput
                        autoComplete="off"
                        placeholder="Enter your comment here..."
                        name="comment"
                        value={comment}
                        onChange={event => setComment(event.target.value)}
                        style={{ border: "none", outline: "none", resize: "none", flex: 1 }}
                    />
                    <Box
                        component="button"
                        type="submit"
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 40,
                            height: 40,
                            backgroundColor: colors.primaryBlue,
                            borderRadius: "100%",
                            border: "none",
                            cursor: "pointer"
                        }}>
                        <SendRoundedIcon style={{ fill: "white" }} />
                    </Box>
                </Box>

                <CommentList>
                    {comments.map(comment => (
                        <CommentGroup key={comment._id} parentComment={comment} />
                    ))}
                </CommentList>
            </TabPanel>

            {show && <AddEditItemPanel />}
        </ContentPanel>
    )
}

export default Dashboard
