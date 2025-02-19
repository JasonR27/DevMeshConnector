import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MenuProps, Box, Container, Card,
  CardActions, CardContent, CardHeader, Button,
  Badge, Menu, MenuItem, TextField, IconButton, Typography
} from '@mui/material';
// import { MoreVert } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment';
import { truncate } from '../utils/functions';
import { ReadmoreButton } from './ReadMoreButton';
import LikeButton from './LikeButton';
import ProfileAvatar from './ProfileAvatar';
// import '../styles/Posts.css';
import { AxiosResponse } from 'axios';
import CommentsSection from './CommentsSection';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMutationsContext } from '../context/MutationsContext';

// import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import Menu, { MenuProps } from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const queryClient = new QueryClient();
const Posts: React.FC<IPost[]> = ({ posts }) => {

  const [commentText, setCommentText] = useState('default');
  const [editedPostText, setEditedPostText] = useState('');
  const [editedCommentText, setEditedCommentText] = useState('');
  const [commentOnCommentText, setCommentOnCommentText] = useState('');
  const [isCommentFormVisible, setIsCommentFormVisible] = useState<{ [key: string]: boolean }>({});
  const [isEditPostFormVisible, setIsEditPostFormVisible] = useState<{ [key: string]: boolean }>({});
  const [isEditCommentFormVisible, setIsEditCommentFormVisible] = useState<{ [key: string]: boolean }>({});
  const [isCommentOnCommentFormVisible, setIsCommentOnCommentFormVisible] = useState<{ [key: string]: boolean }>({});
  const [readMore, setReadMore] = useState<{ [key: string]: boolean }>(() => {
    const initialState: { [key: string]: boolean } = {};
    posts.forEach(post => {
      initialState[post.id] = false;
    });
    return initialState;
  });
  const [menuPostId, setMenuPostId] = useState<null | string>(null);

  const mutations = useMutationsContext();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, postId: number) => {
    setAnchorEl(event.currentTarget);
    setMenuPostId(postId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuPostId(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddLike = (id: string) => {
    mutations.createMutations.createLike.mutate(id);
  }

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
    console.log(commentText);
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
        mutations.deleteMutations.deletePost.mutate(postId);
      } catch (error) {
        console.error('Error deleting profile:', error);
        // Handle error
      }
    }
  };

  const handleToggleEditPostForm = (postId: string, content: string) => {
    setEditedPostText(content);
    setIsEditPostFormVisible(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleAddComment = async (postId: string) => {
    console.log('commentText: ', commentText);
    if (commentText.trim()) {
      console.log('cmttxt.trim = true')
      console.log('commentText: ', commentText);

      try {
        const newComment = { postId: postId, content: commentText }
        console.log('commentText: ', commentText);
        console.log('newComment.content: ', newComment.content);
        mutations.createMutations.createComment.mutate(newComment);
        console.log('commentText: ', commentText);
        console.log('newComment.content: ', newComment.content);
        // setCommentText('');
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
        mutations.updateMutations.updatePost.mutate(postId, editedPostText);
        setEditedPostText('');
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
      <Container style={{ position: 'relative' }}>
        {posts.slice().reverse().map(({ id, createdAt, title, content, profile, likes, comments }, i) => (

          <Box key={i} width={{ xs: '100%', sm: '50%', md: '33%' }} p={1}>
            <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardHeader

                action={
                  <>
                    <IconButton
                      aria-label="settings"
                      onClick={(event) => handleMenuOpen(event, id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && menuPostId === id}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={() => handleToggleEditPostForm(id, content)}>Edit</MenuItem>
                      <MenuItem onClick={() => handleToggleCommentForm(id)}>Comment</MenuItem>
                      <MenuItem onClick={() => handleDelete(id)}>Delete</MenuItem>
                    </Menu>
                  </>
                }
                title={title}
              />


              {isEditPostFormVisible[id] ? (
                <form>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Edit your post"
                    value={editedPostText}
                    onChange={handleEditPostChange}
                  />
                  <Button variant="contained" onClick={() => handlePublishEditedPost(id)} className="mt-2">Publish</Button>
                </form>
              ) : (
                <>
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      {content}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <ReadmoreButton onClick={() => handleReadMore(id)} postId={Number(id)} />
                    <LikeButton isDisabled={false} likesCount={likes?.length} onClick={() => handleAddLike(id)} />
                  </CardActions>
                </>
              )}

              {isCommentFormVisible[id] && (
                <form>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={handleCommentChange}
                  />
                  <Button variant="contained" onClick={() => handleAddComment(id)} className="mt-2">Post Comment</Button>
                </form>
              )}
              <div>Comments Section</div>
              {readMore[id] && comments && comments.length > 0 ? (
                <>
                  {/* {comments} */}
                  <CommentsSection comments={comments} />
                </>
              ) : (
                <p>No comments here</p>
              )}


            </Card>
          </Box>
        ))}
      </Container>
    </div >
  );
};

export default Posts;
