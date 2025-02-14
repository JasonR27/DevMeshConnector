
import React, { useEffect, useState } from "react";
import Profiles from "../components/Profiles";
import { Spinner, Alert, Container } from "react-bootstrap";
import { getCurrentProfileQuery } from "../services/queries";

const CurrentProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<IProfile[]>();

  const { data: profileData, isError, error, isPending } = getCurrentProfileQuery(); 

  useEffect(() => {
    if (profileData) {
      setProfile(profileData);
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
      {isPending && <p>Loading profiles...</p>}
      {error && <p>{(error as Error).message}</p>}
      {!error && profile && <Profiles profiles={profile} />}
    </Container>
  );
};

export default CurrentProfilePage;
