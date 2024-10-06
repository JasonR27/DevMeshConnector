import React from 'react';
import { Container, Row, Col, Card, Button, Badge, Dropdown } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { truncate } from '../utils/functions';
import ProfileAvatar from './ProfileAvatar';

const Profiles: React.FC<ProfilesProps> = ({ profiles }) => {
  return (
    <Container className="py-5">
      <Row>
        {profiles.map(({ username, company, authorEmail, website, programmingLanguages, picture }, i) => (
          <Col key={i} md={6} lg={4} className="mb-4">
            <Card className="shadow-sm">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <ProfileAvatar url={picture?.avatarUrl} avatarName={truncate(authorEmail)} />
                  <div className="ms-3">
                    <Card.Title as="h5">{username} - {authorEmail}</Card.Title>
                    <Card.Text>{company} - {website}</Card.Text>
                  </div>
                </div>
                <Dropdown>
                  <Dropdown.Toggle as={Button} variant="link" className="text-muted p-0">
                    <BsThreeDotsVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">Action</Dropdown.Item>
                    <Dropdown.Item href="#">Another action</Dropdown.Item>
                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Header>
              <Card.Body>
                <Card.Text>Profile description goes here</Card.Text>
                {programmingLanguages.map((value, index) => (
                  <Badge key={index} className="me-2">{value.language}</Badge>
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
