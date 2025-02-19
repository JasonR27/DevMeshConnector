import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaComment } from "react-icons/fa";
import { SEE_COMMENTS } from '../utils/constants';
import './LikeButton.css';

interface SeeCommentsProps {
  isDisabled: boolean;
  onClick?: () => void;
  commentsCount?: number;
}

const SeeComments: React.FC<SeeCommentsProps> = ({ isDisabled, onClick, commentsCount }) => {
  return (
    <OverlayTrigger
      placement="left"
      overlay={<Tooltip id="tooltip-left">{SEE_COMMENTS}</Tooltip>}
    >
      <div className="d-flex justify-content-end align-items-center">
        <span className="button__badge">{commentsCount ? commentsCount : 0}</span>
        <Button
          variant="outline-primary"
          disabled={isDisabled}
          aria-label="See Comments"
          onClick={onClick}
          className="d-flex align-items-center"
        >
          <FaComment />
        </Button>
      </div>
    </OverlayTrigger>
  );
};

export default SeeComments;