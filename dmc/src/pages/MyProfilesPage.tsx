import React, { useEffect, useState, useContext } from "react";
import { getProfilesByUser } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import Profiles from "../components/Profiles";
import { Spinner, Alert, Container } from "react-bootstrap";
import { getProfilesByUserQuery } from "../services/queries";



const MyProfilesPage: React.FC = () => {
  const [profiles, setProfiles] = useState<IProfile[]>([]);
  // console.log('React contxt user on myprofiles: ', user);
  // let profilesData: IProfile[];

  const { data: profilesData, isError, error, isPending } = getProfilesByUserQuery();

  useEffect(() => {
    if (profilesData) {
      setProfiles(profilesData);
    }
  }, [profilesData]);

  // if (isPending) {
  //   return <p>Loading profiles...</p>;
  // }

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
  //   return <p>Error loading profiles: {error.message}</p>;
  // }

  if (isError) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Alert variant="danger">
          Error! {(error as Error).message}
        </Alert>
      </Container>
    );
  }
 

  return (
    <Container>
      {isPending && <p>Loading profiles...</p>}
      {error && <p>{(error as Error).message}</p>}
      {profiles && <Profiles profiles={profiles} />}
    </Container>
  );
};

export default MyProfilesPage;
