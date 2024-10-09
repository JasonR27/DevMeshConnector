interface IUser {
  id: uuid;
  email?: string;
  username?: string;
  password: string;
  paswordHash?: string;
  name: string;
}

interface IPossibleUser {
  id?: uuid;
  email?: string;
  username?: string;
  password: string;
  paswordHash?: string;
}



interface IPost {
  id: uuid;
  title: string;
  content: string;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
  accToken?: string;
  profileId: number;
  profile?: IProfile;
  likes?: ILike[];
}

interface IPicture {
  id: uuid;
  profileId: number;
  avatarUrl: string;
  createdAt?: string;
  updatedAt?: string;
  accToken?: string;
}

interface ILike {
  id: number;
  profileId: number;
  postId: number;
  createdAt?: string;
  accToken?: string;
}

interface IProfile {
  id: uuid;
  userId: uuid;
  authorEmail: string;
  website: string;
  username: string;
  company: string;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
  isPublic?: boolean;
  picture?: IPicture;
  programmingLanguages: String[];
}


interface TodoProps {
  todo: IPost;
}

type ApiDataType = {
  token?: string;
  message: string;
  status: string;
  posts?: IPost[];
  todo?: IPost;
  profile?: IProfile
  picture?: IPicture
  profiles: IProfile[]
};

type GetPostsResponse = {
  posts: IPost[];
};

interface ProtectedRouteProps {
  children: ReactNode;
  signedIn: boolean;
}

interface ProfilePageProps {
  childToParent?: boolean;
}

interface ReadMoreButtonProps {
  postId: number;
}

interface ProfilesProps {
  profiles: IProfile[];
}


interface ImportMetaEnv {
  VITE_TESTBACKEND: any;
  readonly VITE_BACKEND_URL: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  // Add other variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}