import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';

const ProfilesActions: React.FC = () => {
  return (
    <Container fluid className="bg-dark py-3" style={{
      position: 'relative',
      top: 0,
      left: 0,
      zIndex: 13,
    }}>
      <Row className="">
        <Col>
          <Link to="/profiles/new">
            <Button variant="primary" size="sm" className="">
              <i className="bi bi-plus mr-2"></i>
              Add a Profile
            </Button>
          </Link>
          <Link to="/profiles/myprofiles">
            <Button variant="primary" size="sm" className="m-2">
              See my profiles
            </Button>
          </Link>
          <Link to="/profiles/mainprofile">
            <Button variant="primary" size="sm" className="m-2">
              Main Profile
            </Button>
          </Link>
          <Link to="/profiles/currentprofile">
            <Button variant="primary" size="sm" className="m-2">
              Current Profile
            </Button>
          </Link>
          <Link to="/users">
            <Button variant="primary" size="sm" className="m-2">
              Connections
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilesActions;
