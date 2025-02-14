// import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ParticlesComp from '../components/Particles';

const WelcomePage = () => {

  return (
    <div className="position-relative">
      <ParticlesComp />
      <div
        className="position-absolute top-0 start-0 p-2 border border-secondary d-flex flex-column justify-content-center align-items-center"
        // className="position-absolute top-0 start-0 bg-white p-2 border border-secondary" style={{ zIndex: 10 }}
        style={{
          
          width: '100%',
          height: '100vh',
          // backgroundImage: 'url(https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmhic3B6MGwxaDlud2Rsa3NkNmhmNHo2b2xsc2NmMm1vNHl3ZXBheCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jMbfmwkrcm82PRlYa9/giphy.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }}
      >
        <div className="container-fluid text-white text-center" style={{ background: 'linear-gradient(to right, rgba(120, 120, 60, 0.6), transparent)' }}>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <h1 className="display-4 font-weight-bold">DevMesh by JasonR27 (Initially based on DevConnector V4 from github daniellaera) 🚀</h1>
              <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-primary mx-2">Start connecting</button>
                <button className="btn btn-secondary mx-2">Explore profiles</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ div>
  )
}

export default WelcomePage