import React, { useEffect, useState } from "react";
import { getProfiles } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import Users from "../components/Users";
import { Spinner, Alert, Container } from "react-bootstrap";

const UsersPage: React.FC = () => {
  const [profiles, setProfiles] = useState<IProfile[]>();

  const fetchProfiles = async (): Promise<IProfile[]> => {
    const res: IProfile[] = await getProfiles();
    return res;
  };


  const { data: profilesData, error, isError, isLoading } = useQuery<IProfile[]>(
    "profiles",
    fetchProfiles,{
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
    if (profilesData) {
      setProfiles(profilesData);
    }
  }, [profilesData]);

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

  return (
    <Container>
      <h1 className='text-white position-absolute'>Here are the main profiles of every user</h1>
      {isLoading && <p>Loading profiles...</p>}
      {error && <p>{(error as Error).message}</p>}
      {!error && profiles && <Users profiles={profiles} />}
    </Container>
  );
};

export default UsersPage;
