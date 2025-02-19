// import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Container, FormControl, FormLabel, HStack, Input, Progress, Stack, Tag, TagLabel, Text, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react';
import { User } from '@supabase/supabase-js';
import { AxiosResponse } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { createProfile, getProfileByAuthorEmail, publishProfile, saveProfile } from '../services/api';
import { supabaseClient } from '../config/supabase-client';
// import { EditIcon } from '@chakra-ui/icons'
import { FaAddressBook, FaCheck } from 'react-icons/fa';
// import { AsyncSelect, MultiValue } from 'chakra-react-select';
import { pickListOptions } from '../config/pickListOptions';
import { getRandomColor } from '../utils/functions';
import React from "react";
import { Container, Accordion, Card, Button, Form, Modal, Badge } from "react-bootstrap";
import { Toast, ToastContainer } from "react-bootstrap";
import axios from "axios";

import Select, { ActionMeta, MultiValue } from "react-select";

const mappedColourOptions = pickListOptions.map(option => ({
  ...option,
  colorScheme: option.color
}));

interface Props {
  isPublished?: boolean;
  childToParent(success: boolean): any;
}

const ProfileDetail = ({ childToParent }: Props) => {
  const [username, setUsername] = useState<string>('');
  // const [languages, setLanguages] = useState<IProgrammingLanguage[] | undefined>();
  const [website, setWebsite] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [isPublic, setIsPublic] = useState<boolean>();
  const [isEditingLanguage, setIsEditingLanguage] = useState<boolean>();
  const [profileId, setProfileId] = useState<number>()
  const [user, setUser] = useState<User | null>();
  const [newParams, setNewParams] = useState<any[]>([]);
  const [showToast, setShowToast] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [languages, setLanguages] = useState<string[]>([]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // const toast = useToast();
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // declare the data fetching function
    const fetchUserData = async () => {
      const { data: { user } } = await supabaseClient.auth.getUser()
      setUser(user)

      // we refetch here?
      //if (user) refetch()
    }
    // call the function
    fetchUserData()
      // make sure to catch any error
      .catch(console.error);
  }, [])

  const fetchProfile = async () => {
    const res: AxiosResponse<ApiDataType> = await getProfileByAuthorEmail(user?.email!)
    return res.data;
  };

  const { isLoading: isFetchingProfile, data: profileData, refetch } = useQuery(['profile'], fetchProfile, {
    enabled: false, onSuccess(res: IProfile) {
      if (res != null) {
        setUsername(res.username)
        setWebsite(res.website)
        setCompany(res.company)
        setProfileId(res.id)
        childToParent(res.isPublic ? true : false);
        setIsPublic(res.isPublic)

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
    onError: (error) => {
      console.log(error)
    },
  });

  const postCreateProfile = async (): Promise<AxiosResponse> => {
    const profile: Omit<IProfile, 'id'> = {
      userId: user?.id!,
      website: website,
      username: username,
      company: company,
      authorEmail: user?.email!,
      programmingLanguages: languages!
    };
    return await createProfile(profile);
  }

  const { isLoading: isCreatingProfile, mutate: postProfile } = useMutation(postCreateProfile, {
    onSuccess(res) {
      setShowToast(true);

      refetch()
    }
  });

  const postUpdateProfile = async (): Promise<AxiosResponse> => {
    const profile: IProfile = {
      userId: user?.id!,
      website: website,
      username: username,
      company: company,
      authorEmail: user?.email!,
      id: profileId!,
      programmingLanguages: languages!
    };
    return await saveProfile(profile);
  }

  const ProfileUpdate: React.FC = () => {
    const [showToast, setShowToast] = React.useState(false);

    const { isLoading: isUpdatingProfile, mutate: updateProfile } = useMutation(
      postUpdateProfile,
      {
        onSuccess: (res) => {
          setShowToast(true);
          refetch();
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );

    const postPublishProfile = async (): Promise<AxiosResponse> => {
      return await publishProfile(profileId!);
    }

    const { isLoading: isPublishingProfile, mutate: publish } = useMutation(
      postPublishProfile,
      {
        onSuccess: (res) => {
          setShowToast(true);
          refetch()
        },
        onError: (err) => {
          console.log(err)
        },
        //onMutate: () => console.log('mutating')
      }
    );

    function publishMe() {
      // onClose()
      publish();
    }

    function postData() {
      try {
        if (profileId) {
          updateProfile()
        } else {
          postProfile()
        }
      } catch (err) {
        //setPostResult(fortmatResponse(err));
      }
    }

    // function handleLanguages(e: MultiValue<{ colorScheme: string; value: string; label: string; color: string; }>) {
    //   let newParams: any[] = []
    //   for (let i = 0; i < e.length; i += 1) {
    //     const obje = e[i].value
    //     newParams.push(obje)
    //   }

    //   setLanguages(newParams)
    // }

    // const handleLanguages = (newValue: MultiValue<{ value: string; label: string }>, actionMeta: ActionMeta<{ value: string; label: string }>) => {
    //   setLanguages(newValue.map(option => ({ name: option.label })));
    // };

    // const handleLanguages = (newValue: MultiValue<{ value: string; label: string }>, actionMeta: ActionMeta<{ value: string; label: string }>) => {
    //   setLanguages(newValue.map((option, index) => ({
    //     id: index, // Placeholder value
    //     name: option.label,
    //     language: option.value,
    //     profileId: 1 // Placeholder value
    //   })));
    // };

    // const handleLanguagesChange = (newValue: MultiValue<{ value: string; label: string }>, actionMeta: ActionMeta<{ value: string; label: string }>) => {
    //   setLanguages(newValue.map(option => option.value));
    // };

    
    const handleLanguages = (newValue: MultiValue<{ value: string; label: string }>, actionMeta: ActionMeta<{ value: string; label: string }>) => {
      setLanguages(newValue.map(option => option.value));
    };

    const editLanguage = () => {
      setNewParams([])
      setIsEditingLanguage(true)
    }

    function handleUserNameChange(e: any) {
      setUsername(e.target.value);
    }

    // const color = useColorModeValue('gray.800', 'gray.200')
    // const bgColor = useColorModeValue('gray.100', 'gray.600')
    // const bgColorFocus = useColorModeValue('gray.200', 'gray.800')

    const options = [
      { value: 'java', label: 'Java' },
      { value: 'golang', label: 'GoLang' },
      { value: 'python', label: 'Python' },
      // Add more options as needed
    ];

    return (
      <Container className="py-5">


        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Item eventKey="0">
              <Accordion.Header onClick={() => refetch()}>Show profile</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="username"
                    />
                  </Form.Group>
                  <Form.Group controlId="website">
                    <Form.Label>Website</Form.Label>
                    <Form.Control
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="website"
                    />
                  </Form.Group>
                  <Form.Group controlId="company">
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="company"
                    />
                  </Form.Group>
                  {isEditingLanguage ? (
                    <Form.Group controlId="languages">
                      <Form.Label>Select programming languages that you like most</Form.Label>
                      <Select
                        isMulti
                        name="languages"
                        options={options}
                        placeholder="ex: Java, GoLang"
                        closeMenuOnSelect={false}
                        onChange={handleLanguages}
                      />
                    </Form.Group>
                  ) : (
                    <>
                      <Form.Label>Programming languages</Form.Label>
                      <div className="d-flex flex-wrap">
                        {languages?.map((lang, index) => (
                          <Badge key={index} bg="primary" className="mr-2">
                            {lang}
                          </Badge>
                        ))}

                        <Button variant="outline-primary" onClick={() => setIsEditingLanguage(true)}>
                          Edit
                        </Button>
                      </div>
                    </>
                  )}
                </Form>
                <div className="d-flex justify-content-between mt-4">
                  {!isPublic && profileId && (
                    <Button variant="primary" onClick={handleOpen}>
                      <FaAddressBook className="mr-2" />
                      Publish Profile
                    </Button>
                    // <Button variant="danger"  onClick={() => open()}>
                    //   <FaAddressBook className="mr-2" />
                    //   Publish profile
                    // </Button>
                  )}
                  <Button
                    variant="primary"
                    onClick={postData}
                    disabled={!username || !website || !languages?.length}
                  >
                    <FaCheck className="mr-2" />
                    {profileId ? "Update" : "Save"}
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Card>

          <Modal show={isOpen} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Publish Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure? You can't undo this action afterwards.</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Publish
              </Button>
            </Modal.Footer>
          </Modal>

        </Accordion>
      </Container>
    )
  }
};

export default ProfileDetail;
