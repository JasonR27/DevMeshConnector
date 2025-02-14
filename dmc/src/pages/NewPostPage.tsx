// import React from 'react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseClient } from '../config/supabase-client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { createPost } from '../services/api';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';


function NewPostPage() {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [state, setState] = useState<'initial' | 'submitting' | 'success'>('initial');
  const navigate = useNavigate()

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="p-4 bg-white shadow rounded">
            <h2 className="text-center mb-4">What do you have in mind?</h2>
            <Form onSubmit={async (e: FormEvent) => {
              e.preventDefault();
              // ... your form submission logic
            }}>
              <Form.Group controlId="postTitle">
                <Form.Control
                  type="text"
                  placeholder="Your title here"
                  value={postTitle}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPostTitle(e.target.value)}
                  disabled={state !== 'initial' && state !== 'success'}
                  required
                />
              </Form.Group>
              <Form.Group controlId="postContent" className="mt-3">
                <Form.Control
                  type="text"
                  placeholder="Your content here"
                  value={postContent}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPostContent(e.target.value)}
                  disabled={state !== 'initial' && state !== 'success'}
                  required
                />
              </Form.Group>
              <Button
                variant={state === 'success' ? 'success' : 'primary'}
                type={state === 'success' ? 'button' : 'submit'}
                // onClick={postData}
                className="mt-4 w-100"
                disabled={state === 'submitting'}
              >
                {state === 'success' ? <i className="bi bi-check mr-2"></i> : 'Submit'}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default NewPostPage;
