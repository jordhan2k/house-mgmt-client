import { Box, styled } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentModes } from '../../utils/constants';
import CommentCard from './CommentCard';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { addCommentRequest, changeActiveComment } from '../../redux/actions/commentActions';

const Container = styled(Box)(props => ({

}));

const ChildWrapper = styled(Box)(props => ({
    marginLeft: 42
}));


const ReplyContainer = styled(Box)(props => ({
    padding: 5,
    borderRadius: 25,
    backgroundColor: "rgb(235, 235, 235)",
    maxWidth: 500,
    marginBottom: 10,
    display: "flex",
    alignItems: "center"

}));

const ReplyInput = styled('input')(props => ({
    flex: 1,
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    paddingLeft: 10
}));

const CancelButton = styled(Box)(props => ({
    width: 30,
    height: 30,
    borderRadius: 20,
    display: "flex",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer"
}));

const CommentGroup = ({ parentComment }) => {
    const { activeComment, mode } = useSelector(state => state.house.comments);
    const [reply, setReply] = useState("");
    const dispatch = useDispatch();


    const handleCancel = () => {
        setReply("");
        dispatch(changeActiveComment(null, ""));
    };

    const handleReply = () => {
        if (reply) {
            const newReply = {
                content: reply,
                repliedTo: activeComment,
                level: 2,
                about: parentComment.about
            }
            dispatch(addCommentRequest(newReply));
            handleCancel();
        }
    }

    return <Container>
        <CommentCard comment={parentComment} />
        {parentComment.replies && parentComment.replies.map(reply => (
            <ChildWrapper>
                <CommentCard comment={reply} />
            </ChildWrapper>
        ))}
        {(activeComment === parentComment._id && mode === commentModes.reply) && <ChildWrapper>
            <ReplyContainer component="form" onSubmit={handleReply}>
                <ReplyRoundedIcon />
                <ReplyInput
                    autoComplete="off"
                    placeholder="Enter your reply"
                    name="reply"
                    value={reply}
                    onChange={event => setReply(event.target.value)}
                />
                <CancelButton onClick={handleCancel}>
                    <CloseRoundedIcon fontSize="small" />
                </CancelButton>
            </ReplyContainer>
        </ChildWrapper>}
    </Container>;
};

export default CommentGroup;
