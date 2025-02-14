import React from 'react';
import { Container, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import ProfileAvatar from '../components/ProfileAvatar';
import '../styles/ProfilePageOwnerView.css'; // Import the CSS file
import { AuthContext } from '../components/Auth/Auth';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Posts from '../components/Posts';
import ProfilePostsPage from './ProfilePostsPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


export function truncate(text: string, maxLength: number = 10): string {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

const ProfilePageOwnerView: React.FC = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [postCount, setPostCount] = useState(0);

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
            <h3 className="text-white"><i className="bi bi-house-fill"></i></h3>
          </a>
          <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
            <li className="nav-item">
              <OverlayTrigger placement="right" overlay={renderTooltip} data-bs-original-title="Home">
                <a href="#" className="nav-link py-3 border-bottom" aria-current="page" title="">
                <h3><i className="bi bi-search"></i></h3>
            
                </a>
              </OverlayTrigger>
            </li>
            <li className="nav-item">
              <OverlayTrigger placement="right" overlay={renderTooltip} data-bs-original-title="Dashboard">
                <a href="#" className="nav-link py-3 border-bottom" title="">
            
                  <h3><i className="bi bi-chat-dots"></i></h3>
                </a>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="right" overlay={renderTooltip} data-bs-original-title="Orders">
                <a href="#" className="nav-link py-3 border-bottom" title="">
            
                  <h3><i className="bi bi-graph-up"></i></h3>
                </a>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="right" overlay={renderTooltip} data-bs-original-title="Orders">
                <a href="#" className="nav-link py-3 border-bottom" title="">
            
                  <h3><i className="bi bi-people"></i></h3>
                </a>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="right" overlay={renderTooltip} data-bs-original-title="Orders">
                <a href="#" className="nav-link py-3 border-bottom" title="">
            
                  <h3><i className="bi bi-handbag-fill"></i></h3>
                </a>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="right" overlay={renderTooltip} data-bs-original-title="Products">
                <a href="#" className="nav-link py-3 border-bottom" title="">
            
                  <h3><i className="bi bi-github"></i></h3>
                </a>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="right" overlay={renderTooltip} data-bs-original-title="Customers">
                <a href="#" className="nav-link py-3 border-bottom" title="">
            
                  <h3><i className="bi bi-google-play"></i></h3>
                </a>
              </OverlayTrigger>
            </li>
          </ul>
          <div className="dropdown border-top">
            <a href="#" className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://w7.pngwing.com/pngs/361/694/png-transparent-light-circle-geometry-science-and-technology-blue-mechanical-blue-angle-electronics.png" alt="mdo" width="24" height="24" className="rounded-circle" />
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

        <Col className="offset-md-1 position-relative" style={{ marginLeft: '5rem' }}>
          <div className="profile-container">
            <header className="profile-header">
              <img src="profile-pic.jpg" alt="Profile Picture" className="profile-pic" />
              <h1 className="username">Username</h1>
              <p className="bio">This is a short bio.</p>
            
            </header>
            <nav className="profile-nav">
              <ul>
                <li>Posts</li>
                <li>Followers</li>
                <li>Following</li>
              </ul>
            </nav>
            <section>
              <ProfilePostsPage /> 
            </section>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePageOwnerView;