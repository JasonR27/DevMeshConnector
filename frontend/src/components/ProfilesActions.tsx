import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';

const ProfilesActions: React.FC = () => {
  return (
    <Container fluid className="bg-dark py-3">
      <Row className="align-items-center justify-content-between">
        <Col>
          <Link to="/profiles/new">
            <Button variant="primary" size="sm" className="d-flex align-items-center">
              <i className="bi bi-plus mr-2"></i>
              Add a Profile
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilesActions;
