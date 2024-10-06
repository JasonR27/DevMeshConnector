interface IPost {
  id: number;
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

interface IProgrammingLanguage {
  name: ReactNode;
  createdAt?: string;
  id: number;
  language: string;
  profileId: number;
  color?: string;
}

interface IPicture {
  id: number;
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
  programmingLanguages: IProgrammingLanguage[];
}

interface TodoProps {
  todo: IPost;
}

type ApiDataType = {
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

interface Profile {
  username: string;
  company: string;
  authorEmail: string;
  website: string;
  programmingLanguages: { language: string }[];
  picture: { avatarUrl: string };
}

interface ProfilesProps {
  profiles: IProfile[];
}


