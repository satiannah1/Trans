import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import backgroundImage from './tr2.png';
import Log from './login.jsx';
import {Link} from 'react-router-dom'

const Trans = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleClickLogin = () => {
    setShowLoginModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  return (
    <div style={{ backgroundImage: `)`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <div className="bg-dark py-5 text-white text-center">
        <div className="container">
          <h1 className="font-effect-emboss mb-4">Trans</h1>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ minHeight: '60px' }}>
        <div className="container">
          <a className="navbar-brand" href="#">Trans</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/driver" ><a className="nav-link" href="#">HOME</a></Link>
              </li>
              <li className="nav-item">
               <Link to="/register"> <a className="nav-link" href="">REGISTER</a></Link>
              </li>
              <li className="nav-item">
              <Link to=""> <a className="nav-link" href="#">SERVICES</a></Link>

              </li>
            </ul>
          </div>

          <Link to="/login"><button onClick={handleClickLogin} className="btn btn-outline-light">Login</button> </Link>
        </div>
      </nav>

      <section className="my-5">
        <div className="container">
          <form id="searchForm">
            <div className="input-group">
              <input type="search" className="form-control" id="searchInput" placeholder="Search..." aria-label="Search" aria-describedby="button-addon2" />
              <div className="input-group-append">
                <button className="btn btn-success" type="submit" id="searchButton"><i className="fa fa-search"></i></button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section className="bg-dark text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2 text-center">
              <h2>About Us</h2>
              <p>This is an iconic website for transferring goods, people, warehousing, and cargo tracking.</p>
              <p>For more info, call: <strong>0788888800</strong></p>
            </div>
          </div>
        </div>
      </section>

      {showLoginModal && (
        <div className="modal show fade" style={{ display: 'block' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login</h5>
                <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <Log onClose={handleCloseModal} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trans;
