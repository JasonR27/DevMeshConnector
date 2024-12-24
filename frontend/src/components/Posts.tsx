
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
import { addLike, addComment, deletePost, deleteComment, editPost } from '../api';
import { AxiosResponse } from 'axios';

interface Comment {
  id: string;
  authorEmail: string;
  content: string;
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
  const [isCommentFormVisible, setIsCommentFormVisible] = useState<{ [key: string]: boolean }>({});
  const [isEditPostFormVisible, setIsEditPostFormVisible] = useState<{ [key: string]: boolean }>({});
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

  const handleDeleteComment = async (profileId: string) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        const response: AxiosResponse = await deleteComment(profileId); // Remove the deleted profile from the state 
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

  const handleAddComment = async (postId: string) => {
    if (commentText.trim()) {
      try {
        await addComment(postId, commentText);
        // queryClient.invalidateQueries('posts');
        setCommentText('');
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
                      <LikeButton isDisabled={false} likesCount={likes?.length} onClick={() => postCreateLike(id)} />
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
                  {readMore[id] && comments && comments.length > 0 && comments.map((comment, index) => (
                    <div key={index} className="comment d-flex justify-content-between">
                      <div>
                        <strong>{comment.authorEmail}</strong>: {comment.content}
                      </div><div>
                        {/* <button onClick={() => { handleDeleteComment(comment.id) }}>Delete</button>
                        <button onClick={() => { handleEditComment(id) }}>Edit</button> */}
                        {/* I don't why but this dropdown appears in a different part of the card */}
                        <Dropdown className="">
                          <Dropdown.Toggle as={Button} variant="link" className="text-muted p-0 bg-black">
                            <BsThreeDotsVertical />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item href="#" onClick={() => EditPost(id)}>Like</Dropdown.Item>
                            <Dropdown.Item href="#" onClick={() => { handleEditComment(comment.id) }}>Edit</Dropdown.Item>
                            <Dropdown.Item href="#" onClick={() => handleToggleCommentForm(comment.id)}>Comment</Dropdown.Item>
                            <Dropdown.Item href="#" onClick={() => { handleDeleteComment(comment.id) }}>Delete</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default Posts;
