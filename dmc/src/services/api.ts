import axios, { AxiosError, AxiosResponse } from 'axios';
import { Console } from 'console';
import { FaLessThanEqual } from 'react-icons/fa';

// const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const homeUrl = window.location.origin;

const BASE_URL = `${homeUrl}/backend`;

export const axiosPublic = axios.create({
  // No credentials are sent
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});


export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Include credentials (cookies) in requests
  headers: {
    'Content-Type': 'application/json',
  }
});

const baseUrl: string = `${BASE_URL}/api/v2`;
const profilesUrl: string = `${BASE_URL}/api/v2/profiles`;
const postsUrl: string = `${BASE_URL}/api/v2/posts`;
const commentsUrl: string = `${BASE_URL}/api/v2/comments`;
const pictureUrl: string = `${BASE_URL}/api/v2/pictures`;
const likeUrl: string = `${BASE_URL}/api/v2/likes`;
const usersUrl: string = `${BASE_URL}/api/v2/users`;
const authUrl: string = `${BASE_URL}/api/v2/auth`;

export const logInUser = async (user: IPossibleUser): Promise<AxiosResponse> => {
  const email = user.email;
  const password = user.password;

  try {
    const response: AxiosResponse<ApiDataType> = await axiosInstance.post(
      `${authUrl}/login/`,
      { email, password },
    );
    return response;
  } catch (error: any) {
    throw new AxiosError(error);
  }
};

export const refreshToken = async (): Promise<void> => {
  try {
    // const response: AxiosResponse<ApiDataType> = 
    await axiosInstance.post(
      `${authUrl}/refreshtoken`
    )
    
  } catch (error: any) {
    console.log('Error refreshing session',error.message)
  }

}

// export const verifySession = async () => {
//   const response = await axiosInstance.get(`${authUrl}/verifytoken/`);
//   console.log('response from verifysession: ', response);
//   return response;
// }

export const verifySession = async () => {
  const response = await axiosInstance.get(`${authUrl}/verifytoken/`);
  console.log('response from verifySession: ', response);
  return response.data.valid;
};


export async function fetchCorsErrors() {
  console.log('entered fetchCorsErrors');
  const response = await axiosInstance.get(baseUrl + '/corserrorsapp',
    {
      withCredentials: true, // Include cookies in the request
    });
  // const response: AxiosResponse<ApiDataType> = await axios.get('/corserrorsapp');
  // const { data } = await axios.get("/corserrorsapp");
  // return data;
  return response.data;
}

export async function fetchCorsErrorsLogin() {
  console.log('entered fetchCorsErrors');
  const response = await axiosInstance.post(baseUrl + '/corserrorsapplogin',
    {
      withCredentials: true, // Include cookies in the request
    });
  // const response: AxiosResponse<ApiDataType> = await axios.get('/corserrorsapp');
  // const { data } = await axios.get("/corserrorsapp");
  // return data;
  return response.data;
}



export async function getUsers(): Promise<IUser[]> {
  const response = await axios.get<IUser[]>(usersUrl);
  const data: IUser[] = response.data;
  return data;
}

export async function getProfiles(): Promise<IProfile[]> {
  const response = await axios.get<IProfile[]>(profilesUrl);
  const data: IProfile[] = response.data;
  return data;
}

export async function getPosts() {
  const response = await axiosInstance.get(postsUrl);
  const data: IPost[] = response.data;
  return data;
}

export async function getComment(commentId: string) {
  const response = await axiosInstance.get(`${commentsUrl}/comment/${commentId}`);
  // const { data } = await axios.get("/api/v1/posts");
  const data: CommentProps = response.data;
  console.log('data: ', data)
  return data;
}

export async function getProfilePosts() {
  const { data } = await axiosInstance.get(`${postsUrl}/profile/current`);
  console.log('data: ', data)
  return data;
}

export const getPost = async (id: number): Promise<AxiosResponse> => {
  const response: AxiosResponse<ApiDataType> = await axios.get(baseUrl + '/post/' + id);
  return response;
};

