import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Stack, Container, Row, Col, Badge, Modal } from 'react-bootstrap';
import { FaAddressBook, FaCheck, FaEdit } from 'react-icons/fa';
import { pickListOptions } from '../config/pickListOptions';
import { Session, User } from '@supabase/supabase-js';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { supabaseClient } from '../config/supabase-client';
import { getRandomColor } from '../utils/functions';
import AsyncSelect from 'react-select/async';
import { MultiValue, ActionMeta } from 'react-select';
import { createPicture, getPictureByProfileId, getProfileByAuthorEmail, updatePicture, createProfile, saveProfile, publishProfile } from '../api';

const mappedColourOptions = pickListOptions.map(option => ({
  ...option,
  colorScheme: option.color
}));

const Profile = () => {
  const [username, setUsername] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  // const [languages, setLanguages] = useState<string[]>();
  // const [isPublic, setIsPublic] = useState<boolean>(false);
  const [isPublic, setIsPublic] = useState<boolean>();
  const [isEditingLanguage, setIsEditingLanguage] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPublishingProfile, setIsPublishingProfile] = useState<boolean>(false);
  // const [isCreatingProfile, setIsCreatingProfile] = useState<boolean>(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<String>()
  const [authorEmail, setAuthorEmail] = useState<string>();
  const [profile, setProfile] = useState<IProfile>()
  // const [languages, setLanguages] = useState<IProgrammingLanguage[] | undefined>();
  const [session, setSession] = useState<Session | null>();
  const [user, setUser] = useState<User>()
  const [newParams, setNewParams] = useState<any[]>([]);

  // const [programmingLanguages, setProgrammingLanguages] = useState([]);
  const [languages, setLanguages] = useState<string[]>([]);

  // const handleLanguagesChange = (selectedOptions: { map: (arg0: (option: any) => any) => React.SetStateAction<never[]>; }) => {
  //   setProgrammingLanguages(selectedOptions.map((option: { value: any; }) => option.value));
  // };

  const handleLanguagesChange = (newValue: MultiValue<{ value: string; label: string }>, actionMeta: ActionMeta<{ value: string; label: string }>) => {
    setLanguages(newValue.map(option => option.value));
  };


  useEffect(() => {
    const setData = async () => {
      const { data: { session }, error } = await supabaseClient.auth.getSession();
      if (error) throw error;
      setSession(session);
      //console.log('session from App', session?.access_token)
      if (session) {
        setUser(session.user)
      }
    };

    setData();
  }, []);

  const handleLanguages = (e: any) => {
    // Handle language selection
  };

  const fetchProfile = async () => {
    const res: AxiosResponse<ApiDataType> = await getProfileByAuthorEmail(user?.email!)
    return res.data;
  };

  const { data: profileData, error: profileError, isLoading: isFetchingProfile, refetch: refetchProfile } = useQuery(['profile'], fetchProfile, {
    enabled: false, retry: 2, cacheTime: 0, onSuccess(res: IProfile) {
      setProfile(res)
      if (res != null) {
        setUsername(res.username)
        setWebsite(res.website)
        setCompany(res.company)
        setProfileId(res.id)
        setIsPublic(res.isPublic)
        setAuthorEmail(res.authorEmail)
        if (res.programmingLanguages.length !== newParams.length) {
          res.programmingLanguages.forEach(obj => {
            newParams.push(obj)
          })
        }
        setLanguages(newParams)
        setIsEditingLanguage(false)
      } else {
        setIsEditingLanguage(true)
      }
    },
    onError: (error: any) => {
      // toast({
      //   title: 'Error',
      //   position: 'top',
      //   variant: 'subtle',
      //   description: error,
      //   status: 'error',
      //   duration: 3000,
      //   isClosable: true
      // });
    }
  });

  const postCreateProfile = async (): Promise<AxiosResponse> => {
    // const profile: Omit<IProfile, 'id'> = {
    console.log('inside postCreateProfile')
    console.log('website: ', website)
    console.log('username: ', username)
    console.log('website: ', website)
    console.log('company: ', company)
    console.log('languages: ', languages)
    const profile: Omit<IProfile, 'id'> = {
      // userId:
      userId: user?.id!,
      website: website!,
      username: username!,
      company: company!,
      authorEmail: user?.email!,
      programmingLanguages: languages!
    };
    return await createProfile(profile);
  }

  const { isLoading: isCreatingProfile, mutate: postProfile } = useMutation(postCreateProfile, {
    onSuccess(res) {
      console.log('Profile Created Succesfully!')
      // toast({
      //   title: 'Profile created.',
      //   position: 'top',
      //   variant: 'subtle',
      //   description: '',
      //   status: 'success',
      //   duration: 3000,
      //   isClosable: true
      // });
      refetchProfile()
    }
  });

  const editLanguage = () => {
    setIsEditingLanguage(!isEditingLanguage);
  };

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const publishMe = () => {
    setIsPublishingProfile(true);
    // Publish profile logic
    setIsPublishingProfile(false);
    onClose();
  };

  function postData() {
    try {
      if (profileId) {
        console.log('profileId already exists')
        // updateProfile()
      } else {
        postProfile()
      }
    } catch (err) {
      console.log('Error creating profile')
      // setPostResult(fortmatResponse(err));
    }
  }

  // const handleLanguagesChange = (selectedOptions: any[]) => {
  //   setLanguages(selectedOptions.map((option: { value: any; }) => option.value));
  // };

  return (
    <Container className="my-5">
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
              <Form.Label>Website</Form.Label>
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
                {/* Replace with your AsyncSelect component */}
                <AsyncSelect
                  onChange={handleLanguagesChange}
                  isMulti
                  name="programmingLanguages"
                  options={mappedColourOptions}
                  placeholder="ex: JavaScript, C, Assembly"
                  closeMenuOnSelect={false}
                  loadOptions={(inputValue, callback) => {
                    setTimeout(() => {
                      const values = mappedColourOptions.filter((i) =>
                        i.label.toLowerCase().includes(inputValue.toLowerCase()),
                      );
                      callback(values);
                    }, 3000);
                  }}
                />

                {/* <AsyncSelect
                  onChange={(e) => setLanguages(e.target.value)}
                  isMulti
                  name="colors"
                  options={mappedColourOptions}
                  placeholder="ex: JavaScript, C, Assembly"
                  closeMenuOnSelect={false}
                  loadOptions={(inputValue, callback) => {
                    setTimeout(() => {
                      const values = mappedColourOptions.filter((i) =>
                        i.label.toLowerCase().includes(inputValue.toLowerCase()),
                      );
                      callback(values);
                    }, 3000);
                  }}
                /> */}
              </Form.Group>
            ) : (
              <>
                <Form.Label>Programming languages</Form.Label>
                <Stack direction="horizontal" gap={2}>
                  {/* Replace with your tags */}
                  <Button variant="outline-primary" onClick={editLanguage}>
                    <FaEdit /> Edit
                  </Button>
                </Stack>
              </>
            )}
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
                  onClick={postData}
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
              {isCreatingProfile || isUpdatingProfile ? 'Saving...' : 'Save'}
            </Button>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
