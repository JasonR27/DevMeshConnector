import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';

const ProfilesActions: React.FC = () => {
  return (
    <Container fluid className="bg-dark py-3">
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
        </Col>
        {/* <Col>
          <Link to="/myprofiles">
            <Button variant="primary" size="sm" className="">
              See my profiles
            </Button>
          </Link>
        </Col> */}
      </Row>
    </Container>
  );
};

export default ProfilesActions;
