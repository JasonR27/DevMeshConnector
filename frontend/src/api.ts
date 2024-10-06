import axios, { AxiosError, AxiosResponse } from 'axios';

console.log("process.env.REACT_APP_BACKEND_URL: ", process.env.REACT_APP_BACKEND_URL)
console.log("process.env: ", process.env)
console.log("process.env.REACT_APP_SUPABASE_URL: ", process.env.REACT_APP_SUPABASE_URL)
console.log("TESTFRONTEND: ", process.env.TESTFRONTEND)
console.log("TESTBACKEND: ", process.env.TESTBACKEND)
console.log("REACT_APP_TESTFRONTEND: ", process.env.REACT_APP_TESTFRONTEND)
console.log("REACT_APP_TESTBACKEND: ", process.env.REACT_APP_TESTBACKEND)
const baseUrl: string = `${process.env.REACT_APP_BACKEND_URL}/api/v1/posts`;
const profilesUrl: string = `${process.env.REACT_APP_BACKEND_URL}/api/v1/profiles`;
const pictureUrl: string = `${process.env.REACT_APP_BACKEND_URL}/api/v1/pictures`;
const likeUrl: string = `${process.env.REACT_APP_BACKEND_URL}/api/v1/likes`;

// export async function getProfiles() {
//   const { data } = await axios.get(profilesUrl);
//   return data;
// }

// export async function getProfiles(): Promise<IProfile[]> {
//   const { data: IProfile } = await axios.get<IProfile[]>(profilesUrl);
//   return data;
// }

export async function getProfiles(): Promise<IProfile[]> {
  const response = await axios.get<IProfile[]>(profilesUrl);
  const data: IProfile[] = response.data;
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

export async function createProfile(profile: Omit<IProfile, 'id'>) {
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
