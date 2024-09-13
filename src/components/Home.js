import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link as ScrollLink, Element } from 'react-scroll';
import { motion } from 'framer-motion';
import '../css/Home.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div>
  
      <div className="hero-section">
      <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <motion.h1
                className="hero-title"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                Build Your Future With TECH AI
              </motion.h1>
              <motion.p
                className="hero-text"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                Pioneering the future with cutting-edge artificial intelligence solutions.
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.3 }}
              >
                <ScrollLink to="contact-section" smooth={true} duration={500}>
                  <Button variant="primary" className="hero-button">Take a step !</Button>
                </ScrollLink>
              </motion.div>
            </Col>
            <Col md={6} className="d-flex justify-content-center align-items-center">
              <motion.div
                className="hero-image-container"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >

                <div>
                
                </div>
                <a href="/services" className="hero-image-text"> 
                  What's on your mind?
                </a>
                           
              </motion.div>
              <motion.div
                className="hero-prompt"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                
              </motion.div>
            </Col>
          </Row>
        </Container> 
      </div>

    
    

    </div>
  );
};

export default Home;
