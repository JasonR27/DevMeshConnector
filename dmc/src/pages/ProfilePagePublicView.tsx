import React from 'react';
import { Container, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';
import ProfileAvatar from '../components/ProfileAvatar';
import '../styles/ProfilePageOwnerView.css'; // Import the CSS file
import { AuthContext } from '../components/Auth/Auth';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export function truncate(text: string, maxLength: number = 10): string {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

const ProfilePageOwnerView: React.FC = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {props['data-bs-original-title']}
    </Tooltip>
  );

  return (
    <Container fluid>
      <Row>
        <Col xs="auto" className="d-flex flex-column flex-shrink-0 bg-black" style={{ width: '4.5rem', height: '80vh', position: 'fixed', bottom: 0 }}>
          <a href="/" className="d-block p-3 link-dark text-decoration-none" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
            <svg className="bi" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
            <span className="visually-hidden">Icon-only</span>
          </a>
          <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
            <li className="nav-item">
              <OverlayTrigger placement="right" overlay={renderTooltip} data-bs-original-title="Home">
                <a href="#" className="nav-link active py-3 border-bottom" aria-current="page" title="">
                  <svg className="bi" width="24" height="24" role="img" aria-label="Home"><use xlinkHref="#home"></use></svg>
                </a>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="right" overlay={renderTooltip} data-bs-original-title="Dashboard">
                <a href="#" className="nav-link py-3 border-bottom" title="">
                  <svg className="bi" width="24" height="24" role="img" aria-label="Dashboard"><use xlinkHref="#speedometer2"></use></svg>
                </a>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="right" overlay={renderTooltip} data-bs-original-title="Orders">
                <a href="#" className="nav-link py-3 border-bottom" title="">
                  <svg className="bi" width="24" height="24" role="img" aria-label="Orders"><use xlinkHref="#table"></use></svg>
                </a>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="right" overlay={renderTooltip} data-bs-original-title="Products">
                <a href="#" className="nav-link py-3 border-bottom" title="">
                  <svg className="bi" width="24" height="24" role="img" aria-label="Products"><use xlinkHref="#grid"></use></svg>
                </a>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="right" overlay={renderTooltip} data-bs-original-title="Customers">
                <a href="#" className="nav-link py-3 border-bottom" title="">
                  <svg className="bi" width="24" height="24" role="img" aria-label="Customers"><use xlinkHref="#people-circle"></use></svg>
                </a>
              </OverlayTrigger>
            </li>
          </ul>
          <div className="dropdown border-top">
            <a href="#" className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://github.com/mdo.png" alt="mdo" width="24" height="24" className="rounded-circle" />
            </a>
            <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
              <li><a className="dropdown-item" href="#">New project...</a></li>
              <li><a className="dropdown-item" href="#">Settings</a></li>
              <li><a className="dropdown-item" href="#">Profile</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Sign out</a></li>
            </ul>
          </div>
        </Col>

        <Col className="offset-md-1" style={{ marginLeft: '5rem' }}>
          <div className="profile-container">
            <header className="profile-header">
              <img src="profile-pic.jpg" alt="Profile Picture" className="profile-pic" />
              <h1 className="username">Username</h1>
              <p className="bio">This is a short bio about the user.</p>
              <button className="follow-button">Follow</button>
            </header>
            <nav className="profile-nav">
              <ul>
                <li>Posts</li>
                <li>Followers</li>
                <li>Following</li>
              </ul>
            </nav>
            <section className="posts">
              <h2>Posts</h2>
              <div className="post">
                <p>This is a sample post content.</p>
              </div>
              <div className="post">
                <p>This is a sample post content.</p>
              </div>
              <div className="post">
                <p>This is a sample post content.</p>
              </div>
              <div className="post">
                <p>This is a sample post content.</p>
              </div>
              <div className="post">
                <p>This is a sample post content.</p>
              </div>
              <div className="post">
                <p>This is a sample post content.</p>
              </div>
              <div className="post">
                <p>This is a sample post content.</p>
              </div>
              <div className="post">
                <p>This is a sample post content.</p>
              </div>
              <div className="post">
                <p>This is a sample post content.</p>
              </div>
              <div className="post">
                <p>This is another sample post content.</p>
              </div>
            </section>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePageOwnerView;

