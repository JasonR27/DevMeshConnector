import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import moment from 'moment';
import { truncate } from '../utils/functions';
import { ReadmoreButton } from './ReadMoreButton';
import LikeButton from './LikeButton';
import ProfileAvatar from './ProfileAvatar';

interface Post {
  id: string;
  createdAt: string;
  title: string;
  content: string;
  profile: {
    authorEmail: string;
    picture: {
      avatarUrl: string;
    };
  };
  likes: any[];
}

interface PostsProps {
  posts: Post[];
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  return (
    <div className="bg-light py-5">
      <Container>
        {posts.map(({ id, createdAt, title, content, profile, likes }, i) => (
          <Row key={i} className="justify-content-center py-3">
            <Col md={8}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Text>{content}</Card.Text>
                  <hr />
                  <div className="d-flex align-items-center">
                    <ProfileAvatar url={profile?.picture?.avatarUrl} avatarName={truncate(profile.authorEmail)} />
                    <div className="ms-3">
                      <h6 className="mb-0">{profile.authorEmail}</h6>
                      <small className="text-muted">{moment(createdAt).format('Do MMMM YYYY')}</small>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mt-3">
                    <LikeButton isDisabled={true} likesCount={likes?.length} />
                    <ReadmoreButton postId={Number(id)} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default Posts;
