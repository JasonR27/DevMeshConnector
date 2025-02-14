
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
// import { addComment, deletePost, deleteComment, editPost, editComment, commentOnComment } from '../services/api';
import { AxiosResponse } from 'axios';
import  CommentsSection  from './CommentsSection';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMutationsContext } from '../services/MutationsContext';

const queryClient = new QueryClient();

const Posts: React.FC<IPost[]> = ({ posts }) => {
  const [commentText, setCommentText] = useState('');
  const [editedPostText, setEditedPostText] = useState('');
  const [editedCommentText, setEditedCommentText] = useState('');
  const [commentOnCommentText, setCommentOnCommentText] = useState('');
  const [isCommentFormVisible, setIsCommentFormVisible] = useState<{ [key: string]: boolean }>({});
  const [isEditPostFormVisible, setIsEditPostFormVisible] = useState<{ [key: string]: boolean }>({});
  const [isEditCommentFormVisible, setIsEditCommentFormVisible] = useState<{ [key: string]: boolean }>({});
  const [isCommentOnCommentFormVisible, setIsCommentOnCommentFormVisible] = useState<{ [key: string]: boolean }>({});
  // const queryClient = useQueryClient();
  const [readMore, setReadMore] = useState<{ [key: string]: boolean }>(() => {
    const initialState: { [key: string]: boolean } = {};
    posts.forEach(post => {
      initialState[post.id] = false;
    });
    return initialState;
  });

  const mutations = useMutationsContext();

  const handleAddLike = (id: string) => {
    mutations.createMutations.createLike.mutate(id);
  }

  // const handleAddLikeForComment = (id: string) => {
  //   mutations.createMutations.createLikeForComment.mutate(id);
  // }

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };

  const handleEditPostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPostText(event.target.value);
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

  const handleDelete = async (postId: any) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        mutations.DeleteMutations.deletePost.mutate(postId);
      } catch (error) {
        console.error('Error deleting profile:', error);
        // Handle error
      }
    }
  };

  // const EditPost = async (postId: any) => {
  //   // if (window.confirm('Are you sure you want to delete this post?')) {
  //   try {
  //     mutations.UpdateMutations.updatePost.mutate(postId, editedPostText)
      
  //   } catch (error) {
  //     console.error('Error creating profile:', error);
  //     // Handle error
  //   }
  //   // }
  // };

  const handleToggleEditPostForm = (postId: string) => {
    setIsEditPostFormVisible(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));    
  };

  // const handleToggleEditCommentForm = (postId: string, content: string) => {
  //   setIsEditCommentFormVisible(prev => ({
  //     ...prev,
  //     [postId]: !prev[postId]
  //   }));
  //   setEditedCommentText(content);
  // };

  // const handleToggleCommentOnCommentForm = (postId: string, content: string) => {
  //   setIsCommentOnCommentFormVisible(prev => ({
  //     ...prev,
  //     [postId]: !prev[postId]
  //   }));
  //   setCommentOnCommentText(content);
  // };

  // const handleDeleteComment = async (commentId: string) => {
  //   if (window.confirm('Are you sure you want to delete this comment?')) {
  //     try {
  //       // const response: AxiosResponse = await deleteComment(commentId); // Remove the deleted profile from the state 
  //       mutations.DeleteMutations.deleteComment.mutate(commentId);
        
  //     } catch (error) {
  //       console.error('Error creating profile:', error);
  //       // Handle error
  //     }
  //   }
  // };

  // const EditComment = async (profileId: any) => {
  //   // if (window.confirm('Are you sure you want to delete this post?')) {
  //   try {
  //     const response: AxiosResponse = await deletePost(profileId); // Remove the deleted profile from the state 
  //     const { redirectUrl } = response.data;

  //     if (redirectUrl) {
  //       // Use react-router-dom's useNavigate to redirect
  //       navigate(redirectUrl);
  //     }
  //   } catch (error) {
  //     console.error('Error creating profile:', error);
  //     // Handle error
  //   }
  //   // }
  // };

  const handleAddComment = async (postId: string) => {
    if (commentText.trim()) {
      try {
        // await addComment(postId, commentText);
        // queryClient.invalidateQueries('posts');
        mutations.CreateMutations.createComment.mutate(postId, commentText);
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
    if (editedPostText.trim()) {
      try {
        console.log('editedPostText: ', editedPostText);
        mutations.UpdateMutations.updatePost.mutate(postId, editedPostText);

        setEditedPostText('');
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

  // const handlePublishEditedComment = async (commentId: string) => {
  //   if (editedCommentText.trim()) {
  //     try {
  //       console.log('editedCommentText: ', editedCommentText);
  //       // await editComment(commentId, editedCommentText);
  //       mutations.UpdateMutations.updateComment.mutate(commentId, editedCommentText);

  //       setEditedCommentText('');
  //       // hide form after publishing edit
  //       setIsEditCommentFormVisible(prev => ({
  //         ...prev,
  //         [commentId]: !prev[commentId]
  //       }));
  //     } catch (error) {
  //       console.error('Error adding comment:', error);
  //     }
  //   }
  // };

  // const handlePublishCommentOnComment = async (commentId: string) => {
  //   if (commentOnCommentText.trim()) {
  //     try {
  //       console.log('commentOnCommentText: ', commentOnCommentText);
  //       // await commentOnComment(commentId, commentOnCommentText);
  //       mutations.CreateMutations.createCommentOnComment.mutate(commentId, commentOnCommentText);

  //       setCommentOnCommentText('');
  //       // hide form after publishing edit
  //       setIsCommentOnCommentFormVisible(prev => ({
  //         ...prev,
  //         [commentId]: !prev[commentId]
  //       }));
  //     } catch (error) {
  //       console.error('Error adding comment:', error);
  //     }
  //   }
  // };

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
                      <Dropdown.Item href="#" onClick={() => handleToggleEditPostForm(id)}>Edit</Dropdown.Item>
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
                        value={editedPostText}
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
                      <LikeButton isDisabled={false} likesCount={likes?.length} onClick={() => handleAddLike(id)} />
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
                  {/* {readMore[id] && comments && comments.length > 0 && comments.map((comment) => ( */}
                  {readMore[id] && comments && comments.length > 0 ? (
                        <>
                        first comment section
                        <CommentsSection 
                        comments={comments} 
                        />
                        end of first comment section
                        </>
                      ) : (
                        <>
                      no comments here
                      {/* s */}
                    </>
                          )}
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
