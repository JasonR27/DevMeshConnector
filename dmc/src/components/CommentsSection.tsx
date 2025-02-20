import React, { useState } from 'react';
import Comment from './Comment';
import SeeComments from './SeeComments';

interface CommentsSectionProps {
  comments: any[];
  onEdit?: (id: string, content: string) => void;
  onDelete?: (id: string) => void;
  onComment?: (id: string, content: string) => void;
  postLikeForComment?: (commentId: string) => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments }) => {
    const [isSeeCommentsVisible, setIsSeeCommentsVisible] = useState<{ [key: string]: boolean }>({});

    const handleToggleSeeComments = (commentId: string) => {
        setIsSeeCommentsVisible(prev => ({
          ...prev,
          [commentId]: !prev[commentId]
        }));    
      };

return (
    <div>
        {/* css {comments.length} */}
        {comments.map(comment => (
            <div key={comment.id} style={{ marginBottom: '20px', borderLeft: '2px solid #ccc', paddingLeft: '10px' }}>
                <Comment
                    key={comment.id}
                    comment={comment}
                    commentId={comment.id}
                />
                {/* <SeeComments isDisabled={false} commentsCount={6} onClick={() => handleToggleSeeComments(comment.id)} /> */}
                {/* {isSeeCommentsVisible[comment.id] && comment.comments && (
                    <div style={{ marginLeft: '20px', marginTop: '10px' }}>
                        <CommentsSection
                            comments={comment.comments}
                        />
                    </div>
                )} */}
            </div>
        ))}
        {/* cse {comments.length} */}
    </div>
);
};

export default CommentsSection;