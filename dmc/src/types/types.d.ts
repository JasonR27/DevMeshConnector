// interface CommentData {

//   comment?: {

//       id: string;

//       postId?: string;

//       commentId?: string;

//       userId: string;

//       createdAt: Date;

//       updatedAt?: Date;

//       comments?: CommentData[];

//       profileName?: string;

//       content?: string;

//       img?: string;

//       audio?: string;

//       file?: string;

//       commentHierarchy?: CommentData;

//       user?: string;

//       likes?: any[];

//   };
// }

// interface Post {
//   id: string;
//   createdAt: string;
//   title: string;
//   content: string;
//   profile: {
//     authorEmail: string;
//     picture: {
//       avatarUrl: string;
//     };
//   };

// }

// interface PostsProps {
//   posts: Post[];
// }

interface SettingsProps {
   userName: string;
   theme: string;
}

interface IPost {
  id: uuid;
  title: string;
  content: string;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
  accToken?: string;
  profileId?: number;
  profileName?: string;
  profile?: IProfile;
  likes?: ILike[];
  comments?: CommentProps[];
}

interface IUser {
  id: uuid;
  email?: string;
  username?: string;
  password: string;
  paswordHash?: string;
  name: string;
  session?: string;
}

interface IPossibleUser {
  id?: uuid;
  email?: string;
  username?: string;
  password: string;
  paswordHash?: string;
}

interface AuthContextType {
  user: IUser | null | undefined;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  login: (user: IPossibleUser) => Promise<AxiosResponse<IUser>>;
}

interface IComment {
  
  id?: string;

  postId?: string;

  commentId?: string;

  userId?: string;

  createdAt?: Date;

  updatedAt?: Date;

  comments?: CommentProps[];

  profileName?: string;

  content?: string;

  img?: string;

  audio?: string;

  file?: string;

  commentHierarchy?: CommentProps;

  user?: string;

  likes?: ILike[];

}

interface CommentProps {

  comment?: IComment;

  commentId?: string;

  onEdit?: (commentId: string, content: string) => void;
  onDelete?: (commentId: string) => Promise<void>;
  onComment?: (commentId: string, content: string) => void;
  postLikeForComment?: (commentId: string) => void;

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
  id: string;
  profileId: string;
  userId: string;
  post?: IPost;
  comment?: CommentProps;
  commentId?: string;
  postId?: string;
  profile: IProfile;
  user: IUser;
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
  programmingLanguages: string[];
  mainOptions?: boolean;
  user: User?;
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
  // signedIn?: boolean;
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
  [x: string]: string;
  VITE_TESTBACKEND: unknown;
  readonly VITE_BACKEND_URL: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  // Add other variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// interface ToastProps {
//   show: boolean;
//   onClose: () => void;
//   title: string;
//   message: string;
//   variant: 'success' | 'danger' | 'warning' | 'info';
// }

type ToastVariant = 'success' | 'warning' | 'danger' | 'info';

interface ToastMessage {
  title: string;
  message: string;
  variant: ToastVariant;
}