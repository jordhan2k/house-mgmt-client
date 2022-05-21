import { Box, styled, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import duck from '../../assets/images/duck2.jpg'
import { Username } from '../../pages/Users';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useDispatch, useSelector } from 'react-redux';
import { changeActiveComment, changeLikeRequest, changeLikeTypes, deleteCommentRequest, editCommentRequest } from '../../redux/actions/commentActions';
import { colors, commentModes } from '../../utils/constants';
import EditRounded from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import moment from 'moment';

const Container = styled(Box)(props => ({
    marginBottom: 10,
    display: "flex",
}));

const Avatar = styled('img')(props => ({
    width: 32,
    height: 32,
    borderRadius: 16,
    objectFit: "cover",
    border: "1px solid rgba(0, 0, 0, .2)",
    marginRight: 10
}));

const Content = styled(Typography)(props => ({
    fontFamily: "inherit",
    fontSize: 14
}));

const IconContainer = styled(Box)(props => ({
    width: 22,
    height: 22,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    boxShadow: "0 0 3px 1px rgba(0, 0, 0, .2)",
    marginBottom: 3,
    cursor: "pointer",
    marginRight: 5
}));

const Time = styled(Typography)(props => ({
    fontSize: 10,
    fontWeight: 600
}));

const EditInput = styled("input")(props => ({
    border: ".2px solid gray",
    outline: "none",
    padding: 5,
    borderRadius: 20,
    minWidth: 300
}))

const CommentCard = ({ comment }) => {
    const { activeComment, mode } = useSelector(state => state.house.comments);
    const { user } = useSelector(state => state.auth);
    const [showActions, setShowActions] = useState(false);
    const dispatch = useDispatch();
    const [editInput, setEditInput] = useState();

    const handleEscapeEditMode = event => {
        if (event.keyCode === 27 && comment._id === activeComment && mode === commentModes.edit) {
            dispatch(changeActiveComment(null, ""));
            setEditInput(comment.content);
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleEscapeEditMode, false);
        return () => {
            document.removeEventListener("keydown", handleEscapeEditMode, false);
        }
    }, []);

    useEffect(() => {
        setEditInput(comment.content);
    }, [comment]);


    const handleChangeLike = () => {
        if (comment.likedBy.includes(user._id)) {
            dispatch(changeLikeRequest(comment._id, changeLikeTypes.unlike));
        }
        if (!comment.likedBy.includes(user._id)) {
            dispatch(changeLikeRequest(comment._id, changeLikeTypes.like));
        }
    }

    const handleEditComment = () => {
        if (editInput && editInput !== comment.content) {
            dispatch(editCommentRequest({
                ...comment,
                content: editInput,
                isEdited: true
            }));
            setEditInput("");
        }
        dispatch(changeActiveComment(null, ""));

    }

    const handleDeleteComment = () => {
        if (window.confirm("Do want to delete this comment?"))
            dispatch(deleteCommentRequest(comment));
    }

    const handleReplyBtn = () => {
        if (comment.level === 1)
            dispatch(changeActiveComment(comment._id, commentModes.reply));
        if (comment.level === 2)
            dispatch(changeActiveComment(comment.repliedTo, commentModes.reply));
    }

    return <Container
        onMouseOver={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}>

        <Avatar src={duck} />

        <Box style={{ maxWidth: 500, padding: "5px 10px", borderRadius: 5, backgroundColor: "rgba(0, 0, 0, .05)" }}  >
            <Username>{comment.postedBy.username ? comment.postedBy.username : comment.postedBy}</Username>
            {(activeComment === comment._id && mode === commentModes.edit)
                ? <Box component="form" onSubmit={handleEditComment} >
                    <EditInput value={editInput} name="editInput" onChange={event => setEditInput(event.target.value)} />
                    <Typography style={{ fontFamily: "inherit", fontSize: 10 }}>Press Esc to quit edit mode.</Typography>
                </Box>
                : <Content>{comment.content}</Content>}
            <Time>{moment(comment.createdAt).fromNow()}{comment.likedBy.length > 0 && ` - Liked by ${comment.likedBy.length}`}{comment.isEdited && " - Edited"}</Time>
        </Box>

        <Box display="flex" marginLeft={1} alignItems={"center"} >

            {comment.likedBy.includes(user._id) &&
                <IconContainer onClick={handleChangeLike}>
                    <FavoriteRoundedIcon sx={{ fontSize: 16, fill: colors.primaryRed }} />
                </IconContainer>
            }
            {(showActions && !comment.likedBy.includes(user._id)) && <IconContainer onClick={handleChangeLike}>
                <FavoriteBorderRoundedIcon sx={{ fontSize: 16 }} />
            </IconContainer>
            }

            {showActions && <IconContainer onClick={handleReplyBtn} >
                <ReplyRoundedIcon sx={{ fontSize: 16 }} />
            </IconContainer>}

            {(showActions && (comment.postedBy._id === user._id)) &&
                <>
                    < IconContainer onClick={() => dispatch(changeActiveComment(comment._id, commentModes.edit))}>
                        <EditRounded sx={{ fontSize: 16 }} />
                    </IconContainer>

                    < IconContainer onClick={handleDeleteComment}>
                        <DeleteRoundedIcon sx={{ fontSize: 16 }} />
                    </IconContainer>
                </>
            }

        </Box>
    </Container >
}
export default CommentCard;
