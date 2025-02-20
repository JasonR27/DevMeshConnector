

import React, { useState } from 'react';
import { Button, IconButton, Menu, MenuItem, TextField, Container, CircularProgress, Alert, Box, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LikeButton from './LikeButton';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import SeeComments from './SeeComments';
import CommentsSection from './CommentsSection';
import { useMutationsContext } from '../context/MutationsContext';
import { getCommentQuery } from '../services/queries';

const Comment: React.FC<CommentProps> = ({ comment, commentId }) => {
    const { data: commentQuery, error, isError, isPending } = getCommentQuery(commentId);
    const mutations = useMutationsContext();
    const [editCommentText, setEditCommentText] = useState('');
    const [isEditCommentFormVisible, setIsEditCommentFormVisible] = useState<{ [key: string]: boolean }>({});
    const [isCommentOnCommentFormVisible, setIsCommentOnCommentFormVisible] = useState<{ [key: string]: boolean }>({});
    const [commentOnCommentText, setCommentOnCommentText] = useState('');
    const [isSeeCommentsVisible, setIsSeeCommentsVisible] = useState<{ [key: string]: boolean }>({});
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const navigate = useNavigate();

    const handleToggleSeeComments = (commentId?: string) => {
        if (commentId) {
            setIsSeeCommentsVisible(prev => ({
                ...prev,
                [commentId]: !prev[commentId]
            }));
        };
    }

    const createLikeForComment = async (commentId: any) => {
        try {
            // await addLikeForComment(commentId);
            mutations.CreateMutations.createLikeForComment.mutate(commentId)
        } catch (error) {
            console.error('Error creating like on comment:', error);
        }
    };

    const handleToggleEditCommentForm = (postId: string) => {
        setIsEditCommentFormVisible(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    const handleToggleCommentOnCommentForm = (postId: string) => {
        setIsCommentOnCommentFormVisible(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    const handleDeleteComment = async (commentId: string) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            try {
                mutations.DeleteMutations.deleteComment.mutate(commentId);
            } catch (error) {
                console.error('Error deleting comment:', error);
                // Handle error
            }
        }
    };

    const handlePublishCommentOnComment = async (commentId: string) => {
        console.log('commentId: ', commentId);
        console.log('commentOnCommentText: ', commentOnCommentText);
        const newComment = { commentId: commentId, content: commentOnCommentText }
        if (commentOnCommentText.trim()) {
            try {
                mutations.createMutations.createCommentOnComment.mutate(newComment);
                setCommentOnCommentText('');
                setIsCommentOnCommentFormVisible(prev => ({
                    ...prev,
                    [commentId]: !prev[commentId]
                }));
            } catch (error) {
                console.error('Error adding comment:', error);
            }
        }
    };

    const handlePublishEditedComment = async (commentId: string) => {
        if (editCommentText.trim()) {
            try {
                console.log('editCommentText: ', editCommentText);
                mutations.UpdateMutations.updateComment.mutate(commentId, editCommentText);
                setEditCommentText('');
                setIsEditCommentFormVisible(prev => ({
                    ...prev,
                    [commentId]: !prev[commentId]
                }));
            } catch (error) {
                console.error('Error updating comment:', error);
            }
        }
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    if (isPending) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <CircularProgress />
            </Container>
        );
    }

    if (isError) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Alert severity="error">
                    Error! {(error as Error).message}
                </Alert>
            </Container>
        );
    }
    comment = commentQuery?.commentData?.comment;
    console.log('comment.content: ', comment.content);
    console.log('commentQuery: ', commentQuery);
    console.log('commentQuery cmtdt: ', commentQuery.commentData);
    console.log('commentQuery cmtdt cmt: ', commentQuery.commentData.comment);
    return (
        <Box className="comment d-flex m-2 justify-content-between">
            {comment?.id && isEditCommentFormVisible[comment?.id] ? (
                <Box component="form">
                    <TextField
                        id="editCommentForm"
                        label="Edit your comment"
                        variant="outlined"
                        value={editCommentText}
                        onChange={(event) => setEditCommentText(event.target.value)}
                        fullWidth
                    />
                    <Button variant="contained" color="primary" onClick={() => handlePublishEditedComment(comment.id)} className="mt-2">Publish</Button>
                </Box>
            ) : (
                comment ? (
                    <Box display="flex" flexDirection="column">
                        <Box display="flex" flexDirection="column">
                            <Box sx={{ display: 'flex', flexDirection: 'column' }} gap={1}>
                                <Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'row' }} gap={1}>
                                        {/* <div> */}
                                            <Typography variant="body1">
                                                <strong>{comment.userName}</strong>: {comment.content}
                                            </Typography>
                                        {/* </div> */}
                                        {/* <Box> */}
                                        <div>
                                            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuOpen}>
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
                                                <MenuItem onClick={() => createLikeForComment(comment.id)}>Like</MenuItem>
                                                <MenuItem onClick={() => handleToggleEditCommentForm(comment.id)}>Edit</MenuItem>
                                                <MenuItem onClick={() => handleToggleCommentOnCommentForm(comment.id)}>Comment</MenuItem>
                                                <MenuItem onClick={() => handleDeleteComment(comment.id)}>Delete</MenuItem>
                                            </Menu>
                                        </div>
                                        {/* </Box> */}
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" color="textSecondary">
                                            {moment(comment.createdAt).fromNow()}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <LikeButton isDisabled={false} likesCount={comment.likes?.length} onClick={() => createLikeForComment(comment.id)} />
                                        <SeeComments isDisabled={false} commentsCount={comment.comments?.length} onClick={() => handleToggleSeeComments(comment.id)} />
                                    </Box>
                                </Box>
                            </Box>
                            <Box>
                                {comment.id && isSeeCommentsVisible[comment.id] && comment.comments && (
                                    <Box ml={2} mt={1}>
                                        <CommentsSection
                                            comments={comment.comments}
                                        />
                                    </Box>
                                )}
                            </Box>
                        </Box>

                        <Box>
                            {comment.id && isCommentOnCommentFormVisible[comment.id] ? (
                                <Box component="form" mt={3}>
                                    <TextField
                                        id="commentOnCommentForm"
                                        label="Write your comment"
                                        variant="outlined"
                                        value={commentOnCommentText}
                                        onChange={(event) => setCommentOnCommentText(event.target.value)}
                                        fullWidth
                                    />
                                    <Button variant="contained" color="primary" onClick={() => handlePublishCommentOnComment(comment.id)} className="mt-2">Publish</Button>
                                </Box>
                            ) : (
                                <></>
                            )}
                        </Box>
                    </Box>
                ) : (
                    <></>
                )
            )}
        </Box>
    );
};

export default Comment;
