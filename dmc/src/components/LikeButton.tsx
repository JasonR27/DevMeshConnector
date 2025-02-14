import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { HiOutlineThumbUp } from 'react-icons/hi';
import { LIKE_BUTTON_TEXT } from '../utils/constants';
import './LikeButton.css';

interface LikeButtonProps {
  isDisabled: boolean;
  onClick?: () => void;
  likesCount?: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ isDisabled, onClick, likesCount }) => {
  return (
    <OverlayTrigger
      placement="left"
      overlay={<Tooltip id="tooltip-left">{LIKE_BUTTON_TEXT}</Tooltip>}
    >
      <div className="d-flex justify-content-end align-items-center">
        <span className="button__badge">{likesCount ? likesCount : 0}</span>
        <Button
          variant="outline-primary"
          disabled={isDisabled}
          aria-label="Like Button"
          onClick={onClick}
          className="d-flex align-items-center"
        >
          <HiOutlineThumbUp />
        </Button>
      </div>
    </OverlayTrigger>
  );
};

export default LikeButton;
