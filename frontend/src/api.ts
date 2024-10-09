import axios, { AxiosError, AxiosResponse } from 'axios';

console.log("REACT_APP_TESTBACKEND: ", import.meta.env.VITE_TESTBACKEND)
console.log("VITE_BACKEND_URL: ", import.meta.env.VITE_BACKEND_URL)
 
const baseUrl: string = `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts`;
const profilesUrl: string = `${import.meta.env.VITE_BACKEND_URL}/api/v1/profiles`;
const pictureUrl: string = `${import.meta.env.VITE_BACKEND_URL}/api/v1/pictures`;
const likeUrl: string = `${import.meta.env.VITE_BACKEND_URL}/api/v1/likes`;
const usersUrl: string = `${import.meta.env.VITE_BACKEND_URL}/api/v1/users`;
const authUrl: string = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth`;

export const logInUser = async (user: IPossibleUser): Promise<AxiosResponse> => {
  const email = user.email;
  const password = user.password;
  try {
    const response: AxiosResponse<ApiDataType> = await axios.post(`${authUrl}/login/`, {email, password});
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    } else {
      throw new Error("Token is undefined");
    }
    // localStorage.setItem('token', response.data.token)

    return response;
  } catch (error: any) {
    throw new AxiosError(error);
  }
};

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

export async function createProfile(profile: Omit<IProfile, 'id'>) {
  console.log('axios post to /create, res: profile')
  const response = await axios.post(`${profilesUrl}/create`, profile);
  
  return response;
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

export async function addLike(like: Omit<ILike, 'id'>, accToken: string) {
  const response = await axios.post(`${likeUrl}/create`, like, {
    headers: { Authorization: `token ${accToken}` }
  });
  return response;
}
