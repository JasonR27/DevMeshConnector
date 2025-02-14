import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from './api';


// export const useRegisterUser = (newUser: Omit<IUser, 'id'>) => {
export const CreateMutationsFactory = () => {

  const queryClient = useQueryClient(); // Use the query client only within this function scope

  return {
    registerUser: useMutation({
      mutationFn: (newUser: Omit<IUser, 'id'>) => api.createUser(newUser),
      
      onMutate: () => {
        console.log("mutate");
      },
  
      onError: () => {
        console.log("error");
      },
  
      onSuccess: () => {
        console.log("success"); 
      },
  
      onSettled: async (_, error) => {
        console.log("settled");
        if (error) {
          console.log(error);
        } else {
          await queryClient.invalidateQueries({ queryKey: ["create_user"] });
        }
      },
    }),

    createPost: useMutation({
      mutationFn: (newPost: { title: string; content: string }) => api.createPost(newPost),
      
      onMutate: () => {
        console.log("mutate");
      },
  
      onError: () => {
        console.log("error");
      },
  
      onSuccess: () => {
        console.log("success"); 
      },
  
      onSettled: async (_, error) => {
        console.log("settled");
        if (error) {
          console.log(error);
        } else {
          await queryClient.invalidateQueries({ queryKey: ["create_post"] });
        }
      },
    }),
  };
  
}


export const VerifySensitiveDataFactory = () => {

  const queryClient = useQueryClient(); // Use the query client only within this function scope

  return {
    logInUser: useMutation({
      mutationFn: (user: IPossibleUser) => api.logInUser(user),
      
      onMutate: () => {
        console.log("mutate");
      },
  
      onError: () => {
        console.log("error");
      },
  
      onSuccess: () => {
        console.log("success"); 
      },
  
      onSettled: async (_, error) => {
        console.log("settled");
        if (error) {
          console.log(error);
        } else {
          await queryClient.invalidateQueries({ queryKey: ["user_log_in"] });
        }
      },
    }),
  };
}

export const useMutations = CreateMutationsFactory();
// You can add more mutations here...
