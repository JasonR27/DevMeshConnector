import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';

const UserActions: React.FC = () => {
  return (
    <Container fluid className="bg-black py-3">
      <Row className="">
        <Col>
          <Link to="/profiles/new">
            <Button variant="primary" size="sm" className="">
              <i className="bi bi-plus mr-2"></i>
              Add a Profile
            </Button>
          </Link>
          <Link to="/profiles/myprofiles">
            <Button variant="primary" size="sm" className="m-2">
              See my profiles
            </Button>
          </Link>
          <Link to="/profiles/mainprofile">
            <Button variant="primary" size="sm" className="m-2">
              Main Profile
            </Button>
          </Link>
          <Link to="/profiles/currentprofile">
            <Button variant="primary" size="sm" className="m-2">
              Current Profile
            </Button>
          </Link>
          <Link to="/users">
            <Button variant="primary" size="sm" className="m-2">
              Connections
            </Button>
          </Link>
        </Col>
      </Row>
      {/* <h1 className='text-white position-absolute'>Here are the main profiles of every user</h1> */}
    </Container>
  );
};

export default UserActions;

// another version

// import React from 'react';
// import './UserActions.css';

// const UserActions = () => {
//   return (
//     <div className="user-actions-container">
//       <h1 className="user-actions-title">User Actions</h1>
//       <div className="actions">
//         {/* Add your actions here */}
//       </div>
//     </div>
//   );
// };

// export default UserActions;

