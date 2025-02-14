import React from 'react';
import { Container, Row, Col, Card, Button, Badge, Dropdown } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';
// import { truncate } from '../utils/functions';
import ProfileAvatar from './ProfileAvatar';
import '../styles/Profiles.css'; // Import the CSS file
import { AuthContext, useAuth } from './Auth/Auth'
import { useContext } from 'react';
import { deleteProfile, SelectAsCurrent, SelectAsMain } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';

export function truncate(text: string, maxLength: number = 10): string {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}


const Profiles: React.FC<ProfilesProps> = ({ profiles }) => {

  // const { user } = useContext(AuthContext);
  const { user: authUser } = useContext(AuthContext);

  console.log('typeof profiles arg in Profiles Comp 3rd line: ', typeof(profiles));
  console.log('profiles arg in Profiles Comp 3rd line: ', profiles);

  const navigate = useNavigate();

  const handleDelete = async (profileId: any) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      // try {
      //   await deleteProfile(profileId); // Remove the deleted profile from the state 
      //   // setProfiles(profiles.filter(profile => profile.id !== profileId));
      // } catch (error) {
      //   console.error('Error deleting profile:', error);
      // }
      try {
          const response: AxiosResponse = await deleteProfile(profileId); // Remove the deleted profile from the state 
          const { redirectUrl } = response.data;
      
          if (redirectUrl) {
            // Use react-router-dom's useNavigate to redirect
            navigate(redirectUrl);
          }
        } catch (error) {
          console.error('Error creating profile:', error);
          // Handle error
        }
    }
  };

  const SelectMain = async (profileId: any) => {
    if (window.confirm('Are you sure you want to select this profile as your main profile?')) {
      // try {
      //   await deleteProfile(profileId); // Remove the deleted profile from the state 
      //   // setProfiles(profiles.filter(profile => profile.id !== profileId));
      // } catch (error) {
      //   console.error('Error deleting profile:', error);
      // }
      try {
          const response: AxiosResponse = await SelectAsMain(profileId); // Remove the deleted profile from the state 
          const { redirectUrl } = response.data;
      
          if (redirectUrl) {
            // Use react-router-dom's useNavigate to redirect
            navigate(redirectUrl);
          }
        } catch (error) {
          console.error('Error creating profile:', error);
          // Handle error
        }
    }
  };

  const SelectCurrent = async (profileId: any) => {
    if (window.confirm('Are you sure you want to select this profile to continue browsing with it as your current profile?')) {
      
      try {
          const response: AxiosResponse = await SelectAsCurrent(profileId); // Remove the deleted profile from the state 
          const { redirectUrl } = response.data;
      
          if (redirectUrl) {
            // Use react-router-dom's useNavigate to redirect
            navigate(redirectUrl);
          }
        } catch (error) {
          console.error('Error creating profile:', error);
          // Handle error
        }
    }
  };

  // Ensure profiles is an array before mapping 
  if (!Array.isArray(profiles)) { 
    console.log('params profiles is not an array');
    return null; // Or some fallback UI }
  } else {
    console.log('params profiles IS an array');
  }

  return (
    <Container className="py-5">
      <Row>
        
        {profiles.map(({ id, username, company, authorEmail, website, programmingLanguages, picture, user }, i) => (
          <Col key={i} md={6} lg={4} className="mb-4">
            <Card className="shadow-sm madeProfile4">
              <Card.Header className="card-header d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <ProfileAvatar url={picture?.avatarUrl} avatarName={truncate(user.name)} />
                  <div className="ms-3">
                    <Card.Title as="h5">{truncate(username + ' - ' + authorEmail)}</Card.Title>
                    <Card.Text>{truncate(company + ' - ' + website)}</Card.Text>
                  </div>
                </div>

                <Dropdown className="dropdown-container">
                  <Dropdown.Toggle as={Button} variant="link" className="text-muted p-0">
                    <BsThreeDotsVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">Edit</Dropdown.Item>
                    <Dropdown.Item href="#" onClick={() => SelectMain(id)}>Select as main</Dropdown.Item>
                    <Dropdown.Item href="#" onClick={() => SelectCurrent(id)}>Select as current</Dropdown.Item>
                    <Dropdown.Item href="#" onClick={() => handleDelete(id)}>Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Header>
              <Card.Body>
                <Card.Text>Profile description goes here</Card.Text>
                {programmingLanguages.map((value, index) => (
                  <Badge key={index} className="me-2">{value}</Badge>
                ))}
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <Button variant="primary" className="w-100">Follow</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Profiles;