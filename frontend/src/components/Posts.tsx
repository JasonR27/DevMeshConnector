
// another version

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Dropdown, Form } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';
import moment from 'moment';
import { truncate } from '../utils/functions';
import { ReadmoreButton } from './ReadMoreButton';
import LikeButton from './LikeButton';
import ProfileAvatar from './ProfileAvatar';
import '../styles/Posts.css';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { addLike, addLikeForComment, addComment, deletePost, deleteComment, editPost, editComment, commentOnComment } from '../api';
import { AxiosResponse } from 'axios';

interface Comment {
  id: string;
  authorEmail: string;
  content: string;
  likes: any[];
}

interface Post {
  id: string;
  createdAt: string;
  title: string;
  content: string;
  profile: {
    authorEmail: string;
    picture: {
      avatarUrl: string;
    };
  };
  likes: any[];
  comments: Comment[];
}

interface PostsProps {
  posts: Post[];
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  const [commentText, setCommentText] = useState('');
  const [editPostText, setEditPostText] = useState('');
  const [editCommentText, setEditCommentText] = useState('');
  const [commentOnCommentText, setCommentOnCommentText] = useState('');
  const [isCommentFormVisible, setIsCommentFormVisible] = useState<{ [key: string]: boolean }>({});
  const [isEditPostFormVisible, setIsEditPostFormVisible] = useState<{ [key: string]: boolean }>({});
  const [isEditCommentFormVisible, setIsEditCommentFormVisible] = useState<{ [key: string]: boolean }>({});
  const [isCommentOnCommentFormVisible, setIsCommentOnCommentFormVisible] = useState<{ [key: string]: boolean }>({});
  const queryClient = useQueryClient();
  const [readMore, setReadMore] = useState<{ [key: string]: boolean }>({});
  // const [readMore, setReadMore] = useState<boolean>(false);


  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };

  const handleEditPostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditPostText(event.target.value);
  };

  const handleToggleCommentForm = (postId: string) => {
    setIsCommentFormVisible(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleReadMore = (postId: string) => {
    setReadMore(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const navigate = useNavigate();

  const handleDelete = async (profileId: any) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response: AxiosResponse = await deletePost(profileId); // Remove the deleted profile from the state 
        const { redirectUrl } = response.data;

        if (redirectUrl) {
          // Use react-router-dom's useNavigate to redirect
          navigate(redirectUrl);
        }
      } catch (error) {
        console.error('Error creating profile:', error);
        // Handle error
      }
    }
  };

  const EditPost = async (profileId: any) => {
    // if (window.confirm('Are you sure you want to delete this post?')) {
    try {
      const response: AxiosResponse = await deletePost(profileId); // Remove the deleted profile from the state 
      const { redirectUrl } = response.data;

      if (redirectUrl) {
        // Use react-router-dom's useNavigate to redirect
        navigate(redirectUrl);
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      // Handle error
    }
    // }
  };

  const handleToggleEditPostForm = (postId: string, content: string) => {
    setIsEditPostFormVisible(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
    setEditPostText(content);
  };

  const handleToggleEditCommentForm = (postId: string, content: string) => {
    setIsEditCommentFormVisible(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
    setEditCommentText(content);
  };

  const handleToggleCommentOnCommentForm = (postId: string, content: string) => {
    setIsCommentOnCommentFormVisible(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
    setCommentOnCommentText(content);
  };

  const handleDeleteComment = async (commentId: string) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        const response: AxiosResponse = await deleteComment(commentId); // Remove the deleted profile from the state 
        const { redirectUrl } = response.data;
        if (redirectUrl) {
          // Use react-router-dom's useNavigate to redirect
          navigate(redirectUrl);
        }
      } catch (error) {
        console.error('Error creating profile:', error);
        // Handle error
      }
    }
  };

  const EditComment = async (profileId: any) => {
    // if (window.confirm('Are you sure you want to delete this post?')) {
    try {
      const response: AxiosResponse = await deletePost(profileId); // Remove the deleted profile from the state 
      const { redirectUrl } = response.data;

      if (redirectUrl) {
        // Use react-router-dom's useNavigate to redirect
        navigate(redirectUrl);
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      // Handle error
    }
    // }
  };

  const postCreateLike = async (postId: any) => {
    try {
      await addLike(postId);
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  const { isLoading: isCreatingLike, mutate: postLike } = useMutation(postCreateLike, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      console.log('Like request completed');
    }
  });

  const postCreateLikeForComment = async (commentId: any) => {
    try {
      await addLikeForComment(commentId);
    } catch (error) {
      console.error('Error creating like on comment:', error);
    }
  };

  const { isLoading: isCreatingLikeForComment, mutate: postLikeForComment } = useMutation(postCreateLikeForComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      console.log('Like request completed');
    }
  });

  const handleAddComment = async (postId: string) => {
    if (commentText.trim()) {
      try {
        await addComment(postId, commentText);
        // queryClient.invalidateQueries('posts');
        setCommentText('');
        // hide form after publishing comment
        setIsCommentFormVisible(prev => ({
          ...prev,
          [postId]: !prev[postId]
        }));
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  const handlePublishEditedPost = async (postId: string) => {
    if (editPostText.trim()) {
      try {
        console.log('editPostText: ', editPostText);
        await editPost(postId, editPostText);

        setEditPostText('');
        // hide form after publishing edit
        setIsEditPostFormVisible(prev => ({
          ...prev,
          [postId]: !prev[postId]
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
        await editComment(commentId, editCommentText);

        setEditCommentText('');
        // hide form after publishing edit
        setIsEditCommentFormVisible(prev => ({
          ...prev,
          [commentId]: !prev[commentId]
        }));
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  const handlePublishCommentOnComment = async (commentId: string) => {
    if (commentOnCommentText.trim()) {
      try {
        console.log('commentOnCommentText: ', commentOnCommentText);
        await commentOnComment(commentId, commentOnCommentText);

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

  return (
    <div className="py-5">
      <Container>
        {posts.slice().reverse().map(({ id, createdAt, title, content, profile, likes, comments }, i) => (
          <Row key={i} className="justify-content-center py-3">
            <Col md={8}>
              <Card className="shadow-sm">
                <Card.Header className="card-header d-flex justify-content-between">
                  <Dropdown className="dropdown-container">
                    <Dropdown.Toggle as={Button} variant="link" className="text-muted p-0">
                      <BsThreeDotsVertical />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#" onClick={() => handleToggleEditPostForm(id, content)}>Edit</Dropdown.Item>
                      <Dropdown.Item href="#" onClick={() => handleToggleCommentForm(id)}>Comment</Dropdown.Item>
                      <Dropdown.Item href="#" onClick={() => handleDelete(id)}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Header>
                <Card.Body>
                  {isEditPostFormVisible[id] ? <><Form>
                    <Form.Group controlId="commentForm">
                      <Form.Control
                        type="text"
                        placeholder={"Edit your post"}
                        value={editPostText}
                        onChange={handleEditPostChange}
                      />
                    </Form.Group>
                    <Button variant="primary" onClick={() => handlePublishEditedPost(id)} className="mt-2">Publish</Button>
                  </Form></> : <>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{content}</Card.Text>
                  </>}
                  <hr />
                  <div className="d-flex align-items-center">
                    <ProfileAvatar url={profile?.picture?.avatarUrl} avatarName={truncate(profile.authorEmail)} />
                    <div className="ms-3">
                      <h6 className="mb-0">{profile.authorEmail}</h6>
                      <small className="text-muted">{moment(createdAt).format('Do MMMM YYYY')}</small>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mt-3">
                    <ReadmoreButton onClick={() => handleReadMore(id)} postId={Number(id)} />
                    <div className="m-1">
                      <LikeButton isDisabled={false} likesCount={likes?.length} onClick={() => postLike(id)} />
                    </div>
                  </div>
                  <hr />
                  {isCommentFormVisible[id] && (
                    <Form>
                      <Form.Group controlId="commentForm">
                        <Form.Control
                          type="text"
                          placeholder="Add a comment..."
                          value={commentText}
                          onChange={handleCommentChange}
                        />
                      </Form.Group>
                      <Button variant="primary" onClick={() => handleAddComment(id)} className="mt-2">Post Comment</Button>
                    </Form>
                  )}
                  <hr />
                  <div>Comments Section</div>
                  {readMore[id] && comments && comments.length > 0 && comments.map((comment) => (
                    <div key={comment.id} className="comment d-flex justify-content-between">
                      {isEditCommentFormVisible[comment.id] ? (
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
                        <>
                          <div>
                            <strong>{comment.authorEmail}</strong>: {comment.content} 
                          </div>
                          <div>
                            <small className="text-muted">{moment(comment.createdAt).fromNow()}</small>
                          </div>          
                          {comment.comments && comment.comments.length > 0 && comment.comments.map((subComment) => (
                            <div key={subComment.id} className="sub-comment ms-4">
                              <div>
                                <strong>{subComment.authorEmail}</strong>: {subComment.content}
                              </div>
                              <div>
                                <small className="text-muted">{moment(subComment.createdAt).fromNow()}</small>
                              </div>
                              <LikeButton isDisabled={false} likesCount={(subComment.likes || []).length} onClick={() => postLikeForComment(subComment.id)} />
                            </div>
                          ))}
                          {isCommentOnCommentFormVisible[comment.id] ? (
                        <Form>
                          <Form.Group controlId="editCommentForm">
                            <Form.Control
                              type="text"
                              placeholder="Edit your comment"
                              value={commentOnCommentText}
                              onChange={(event) => setCommentOnCommentText(event.target.value)}
                            />
                          </Form.Group>
                          <Button variant="primary" onClick={() => handlePublishCommentOnComment(comment.id)} className="mt-2">Publish</Button>
                        </Form>
                      ) : (
                        <>
                          </>
                          )}
                          </>
                          )}
                          <div className="comment d-flex justify-content-between">
                          <Dropdown>
                            <Dropdown.Toggle as={Button} variant="link" className="text-muted p-0">
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#">Like</Dropdown.Item>
                              <Dropdown.Item href="#" onClick={() => handleToggleEditCommentForm(comment.id, comment.content)}>Edit</Dropdown.Item>
                              <Dropdown.Item href="#" onClick={() => handleToggleCommentOnCommentForm(comment.id, comment.content)}>Comment</Dropdown.Item>
                              <Dropdown.Item href="#" onClick={() => handleDeleteComment(comment.id)}>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                          <LikeButton isDisabled={false} likesCount={(comment.likes || []).length} onClick={() => postLikeForComment(comment.id)} />
                          </div>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))
        }
      </Container >
    </div >
  );
};

export default Posts;
