// create_mutations_factory.tsx

import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from './api';

export const CreateMutationsFactory = () => {
  const queryClient = useQueryClient(); // Use the query client only within this function scope

  return {
    registerUser: useMutation({
      mutationFn: (newUser: Omit<IUser, 'id'>) => api.createUser(newUser),
      onMutate: () => console.log("mutate"),
      onError: () => console.log("error"),
      onSuccess: () => console.log("success"),
      onSettled: async (_, error: Error) => {
        if (error) {
          console.log(error);
        } else {
          await queryClient.invalidateQueries({ queryKey: ["create_user"] });
        }
      },
    }),
    createProfile: useMutation({
      mutationFn: (newProfile: Omit<IProfile, 'id'>, mainOptions: boolean) => api.createProfile(newProfile, mainOptions),
      onMutate: () => console.log("mutate"),
      onError: () => console.log("error"),
      onSuccess: () => console.log("success"),
      onSettled: async (_, error: Error) => {
        if (error) {
          console.log(error);
        } else {
          await queryClient.invalidateQueries({ queryKey: ["create_profile"] });
        }
      },
    }),
    createPost: useMutation({
      mutationFn: (newPost: Omit<IPost, 'id'>) => api.createPost(newPost),
      onMutate: () => console.log("mutate"),
      onError: () => console.log("error"),
      onSuccess: () => console.log("success"),
      onSettled: async (_, error) => {
        if (error) {
          console.log(error);
        } else {
          await queryClient.invalidateQueries({ queryKey: ["create_post"] });
        }
      },
    }),
    createComment: useMutation({
      mutationFn: (postId: string, content: string) => api.addComment(postId, content),
      onMutate: () => console.log("mutate"),
      onError: () => console.log("error"),
      onSuccess: () => console.log("success"),
      onSettled: async (_, error) => {
        if (error) {
          console.log(error);
        } else {
          await queryClient.invalidateQueries({ queryKey: ["create_post"] });
        }
      },
    }),
    createCommentOnComment: useMutation({
      mutationFn: (commentId: string, content: string) => api.addCommentOnComment(commentId, content),
      onMutate: () => console.log("mutate"),
      onError: () => console.log("error"),
      onSuccess: () => console.log("success"),
      onSettled: async (_, error) => {
        if (error) {
          console.log(error);
        } else {
          await queryClient.invalidateQueries({ queryKey: ["create_post"] });
        }
      },
    }),
    createLike: useMutation({
      mutationFn: (postId: string) => api.addLike(postId),
      onMutate: () => console.log("mutate"),
      onError: () => console.log("error"),
      onSuccess: () => console.log("success"),
      onSettled: async (_, error: Error) => {
        if (error) {
          console.log(error);
        } else {
          await queryClient.invalidateQueries({ queryKey: ["create_like"] });
        }
      },
    }),
    createLikeForComment: useMutation({
      mutationFn: (commentId: string) => api.addLikeForComment(commentId),
      onMutate: () => console.log("mutate"),
      onError: () => console.log("error"),
      onSuccess: () => console.log("success"),
      onSettled: async (_, error: Error) => {
        if (error) {
          console.log(error);
        } else {
          await queryClient.invalidateQueries({ queryKey: ["comment_like"] });
        }
      },
    }),
  };
};

export const DeleteMutationsFactory = () => {
  const queryClient = useQueryClient(); // Use the query client only within this function scope

  return {
    // deleteUser: useMutation({
    //   mutationFn: (id: string) => api.deleteUser(id),
    //   onMutate: () => console.log("mutate"),
    //   onError: () => console.log("error"),
    //   onSuccess: () => console.log("success"),
    //   onSettled: async (_, error: Error) => {
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       await queryClient.invalidateQueries({ queryKey: ["delete_user"] });
    //     }
    //   },
    // }),
    deleteProfile: useMutation({
      mutationFn: (profileId: string) => api.deleteProfile(profileId),
      onMutate: () => console.log("mutate"),
      onError: () => console.log("error"),
      onSuccess: () => console.log("success"),
      onSettled: async (_, error) => {
        if (error) {
          console.log(error);
        } else {
          await queryClient.invalidateQueries({ queryKey: ["delete_profile"] });
        }
      },
    }),
    deletePost: useMutation({
      mutationFn: (postId: string) => api.deletePost(postId),
      onMutate: () => console.log("mutate"),
      onError: () => console.log("error"),
      onSuccess: () => console.log("success"),
      onSettled: async (_, error: Error) => {
        if (error) {
          console.log(error);
        } else {
          await queryClient.invalidateQueries({ queryKey: ["delete_post"] });
        }
      },
    }),
    deleteComment: useMutation({
      mutationFn: (commentId: string) => api.deleteComment(commentId),
      onMutate: () => console.log("mutate"),
      onError: () => console.log("error"),
      onSuccess: () => console.log("success"),
      onSettled: async (_, error: Error) => {
        if (error) {
          console.log(error);
        } else {
          await queryClient.invalidateQueries({ queryKey: ["delete_comment"] });
        }
      },
    }),
  };
};

export const UpdateMutationsFactory = () => {
  const queryClient = useQueryClient(); // Use the query client only within this function scope

  return {
    // updateUser: useMutation({
    //   mutationFn: (id: string) => api.updateUser(id),
    //   onMutate: () => console.log("mutate"),
    //   onError: () => console.log("error"),
    //   onSuccess: () => console.log("success"),
    //   onSettled: async (_, error: Error) => {
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       await queryClient.invalidateQueries({ queryKey: ["update_user"] });
    //     }
    //   },
    // }),
    // updateProfile: useMutation({
    //   mutationFn: (profileId: string) => api.editProfile(profileId),
    //   onMutate: () => console.log("mutate"),
    //   onError: () => console.log("error"),
    //   onSuccess: () => console.log("success"),
    //   onSettled: async (_, error) => {
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       await queryClient.invalidateQueries({ queryKey: ["update_profile"] });
    //     }
    //   },
    // }),
    updatePost: useMutation({
      mutationFn: (postId: string, content: string) => api.editPost(postId, content),
      onMutate: () => console.log("mutate"),
      onError: () => console.log("error"),
      onSuccess: () => console.log("success"),
      onSettled: async (_, error: Error) => {
        if (error) {
          console.log(error);
        } else {
          await queryClient.invalidateQueries({ queryKey: ["update_post"] });
        }
      },
    }),
    updateComment: useMutation({
      mutationFn: (commentId: string, content: string) => api.editComment(commentId, content),
      onMutate: () => console.log("mutate"),
      onError: () => console.log("error"),
      onSuccess: () => console.log("success"),
      onSettled: async (_, error: Error) => {
        if (error) {
          console.log(error);
        } else {
          await queryClient.invalidateQueries({ queryKey: ["delete_comment"] });
        }
      },
    }),
  };
};

export const VerifySensitiveDataFactory = () => {
  const queryClient = useQueryClient(); // Use the query client only within this function scope

  return {
    logInUser: useMutation({
      mutationFn: (user: IPossibleUser) => api.logInUser(user),
      onMutate: () => console.log("mutate"),
      onError: () => console.log("error"),
      onSuccess: () => console.log("success"),
      onSettled: async (_, error) => {
        if (error) {
          console.log(error);
        } else {
          await queryClient.invalidateQueries({ queryKey: ["user_log_in"] });
        }
      },
    }),
  };
};