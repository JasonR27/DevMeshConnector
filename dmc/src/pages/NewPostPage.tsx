import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { useMutationsContext } from '../context/MutationsContext';
import { getCurrentProfileQuery } from '../services/queries';

function NewPostPage() {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [state, setState] = useState<'initial' | 'submitting' | 'success'>('initial');
  const navigate = useNavigate();
  const {data: profileData, OnError, error, isPending } = getCurrentProfileQuery();
  const mutations = useMutationsContext();

  

  const handleSubmit = async () => {
    if (OnError) {
      console.log('error.message: ', error.message);
    }
    if (isPending) {
      console.log('profile data loading...')
    }
    console.log('profileData: ', profileData);
    const newPost = { title: postTitle, content: postContent, profileName: profileData[0].username }
    console.log('newPost.content: ', newPost.content);
    console.log('newPost.profileName: ',newPost.profileName);
    try {
      await mutations.createMutations.createPost.mutate(newPost);
      navigate('/profiles/currentprofile/myposts')
    } catch (error: any) {
      console.log('error.name', error.name)
      console.log('error.message', error.message)
    }
  }
  

  return (
    <Container maxWidth="sm" style={{ marginTop: '5rem', position: 'relative', top: 0, left: 0 }}>
      <Box boxShadow={3} p={4} bgcolor="white" borderRadius={2}>
        <Typography variant="h4" align="center" gutterBottom>
          What do you have in mind, huh?
        </Typography>
        <form onSubmit={async (e: FormEvent) => {
          e.preventDefault();
          handleSubmit();
        }}>
          <TextField
            id="postTitle"
            label="Your title here"
            variant="outlined"
            fullWidth
            margin="normal"
            value={postTitle}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPostTitle(e.target.value)}
            disabled={state !== 'initial' && state !== 'success'}
            required
          />
          <TextField
            id="postContent"
            label="Your content here"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={postContent}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPostContent(e.target.value)}
            disabled={state !== 'initial' && state !== 'success'}
            required
          />
          <Button
            variant="contained"
            color={state === 'success' ? 'success' : 'primary'}
            type={state === 'success' ? 'button' : 'submit'}
            className="mt-4 w-100"
            disabled={state === 'submitting'}
            fullWidth
            sx={{ mt: 2 }}
          >
            {state === 'success' ? '✔️ Success' : 'Submit'}
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default NewPostPage;
