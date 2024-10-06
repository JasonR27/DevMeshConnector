import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface ReadMoreButtonProps {
  postId: number;
}

export const ReadmoreButton: React.FC<ReadMoreButtonProps> = ({ postId }) => {
  return (
    <Link to={postId.toString()}>
      <Stack direction="horizontal" className="justify-content-end" gap={3}>
        <div>
          <Button
            className="flex-grow-1 rounded-md"
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              boxShadow: '0px 1px 25px -5px rgba(66, 153, 225, 0.48), 0 10px 10px -5px rgba(66, 153, 225, 0.43)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0056b3';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0px 1px 25px -5px rgba(66, 153, 225, 0.48), 0 10px 10px -5px rgba(66, 153, 225, 0.43)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#007bff';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0px 1px 25px -5px rgba(66, 153, 225, 0.48), 0 10px 10px -5px rgba(66, 153, 225, 0.43)';
            }}
            onFocus={(e) => {
              e.currentTarget.style.backgroundColor = '#007bff';
            }}
          >
            Read More
          </Button>
        </div>
      </Stack>
    </Link>
  );
};