export const getUserByEmail = async (userEmail: string): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse<ApiDataType> = await axios.get(`${usersUrl}/findUserByEmail/${userEmail}`);
    // const response: AxiosResponse<ApiDataType> = await axios.get(`8080/findProfileByEmail/${authorEmail}`);
    return response;
  } catch (error: any) {
    throw new AxiosError(error);
  }
};



// export async function getProfiles(): Promise<IProfile[]> {
//   const response = await axios.get<IProfile[]>(profilesUrl);
//   const data: IProfile[] = response.data;
//   return data;
// }


export const getProfilesByUser = async (): Promise<IProfile[]> => {
  try {
    const response = await axiosInstance.get<IProfile[]>(`${profilesUrl}/findProfilesByUser/`);
    // const response: AxiosResponse<ApiDataType> = await axios.get(`8080/findProfileByEmail/${authorEmail}`);
    const data: IProfile[] = response.data;
    console.log('api.ts prfsbyemail data: ', data);
    return data;
  } catch (error: any) {
    throw new AxiosError(error);
  }
};

export const getMainProfile = async (): Promise<IProfile[]> => {
  try {
    const response = await axiosInstance.get<IProfile[]>(`${profilesUrl}/main`);
    const data: IProfile[] = response.data;
    console.log('api.ts mainprfbyemail data: ', data);
    return data;
  } catch (error: any) {
    throw new AxiosError(error);
  }
};

export const getCurrentProfile = async (): Promise<IProfile[]> => {
  try {
    const response = await axiosInstance.get<IProfile[]>(`${profilesUrl}/current`);
    // const response: AxiosResponse<ApiDataType> = await axios.get(`8080/findProfileByEmail/${authorEmail}`);
    const data: IProfile[] = response.data;
    console.log('get current profile data: ', data);
    return data;
  } catch (error: any) {
    throw new AxiosError(error);
  }
};

