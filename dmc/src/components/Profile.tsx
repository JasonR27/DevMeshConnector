import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Stack, Modal, Badge, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { FaAddressBook, FaCheck, FaEdit } from 'react-icons/fa';
import { pickListOptions } from '../config/pickListOptions';
// import { AxiosResponse } from 'axios';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getRandomColor } from '../utils/functions';
// import { getUserInfo, getUserData, createPicture, getPictureByProfileId, getProfileByAuthorEmail, updatePicture, createProfile, saveProfile, publishProfile } from '../services/api';
import { useAuth } from '../context/Auth';
import { useNavigate } from 'react-router-dom';
import { useMutationsContext } from '../context/MutationsContext';
import { styled } from '@mui/system';
// import { ThemeProviderContext } from '../context/ThemeContext';

const StyledBox = styled(Box)(({ theme }) => ({
  textDecoration: 'none',
  flex: 1,
  borderRadius: 5,
  maxWidth: '600px',
  minWidth: '300px',
  margin: 'auto',
  padding: 4,
  boxShadow: 2,
  backgroundColor: theme.palette.mode === 'light' ? 'white' : 'black',
}));

// const queryClient = new QueryClient();

const Profile = () => {
  const [username, setUsername] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [isEditingLanguage, setIsEditingLanguage] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPublishingProfile, setIsPublishingProfile] = useState<boolean>(false);
  // const [isUpdatingProfile, setIsUpdatingProfile] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<string>();
  const [authorEmail, setAuthorEmail] = useState<string>();
  const [profile, setProfile] = useState<IProfile>();
  const [newParams, setNewParams] = useState<any[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [mainOptions, setMainOptions] = useState<boolean>(false);
  // const [isCreatingProfile, setIsCreatingProfile] = useState<boolean>(false);

  const { user } = useAuth();
  const mutations = useMutationsContext();

  const handleCreateProfile = async () => {
    // setIsCreatingProfile(true);
    setIsPublishingProfile(true);

    const profile: Omit<IProfile, 'id'> & { mainOptions: boolean } = {
      userId: user?.id!,
      website: website!,
      username: username!,
      company: company!,
      authorEmail: user?.email!,
      programmingLanguages: languages!,
      mainOptions: mainOptions,
    };

    try { 
      await mutations.createMutations.createProfile.mutate(profile, mainOptions);
      setIsPublishingProfile(false);
      // setIsCreatingProfile(false);
      navigate('/profiles/myprofiles');
    } catch (error: any) {
      console.error('Profile registration failed', error);
    }
  };

  const handleLanguagesChange = (event: SelectChangeEvent<string[]>) => {
    setLanguages(event.target.value as string[]);
  };

  const navigate = useNavigate();

  const editLanguage = () => {
    setIsEditingLanguage(!isEditingLanguage);
  };

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [state, setState] = useState<'initial' | 'submitting' | 'success'>('initial');
  // const navigate = useNavigate();

  return (
    <Container maxWidth="sm" style={{ position: 'relative' }}>
      <StyledBox boxShadow={3} p={4} borderRadius={2}>
        <Typography variant="h4" align="center" gutterBottom>
          User Profile Edit
        </Typography>
        <Stack spacing={3}>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="website"
            label="Personal Website"
            variant="outlined"
            fullWidth
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <TextField
            id="company"
            label="Company"
            variant="outlined"
            fullWidth
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          {isEditingLanguage ? (
            <FormControl fullWidth>
              <InputLabel id="languages-label">Languages</InputLabel>
              <Select
                labelId="languages-label"
                id="languages-select"
                multiple
                value={languages}
                onChange={handleLanguagesChange}
                renderValue={(selected) => selected.join(', ')}
              >
                {pickListOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <>
              <Typography>Programming languages</Typography>
              <Stack direction="row" spacing={2}>
                {languages.map((lang) => (
                  <Badge key={lang} color="secondary">
                    {lang}
                  </Badge>
                ))}
                <Button variant="outlined" onClick={editLanguage}>
                  <FaEdit /> Edit
                </Button>
              </Stack>
            </>
          )}
          <FormControl fullWidth>
            <InputLabel id="mainOptions-label">Choose as Main Profile</InputLabel>
            <Select
              labelId="mainOptions-label"
              id="mainOptions"
              value={mainOptions ? "true" : "false"}
              onChange={(e) => setMainOptions(e.target.value === "true")}
            >
              <MenuItem value="true">Yes</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
          </FormControl>
          {!isPublic && (
            <Button variant="contained" onClick={onOpen} startIcon={<FaAddressBook />}>
              Publish profile
            </Button>
          )}
          <Modal open={isOpen} onClose={onClose}>
            <Box sx={{ bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
              <Typography variant="h6" component="h2">
                Publish Profile
              </Typography>
              <Typography sx={{ mt: 2 }}>
                Are you sure? The Profile will be online until deletion.
              </Typography>
              <Stack direction="row" spacing={2} mt={4}>
                <Button variant="outlined" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleCreateProfile}
                  disabled={isPublishingProfile}
                >
                  {isPublishingProfile ? 'Publishing...' : 'Publish'}
                </Button>
              </Stack>
            </Box>
          </Modal>
          {/* <Button
            variant="contained"
            color="primary"
            onClick={handleCreateProfile}
            disabled={!username || !website || isCreatingProfile}
          >
            {isCreatingProfile ? 'Saving...' : 'Save'}
          </Button> */}
        </Stack>
      </StyledBox>
    </Container>
  );
};

export default Profile;
