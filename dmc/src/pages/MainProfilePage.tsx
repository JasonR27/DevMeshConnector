import React, { useEffect, useState, useContext } from "react";
import { getMainProfile } from "../services/api";
// import { useQuery } from "@tanstack/react-query";
import Profiles from "../components/Profiles";
import { Spinner, Alert, Container } from "react-bootstrap";
import { AuthContext, useAuth } from '../context/Auth'
import { getMainProfileQuery } from "../services/queries";


const MainProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<IProfile[]>();
  const { user } = useContext(AuthContext);

  console.log('React context user on mainprofile.tsx: ', user);
  console.log('React context user email on mainprofile.tsx: ', user?.email);  
  
  const { data: profileData, error, isPending } = getMainProfileQuery(); 

  useEffect(() => {
    if (profileData) {
      console.log(profileData)
      setProfile(profileData);
    } else {
      console.log('no main profile data')
    }
  }, [profileData]);

  if (isPending) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  // if (isError) {
  //   return (
  //     <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
  //       <Alert variant="danger">
  //         Error! {(error as Error).message}
  //       </Alert>
  //     </Container>
  //   );
  // }
  
  console.log('Main profile data: ', profile);

  return (
    <Container>
      {isPending && <p>Loading profiles...</p>}
      {error && <p>{(error as Error).message}</p>}
      {!error && profile && <Profiles profiles={profile} />}
    </Container>
  );
};

export default MainProfilePage;
