// MutationsProvider.tsx

// import React, { createContext, useEffect } from 'react';
import React, { useEffect } from 'react';
import { CreateMutationsFactory, VerifySensitiveDataFactory } from './CRUDMutationsFactory';
import { MutationsContext, useMutationsContext } from './MutationsContext';

export const MutationsProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {

  const createMutations = CreateMutationsFactory();
  const verifySensitiveDataMutations = VerifySensitiveDataFactory();

  useEffect(() => {
    // Ensure that the mutations are available in the context
    return () => {
    //   createMutations.registerUser.mutate;
    //   createMutations.createPost.mutate;
    //   verifySensitiveDataMutations.logInUser.mutate;
    };
  }, []);

//   const useMutations = () => ({
//     ...createMutations,
//     ...verifySensitiveDataMutations,
//   });

  const useMutations = () => ({
    createMutations,
    verifySensitiveDataMutations,
  });

  return (
    <MutationsContext.Provider value={useMutations()}>
      {children}
    </MutationsContext.Provider>
  );
};

export default MutationsProvider;