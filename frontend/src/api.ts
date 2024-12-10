import axios, { AxiosError, AxiosResponse } from 'axios';
import { Console } from 'console';
import { FaLessThanEqual } from 'react-icons/fa';

// import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true, // Include credentials (cookies) in requests
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosInstance;

// import axios from 'axios';
const BASE_URL = 'http://localhost:8080';

// export default axios.create({
//     baseURL: BASE_URL
// });

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});


console.log("REACT_APP_TESTBACKEND: ", import.meta.env.VITE_TESTBACKEND)
console.log("VITE_BACKEND_URL: ", import.meta.env.VITE_BACKEND_URL)
 
const baseUrl: string = `${import.meta.env.VITE_BACKEND_URL}/api/v1`;
const profilesUrl: string = `${import.meta.env.VITE_BACKEND_URL}/api/v1/profiles`;
const pictureUrl: string = `${import.meta.env.VITE_BACKEND_URL}/api/v1/pictures`;
const likeUrl: string = `${import.meta.env.VITE_BACKEND_URL}/api/v1/likes`;
const usersUrl: string = `${import.meta.env.VITE_BACKEND_URL}/api/v1/users`;
const authUrl: string = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth`;

export const logInUser  = async (user: IPossibleUser ): Promise<AxiosResponse> => {
  const email = user.email;
  const password = user.password;

  try {
    // First, make the login request to get the token
    const response: AxiosResponse<ApiDataType> = await axiosInstance.post(
      // `${authUrl}/login/`,
      `${authUrl}/login/`, 
      { email, password }, 
      // { headers: {'Content-Type': 'application/json',}, withCredentials: true } // Include credentials if needed
    );
    return response;
  } catch (error: any) {
    throw new AxiosError(error);
  }
};

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
    {withCredentials: true, // Include cookies in the request
    });
  // const response: AxiosResponse<ApiDataType> = await axios.get('/corserrorsapp');
  // const { data } = await axios.get("/corserrorsapp");
  // return data;
  return response.data;
}

export async function fetchCorsErrorsLogin() {
  console.log('entered fetchCorsErrors');
  const response = await axiosInstance.post(baseUrl + '/corserrorsapplogin', 
    {withCredentials: true, // Include cookies in the request
    });
  // const response: AxiosResponse<ApiDataType> = await axios.get('/corserrorsapp');
  // const { data } = await axios.get("/corserrorsapp");
  // return data;
  return response.data;
}

export async function getProfiles(): Promise<IProfile[]> {
  const response = await axios.get<IProfile[]>(profilesUrl);
  const data: IProfile[] = response.data;
  return data;
}

export async function getUsers(): Promise<IUser[]> {
  const response = await axios.get<IUser[]>(usersUrl);
  const data: IUser[] = response.data;
  return data;
}

export async function fetchPosts() {
  const { data } = await axios.get(baseUrl);
  // const { data } = await axios.get("/api/v1/posts");
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

export const getProfileByAuthorEmail = async (authorEmail: string): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse<ApiDataType> = await axios.get(`${profilesUrl}/findProfileByEmail/${authorEmail}`);
    // const response: AxiosResponse<ApiDataType> = await axios.get(`8080/findProfileByEmail/${authorEmail}`);
    return response;
  } catch (error: any) {
    throw new AxiosError(error);
  }
};

export async function addPost(post: Omit<IPost, 'id'>, accToken: string) {
  const response = await axios.post(`${baseUrl}/create`, post, { headers: { Authorization: `token ${accToken}` } });
  return response;
}

export const deleteTodo = async (id: number): Promise<AxiosResponse> => {
  try {
    const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(`${baseUrl}/delete-todo/${id}`);
    return deletedTodo;
  } catch (error: any) {
    throw new Error(error);
  }
};

export async function createUser(user: Omit<IUser, 'id'>) {
  console.log('axios post to /create, res: User')
  console.log('authUrl: ', authUrl)
  const response = await axios.post(`${authUrl}/signup`, user);
  
  return response;
}

// import axios from 'axios';

// Function to get a specific cookie by name
// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// }

// export async function createProfile(profile) {
//   // Retrieve the token from the cookie
//   const token = getCookie('token'); // Replace 'token' with the actual cookie name

//   try {
//     const response = await axios.post(`${profilesUrl}/create`, profile, {
//       withCredentials: true, // Include cookies in the request
//       headers: {
//         'Content-Type': 'application/json', // Specify content type
//         'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error creating profile:', error);
//     throw error; // Handle the error as needed
//   }
// }

// import axios from 'axios';

export async function createProfile(profile: Omit<IProfile, 'id'>) {
  console.log('axios post to /create, res: profile');
  
  try {
    const response = await axios.post(`${profilesUrl}/create`, profile, {
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

// export async function createProfile(profile: Omit<IProfile, 'id'>) {
//   console.log('axios post to /create, res: profile')
//   const response = await axios.post(`${profilesUrl}/create`, profile, 
    
//   );

//   // const response = await axios.post(`${profilesUrl}/create`, profile, 
//   // );

//   // the withCredentials: true here, gets me a CORS error

//   // const response = await axios.post(`${profilesUrl}/create`, profile, 
//   //   { withCredentials: true, AccessControlAllowOrigin: 'localhost:3000' },
//   // );

//   // ading acao from the frontend call (not a good idea)

//   // return new Response(response, {
//   //   headers: {
//   //     'Access-Control-Allow-Origin': 'localhost:3000'
//   //   }
//   // })
  
//   // return response;
// }

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


export async function addLike(like: Omit<ILike, 'id'>, accToken: string) {
  const response = await axios.post(`${likeUrl}/create`, like, {
    headers: { Authorization: `token ${accToken}` }
  });
  return response;
}
