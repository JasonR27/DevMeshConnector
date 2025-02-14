import { createContext, useContext } from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface CreateMutations {
    registerUser: UseMutationResult<AxiosResponse<any, any>, Error, Omit<IUser, "id">, void>;
    createPost: UseMutationResult<AxiosResponse<any, any>, Error, Omit<IPost, 'id'>, void>;
}

interface VerifySensitiveDataMutations {
    logInUser: UseMutationResult<AxiosResponse<any, any>, Error, IPossibleUser, void>;
}


// define the type of the mutations context here // then move to types.d.ts
interface MutationsContextType {
    createMutations: CreateMutations;
    verifySensitiveDataMutations: VerifySensitiveDataMutations;
}

export const MutationsContext = createContext<MutationsContextType | undefined>(undefined);

export const useMutationsContext = () => {
    const context = useContext(MutationsContext);
    if (context === undefined) {
        throw new Error(Error.name);
    }
    return context;
};
