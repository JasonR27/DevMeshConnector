import React, { useEffect, useState, useContext } from "react";
import { getMainProfileByAuthorEmail } from "../api";
import { useQuery } from "react-query";
import Profiles from "../components/Profiles";
import { Spinner, Alert, Container } from "react-bootstrap";
import { AuthContext, useAuth } from '../components/Auth/Auth'


const MainProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<IProfile[]>();
  const { user } = useContext(AuthContext);
  console.log('React context user on mainprofile.tsx: ', user);
  console.log('React context user email on mainprofile.tsx: ', user?.email);
  // console.log('not printing')

  const fetchProfile = async (): Promise<IProfile[]> => {
    console.log('React context user email on fetchProfile on mainprofile.tsx: ', user?.email);
    const res: IProfile[] = await getMainProfileByAuthorEmail(user?.email);
    return res;
  };
  

  const { data: profileData, error, isError, isLoading } = useQuery<IProfile[]>(
    "profile",
    fetchProfile,
    {
      enabled: true,
      retry: 2,
      cacheTime: 0,
      onSuccess: (res: any) => {
        //console.log(res)
      },
      onError: (error: any) => {
        console.log(error);
      },
      //initialData: () => []
    }
  );

  useEffect(() => {
    if (profileData) {
      setProfile(profileData);
    }
  }, [profileData]);

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Alert variant="danger">
          Error! {(error as Error).message}
        </Alert>
      </Container>
    );
  }
  
  console.log('Main profile data: ', profile);

  return (
    <Container>
      {isLoading && <p>Loading profiles...</p>}
      {error && <p>{(error as Error).message}</p>}
      {!error && profile && <Profiles profiles={profile} />}
    </Container>
  );
};

export default MainProfilePage;
