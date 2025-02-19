// MutationsProvider.tsx

// import React, { createContext, useEffect } from 'react';
import React, { useEffect } from 'react';
import * as factories from './CRUDMutationsFactory';
import { MutationsContext, useMutationsContext } from '../context/MutationsContext';

export const MutationsProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {

  const createMutations = factories.CreateMutationsFactory();
  const verifySensitiveDataMutations = factories.VerifySensitiveDataFactory();
  const deleteMutations = factories.DeleteMutationsFactory();
  const updateMutations = factories.UpdateMutationsFactory();

  const useMutations = () => ({
    createMutations,
    verifySensitiveDataMutations,
    deleteMutations,
    updateMutations,
  });

  return (
    <MutationsContext.Provider value={useMutations()}>
      {children}
    </MutationsContext.Provider>
  );
};

export default MutationsProvider;