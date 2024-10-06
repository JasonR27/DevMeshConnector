import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <Container className="text-center py-5">
      <Row>
        <Col>
          <h2 className="display-2" style={{ background: 'linear-gradient(to right, #38b2ac, #319795)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            404
          </h2>
          <p className="h5 mt-3 mb-2">Page Not Found</p>
          <p className="text-muted mb-4">The page you're looking for does not seem to exist</p>
          <Link to="/">
            <Button variant="primary" style={{ background: 'linear-gradient(to right, #38b2ac, #319795)', borderColor: '#319795' }}>
              Go to Home
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
