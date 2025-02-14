import React, { useState } from 'react';
import { Button, Dropdown, Form, Container, Spinner, Alert } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';
import LikeButton from './LikeButton';
import { addLikeForComment, deleteComment, editComment, addCommentOnComment, getComment } from '../services/api';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import SeeComments from './SeeComments';
import CommentsSection from './CommentsSection';
// import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useMutationsContext } from '../services/MutationsContext';
import { getCommentQuery } from '../services/queries';


const Comment: React.FC<CommentProps> = ({ comment, commentId }) => {

    console.log('comment?.id: ', comment?.id);
    console.log('commentId: ', commentId);

    const { data: commentQuery, error, isError, isPending } = getCommentQuery();

    const mutations = useMutationsContext();

    const [editCommentText, setEditCommentText] = useState('');
    const [isEditCommentFormVisible, setIsEditCommentFormVisible] = useState<{ [key: string]: boolean }>({});
    const [isCommentOnCommentFormVisible, setIsCommentOnCommentFormVisible] = useState<{ [key: string]: boolean }>({});
    const [commentOnCommentText, setCommentOnCommentText] = useState('');
    const [isSeeCommentsVisible, setIsSeeCommentsVisible] = useState<{ [key: string]: boolean }>({});

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
                // const response: AxiosResponse = await deleteComment(commentId); // Remove the deleted profile from the state 
                // const { redirectUrl } = response.data;
                // if (redirectUrl) {
                //     // Use react-router-dom's useNavigate to redirect
                //     navigate(redirectUrl);
                // }
            } catch (error) {
                console.error('Error deleting comment:', error);
                // Handle error
            }
        }
    };

    const handlePublishCommentOnComment = async (commentId: string) => {
        if (commentOnCommentText.trim()) {
            try {
                console.log('commentOnCommentText: ', commentOnCommentText);
                // await commentOnComment(commentId, commentOnCommentText);
                mutations.CreateMutations.createCommentOnComment.mutate(commentId, commentOnCommentText)

                setCommentOnCommentText('');
                // hide form after publishing edit
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
                // await editComment(commentId, editCommentText);

                setEditCommentText('');
                // hide form after publishing edit
                setIsEditCommentFormVisible(prev => ({
                    ...prev,
                    [commentId]: !prev[commentId]
                }));
            } catch (error) {
                console.error('Error updating comment:', error);
            }
        }
    };

    if (isPending) {
        return (
          <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Container>
        );
      }
    
      if (isError) {
        return (
          <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <Alert variant="danger">
              Error! {(error as Error).message}
            </Alert>
          </Container>
        );
    }



    comment = commentQuery?.commentData?.comment;

    return (
        <div className="comment d-flex m-2 justify-content-between">
            {comment?.id && isEditCommentFormVisible[comment?.id] ? (
                <Form>
                    <Form.Group controlId="editCommentForm">
                        <Form.Control
                            type="text"
                            placeholder="Edit your comment"
                            value={editCommentText}
                            onChange={(event) => setEditCommentText(event.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={() => handlePublishEditedComment(comment.id)} className="mt-2">Publish</Button>
                </Form>
            ) : (
                comment ? (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <div>
                                        <div>
                                            <strong>{comment.profileName}</strong>: {comment.content}
                                        </div>
                                        <div>
                                            <small className="text-muted">{moment(comment.createdAt).fromNow()}</small>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <LikeButton isDisabled={false} likesCount={comment.likes?.length} onClick={() => createLikeForComment(comment.id)} />
                                            <SeeComments isDisabled={false} commentsCount={comment.comments?.length} onClick={() => handleToggleSeeComments(comment.id)} />
                                        </div>
                                    </div>

                                    <Dropdown>
                                        <Dropdown.Toggle as={Button} variant="link" className="text-muted p-0">
                                            <BsThreeDotsVertical />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => createLikeForComment(comment.id)} >Like</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleToggleEditCommentForm(comment.id)}>Edit</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleToggleCommentOnCommentForm(comment.id)}>Comment</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDeleteComment(comment.id)}>Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>

                                </div>
                                <div>

                                    {comment.id && isSeeCommentsVisible[comment.id] && comment.comments && (
                                        <div style={{ marginLeft: '20px', marginTop: '10px' }}>
                                            <CommentsSection
                                                comments={comment.comments}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                {comment.id && isCommentOnCommentFormVisible[comment.id] ? (
                                    <Form className='mt-3'>
                                        <Form.Group controlId="commentOnCommentForm">
                                            <Form.Control
                                                type="text"
                                                placeholder="Write your comment"
                                                value={commentOnCommentText}
                                                onChange={(event) => setCommentOnCommentText(event.target.value)}
                                            />
                                        </Form.Group>
                                        <Button variant="primary" onClick={() => handlePublishCommentOnComment(comment.id)} className="mt-2">Publish</Button>
                                    </Form>
                                ) : (
                                    <>
                                        {/* commnt on comment form not visible */}
                                    </>
                                )}
                            </div>
                        </div>

                    </>
                ) : (
                    <>
                        {/* no comment for this comment comment comp */}
                    </>
                )
            )}
        </div>
    );
};

export default Comment;