export const getProfileByAuthorEmail = async (authorEmail: string): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse<ApiDataType> = await axios.get(`${profilesUrl}/findProfileByEmail/${authorEmail}`);
    // const response: AxiosResponse<ApiDataType> = await axios.get(`8080/findProfileByEmail/${authorEmail}`);
    return response;
  } catch (error: any) {
    throw new AxiosError(error);
  }
};

  export const deleteProfile = async (profileId: string) => {
    try {
      console.log('profileId params: ', profileId);
      const response = await axios.delete(`${profilesUrl}/delete`,  { params: { profileId },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting profile:', error);
      throw error;
    }
};

export const deletePost = async (postId: string) => {
  try {
    const response = await axios.delete(`${postsUrl}/delete/${postId}`, { params: { postId },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw error;
  }
};

export const editProfile = async (postId: string, content: string) => {
  try {
    console.log('content: ', content);
    const response = await axiosInstance.put(`${profilesUrl}/edit/${postId}`, { content, postId });
    return response.data;
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw error;
  }
};

export const editPost = async (postId: string, content: string) => {
  try {
    console.log('content: ', content);
    const response = await axiosInstance.put(`${postsUrl}/edit/${postId}`, { content, postId });
    return response.data;
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw error;
  }
};

export const editComment = async (commentId: string, content: string) => {
  try {
    console.log('content: ', content);
    const response = await axiosInstance.put(`${commentsUrl}/edit/${commentId}`, { content, commentId });
    return response.data;
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw error;
  }
};

export const deleteComment = async (profileId: string) => {
  try {
    const response = await axios.delete(`${commentsUrl}/delete/${profileId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};


export const SelectAsMain = async (profileId: string) => {
  try {
    const response = await axiosInstance.put(`${profilesUrl}/update/main`, { profileId },
      {
        withCredentials: true,
      });
    return response.data;
  } catch (error) {
    console.error('Error selecting main profile:', error);
    throw error;
  }
};

export const SelectAsCurrent = async (profileId: string) => {
  try {
    const response = await axiosInstance.put(`${profilesUrl}/update/current/${profileId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw error;
  }
};

export const createComment = async (newComment: IComment) => {
  console.log('api comment(content): ', newComment);
  // console.log('content: ', content)
  const response = await axiosInstance.post(`${commentsUrl}/create`, newComment);
  return response.data;
};

export const createCommentOnComment = async (newComment: IComment) => {
  try {
    console.log('api comment on comment: ', newComment);
    console.log('api comment on comment commentId: ', newComment.commentId);
    console.log('api comment on comment content: ', newComment.content);
    const response = await axiosInstance.post(`${commentsUrl}/create/commentoncomment`, newComment);
    return response.data;
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw error;
  }
};

export async function createPost(post: Omit<IPost, 'id'>) {
  const response = await axiosInstance.post(`${postsUrl}/create`, post);
  return response;
}

export async function createUser(user: Omit<IUser, 'id'>) {
  console.log('axios post to /create, res: User')
  console.log('authUrl: ', authUrl)
  const response = await axios.post(`${authUrl}/signup`, user);

  return response;
}

export async function createProfile(profile: Omit<IProfile, 'id'>, mainOptions: boolean) {
  console.log('axios post to /create, res: profile');

  try {
    const response = await axios.post(`${profilesUrl}/create`, { profile, mainOptions }, {
      withCredentials: true, // Include cookies in the request
      headers: {
        'Content-Type': 'application/json', // Specify content type
      },
    });
    return response;
  } catch (error) {
    console.error('Error creating profile:', error);
    throw error; // Rethrow or handle the error as needed
  }
}

export async function saveProfile(profile: IProfile) {
  const response = await axios.put(`${profilesUrl}/updateById/${profile.id}`, profile);
  return response;
}

export async function publishProfile(profileId: number) {
  const response = await axios.put(`${profilesUrl}/publishProfile/${profileId}`);
  return response;
}

export async function createPicture(picture: Omit<IPicture, 'id'>, accToken: string) {
  const response = await axios.post(`${pictureUrl}/create`, picture, {
    headers: { Authorization: `token ${accToken}` }
  });
  return response;
}

export async function updatePicture(picture: Omit<IPicture, 'id'>, accToken: string) {
  const response = await axios.put(`${pictureUrl}/update`, picture, {
    headers: { Authorization: `token ${accToken}` }
  });
  return response;
}

export async function getPictureByProfileId(profileId: number) {
  const response = await axios.get(`${pictureUrl}/pictureByProfileId/${profileId}`);
  return response;
}

export async function getUserData() {
  const response = await axios.get(`${authUrl}/userdata/`, { withCredentials: true });
  return response;
}

// export async function getUserData(accToken: string | null) {
//   const response = await axios.get(`${authUrl}/userdata/`, { headers: { Authorization: `token ${accToken}` } });
//   return response;
// }

// export async function getUserData() {
//   const response = await axios.get(`${authUrl}/userdata/`);
//   return response;
// }

// export async function getUserInfo(accToken: string | null) {
export async function getUserInfo() {
  // const response = await axios.get(`${authUrl}/userinfo/`, { headers: { Authorization: `token ${accToken}` } });
  const response = await axiosInstance.get(`${authUrl}/userinfo/`);
  return response;
}

export async function postLogOut() {
  // const response = await axios.get(`${authUrl}/userinfo/`, { headers: { Authorization: `token ${accToken}` } });
  const response = await axiosInstance.post(`${authUrl}/logout/`);
  return response;
}


export async function addLike(postId?: string, commentId?: string) {
  const response = await axiosInstance.post(`${likeUrl}/create`, { postId, commentId }
  );
  return response;
}

export async function addLikeForComment(commentId?: string) {
  const response = await axiosInstance.post(`${likeUrl}/comments/createlike`, { commentId }
  );
  return response;
}
