import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseClient } from '../config/supabase-client';
import { useMutation, useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { addPost, getProfileByAuthorEmail } from '../api';
import { Session, User } from '@supabase/supabase-js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import React from 'react';

function NewPostPage() {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [session, setSession] = useState<Session | null>();
  const [user, setUser] = useState<User | null>();
  const [state, setState] = useState<'initial' | 'submitting' | 'success'>('initial');
  const [error, setError] = useState(false);
  // const toast = useToast();
  const navigate = useNavigate()
  const [profile, setProfile] = useState<IProfile>()

  // const fetchProfile = async () => {
  //   const res: AxiosResponse<ApiDataType> = await getProfileByAuthorEmail(session?.user.email!)
  //   return res.data;
  // };

  // const { data: profileData, isLoading: isFetchingProfile, refetch } = useQuery(['profile'], fetchProfile, {
  //   enabled: false, onSuccess(res: IProfile) {
  //   },
  //   onError: (err) => {
  //     console.log(err)
  //   }
  // });

  // useEffect(() => {
  //   const setData = async () => {
  //     const { data: { session }, error } = await supabaseClient.auth.getSession();
  //     if (error) throw error;
  //     setSession(session);
  //     // console.log(JSON.stringify(session?.access_token))
  //   };

  //   setData();
  // }, []);

  // useEffect(() => {
  //   if (profileData) {
  //     setProfile(profileData)
  //   }

  //   // declare the data fetching function
  //   // const fetchUserData = async () => {
  //   //   const { data: { user } } = await supabaseClient.auth.getUser()
  //   //   setUser(user)
  //   // }

  //   // // call the function
  //   // fetchUserData()
  //   //   // make sure to catch any error
  //   //   .catch(console.error);
  // }, [profileData])
  // const postCreateProfile = async (): Promise<void> => {
  //   console.log('inside postCreateProfile');
  //   console.log('website: ', website);
  //   console.log('username: ', username);
  //   console.log('company: ', company);
  //   console.log('languages: ', languages);
  //   console.log('mainOptions: ', mainOptions);

  //   const profile: Omit<IProfile, 'id'> & { mainOptions: boolean } = {
  //     userId: user?.id!,
  //     website: website!,
  //     username: username!,
  //     company: company!,
  //     authorEmail: user?.email!,
  //     programmingLanguages: languages!,
  //     mainOptions: mainOptions  // Add mainProfile to the request
  //   } 
  //   // , {mainProfile: mainOptions } // Add mainProfile to the request}

  //   try {
  //     const response: AxiosResponse = await createProfile(profile);
  //     const { redirectUrl } = response.data;

  //     if (redirectUrl) {
  //       // Use react-router-dom's useNavigate to redirect
  //       navigate(redirectUrl);
  //     }
  //   } catch (error) {
  //     console.error('Error creating profile:', error);
  //     // Handle error
  //   }
  // };

  // const createPost = async (): Promise<AxiosResponse> => {
  //   const post: Omit<IPost, 'id'> = {
  //     title: postTitle,
  //     content: postContent,
  //     // profileId: profile?.id!,
  //   }
  //   try {
  //     const response: AxiosResponse = await addPost(post);
  //     const { redirectUrl } = response.data;

  //     if (redirectUrl) {
  //       // Use react-router-dom's useNavigate to redirect
  //       navigate(redirectUrl);
  //     }

  //     return response;
  //   } catch (error) {
  //     console.error('Error creating profile:', error);
  //     // return error: any;
  //     // Handle error
  //     // return undefined;
  //   }
  //   // return await addPost(post);
  // }

  // import { AxiosResponse } from 'axios';

const createPost = async (): Promise<AxiosResponse> => {
    const post: Omit<IPost, 'id'> = {
        title: postTitle,
        content: postContent,
        // profileId: profile?.id!,
    };

    try {
        const response: AxiosResponse = await addPost(post);
        const { redirectUrl } = response.data;

        if (redirectUrl) {
            // Use react-router-dom's useNavigate to redirect
            navigate(redirectUrl);
        }

        return response;
    } catch (error) {
        console.error('Error creating post:', error);
        // Create a default response object to return
        const defaultResponse: AxiosResponse = {
            data: null,
            status: 500,
            statusText: 'Internal Server Error',
            headers: {},
            config: {},
        };

        return defaultResponse;
    }
};


  const { isLoading: isPostingPost, mutate: postPost } = useMutation(createPost, {
    onSuccess(res) {
      // entered code for toast message here
      console.log('created ost succesfully')
    }
  })

  function postData() {
    try {
      postPost()
    } catch (err) {
      console.error(err);
      //setPostResult(fortmatResponse(err));
    }
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="p-4 bg-white shadow rounded">
            <h2 className="text-center mb-4">What do you have in mind?</h2>
            <Form onSubmit={async (e: FormEvent) => {
              e.preventDefault();
              postData();
              // ... your form submission logic
            }}>
              <Form.Group controlId="postTitle">
                <Form.Control
                  type="text"
                  placeholder="Your title here"
                  value={postTitle}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPostTitle(e.target.value)}
                  disabled={state !== 'initial' && state !== 'success'}
                  required
                />
              </Form.Group>
              <Form.Group controlId="postContent" className="mt-3">
                <Form.Control
                  type="text"
                  placeholder="Your content here"
                  value={postContent}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPostContent(e.target.value)}
                  disabled={state !== 'initial' && state !== 'success'}
                  required
                />
              </Form.Group>
              <Button
                variant={state === 'success' ? 'success' : 'primary'}
                type={state === 'success' ? 'button' : 'submit'}
                // onClick={postData}
                className="mt-4 w-100"
                disabled={state === 'submitting'}
              >
                {state === 'success' ? <i className="bi bi-check mr-2"></i> : 'Submit'}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default NewPostPage;
