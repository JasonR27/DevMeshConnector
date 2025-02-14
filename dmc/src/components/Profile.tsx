import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Stack, Container, Row, Col, Badge, Modal } from 'react-bootstrap';
import { FaAddressBook, FaCheck, FaEdit } from 'react-icons/fa';
import { pickListOptions } from '../config/pickListOptions';
import { AxiosResponse } from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { supabaseClient } from '../config/supabase-client';
import { getRandomColor } from '../utils/functions';
import { getUserInfo, getUserData, createPicture, getPictureByProfileId, getProfileByAuthorEmail, updatePicture, createProfile, saveProfile, publishProfile } from '../services/api';
import { useAuth } from './Auth/Auth';
import { useNavigate } from 'react-router-dom';
import { TextField, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useMutationsContext } from '../services/MutationsContext';

const queryClient = new QueryClient();

const mappedColourOptions = pickListOptions.map(option => ({
  ...option,
  colorScheme: option.color
}));

const Profile = () => {
  const [username, setUsername] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [isPublic, setIsPublic] = useState<boolean>();
  const [isEditingLanguage, setIsEditingLanguage] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPublishingProfile, setIsPublishingProfile] = useState<boolean>(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<string>();
  const [authorEmail, setAuthorEmail] = useState<string>();
  const [profile, setProfile] = useState<IProfile>();
  const [newParams, setNewParams] = useState<any[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [mainOptions, setMainOptions] = useState<boolean>(false);
  const [isCreatingProfile, setIsCreatingProfile] = useState<boolean>(false);


  const { user, setUser } = useAuth();
  const mutations = useMutationsContext();

  console.log('user: ', user);


  const handleCreateProfile = async () => {

    setIsCreatingProfile(true);

    const profile: Omit<IProfile, 'id'> & { mainOptions: boolean } = {
      userId: user?.id!,
      website: website!,
      username: username!,
      company: company!,
      authorEmail: user?.email!,
      programmingLanguages: languages!,
      mainOptions: mainOptions
    };

    try {
      await mutations.createMutations.createProfile.mutate(profile, mainOptions);
      setIsCreatingProfile(false);
      // history.push('/myprofiles');
      navigate('/myprofiles');
      // window.location.href = '/myprofiles';
    } catch (error: any) {
      console.error('Profile registration failed', error);
      console.log('error name: ', error.name);
      console.log('error message:', error.message)
      console.log('error stack:', error.stack)
      console.log('error code:', error.code)
      console.log('error cause:', error.cause)
      console.log('error arguments:', error.arguments)
      console.log('before console.error')
      console.error
    }
  };

  const handleLanguagesChange = (event: SelectChangeEvent<string[]>) => {
    setLanguages(event.target.value as string[]);
  };

  const fetchProfile = async () => {
    const res: AxiosResponse<ApiDataType> = await getProfileByAuthorEmail(user?.email!);
    return res.data;
  };

  const navigate = useNavigate();

  // isLoading: isCreatingProfile

  const editLanguage = () => {
    setIsEditingLanguage(!isEditingLanguage);
  };

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const publishMe = () => {
    setIsPublishingProfile(true);
    setIsPublishingProfile(false);
    onClose();
  };

  const postData = () => {
    try {
      if (profileId) {
        console.log('profileId already exists');
      } else {
        postProfile();
      }
    } catch (err) {
      console.log('Error creating profile');
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Container className="my-5 position-relative">
        <Row className="justify-content-center">
          <Col md={8}>
            <Stack gap={4} className="bg-light p-4 rounded shadow">
              <h2 className="text-center">User Profile Edit</h2>
              <Form.Group controlId="userName">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="website">
                <Form.Label>Personal Website</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="company">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </Form.Group>
              {isEditingLanguage ? (
                <Form.Group controlId="languages">
                  <Form.Label>Select programming languages that you like most</Form.Label>
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
                </Form.Group>
              ) : (
                <>
                  <Form.Label>Programming languages</Form.Label>
                  <Stack direction="horizontal" gap={2}>
                    {languages.map((lang) => (
                      <Badge key={lang} bg="secondary">
                        {lang}
                      </Badge>
                    ))}
                    <Button variant="outline-primary" onClick={editLanguage}>
                      <FaEdit /> Edit
                    </Button>
                  </Stack>
                </>
              )}
              <label htmlFor="mainOptions">Choose as Main Profile:</label>
              <select
                name="mainOptions"
                id="mainOptions"
                onChange={(e) => {
                  if (e.target.value === 'true') {
                    setMainOptions(true);
                  } else {
                    setMainOptions(false);
                  }
                }}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              {!isPublic && (
                <Button variant="danger" onClick={onOpen}>
                  <FaAddressBook /> Publish profile
                </Button>
              )}
              <Modal show={isOpen} onHide={onClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Publish Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure? The Profile will be online until deletion.</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleCreateProfile}
                    disabled={isPublishingProfile}
                  >
                    {isPublishingProfile ? 'Publishing...' : 'Publish'}
                  </Button>
                </Modal.Footer>
              </Modal>
              <Button
                variant="primary"
                onClick={postData}
                disabled={!username || !website}
              >
                {/* {isCreatingProfile || isUpdatingProfile ? 'Saving...' : 'Save'} */}
                {isCreatingProfile ? 'Saving...' : 'Save'}
              </Button>
            </Stack>
          </Col>
        </Row>
      </Container>
    </QueryClientProvider>
  );
};

export default Profile;
