import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const PostActions: React.FC = () => {
  return (
    <Container fluid className="bg-dark py-2">
      <Row className="align-items-center justify-content-between">
        <Col>
          <Link to="/post/new">
            <Button variant="primary" size="sm" className="d-flex align-items-center">
              <FaPlus className="mr-2" />
              Add Post
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default PostActions;
