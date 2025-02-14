import { AxiosResponse } from 'axios';
import moment from 'moment';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { addLike, getPost } from '../services/api';
import LikeButton from '../components/LikeButton';
import ProfileAvatar from '../components/ProfileAvatar';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';

// interface Props {
//   session: Session | null | undefined;
// }

// const PostDetailPage = ({ session }: Props) => {
  const PostDetailPage = () => {
  const [post, setPost] = useState<IPost>();
  const params = useParams();
  const { id } = params;

  const postAddLike = async (): Promise<AxiosResponse> => {
    const like: Omit<ILike, 'id'> = {
      postId: post?.id!,
      profileId: post?.profileId!
    };
    console.log(like);
    return await addLike(like);
  };

  const { isLoading: isPostingTutorial, mutate: postLike } = useMutation(postAddLike, {
    onSuccess(res) {
      alert('Liked.');
      refetch();
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const fetchPost = async (): Promise<AxiosResponse> => getPost(Number(id));

  const { data, error, isError, isLoading, refetch } = useQuery('post', fetchPost, {
    enabled: true,
    retry: 2,
    cacheTime: 0,
    onSuccess(res: any) {
      setPost(res.data);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  if (isLoading) {
    return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
  }

  if (isError) {
    return <Alert variant="danger">Error! {(error as Error).message}</Alert>;
  }

  function handleLikeCallback(): void {
    postLike();
  }

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Row className="w-100">
        <Col md={8} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-uppercase text-success">Blog</Card.Title>
              <Card.Title>{post?.title}</Card.Title>
              <Card.Text>{post?.content}</Card.Text>
              <Row className="mt-4 align-items-center">
                <Col xs="auto">
                  <ProfileAvatar url={post?.profile?.picture?.avatarUrl} avatarName={post?.profile?.authorEmail} />
                </Col>
                <Col>
                  <div className="fw-bold">{post?.profile?.authorEmail}</div>
                  <div className="text-muted">{moment(post?.createdAt).format('Do MMMM YYYY')}</div>
                </Col>
              </Row>
              <Row className="mt-4 justify-content-end">
                <Col xs="auto">
                  <LikeButton isDisabled={false} onClick={handleLikeCallback} likesCount={post?.likes?.length} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PostDetailPage;
