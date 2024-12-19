import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/about.css';
// import SignUp from 'reactsignUpCmp/SignUp'
const About = () => {
  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col lg={6}>
          <h1 className="display-4 mb-4">About Us</h1>
          <p className="lead">Building the future of digital innovation</p>
          <p>
            Founded in 2024, CompanyName has been at the forefront of digital
            transformation, helping businesses adapt and thrive in the digital age.
            Our commitment to excellence and innovation drives everything we do.
          </p>
          <p>
            We believe in creating lasting partnerships with our clients, understanding
            their unique challenges, and delivering solutions that exceed expectations.
          </p>
        </Col>
        <Col lg={6}>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
            alt="Team collaboration"
            className="img-fluid rounded about-image"
          />
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={4} className="mb-4">
          <div className="p-4 bg-light rounded">
            <h3>Our Mission</h3>
            <p>
              To empower businesses with innovative solutions that drive growth and
              success in the digital era.
            </p>
          </div>
        </Col>
        <Col md={4} className="mb-4">
          <div className="p-4 bg-light rounded">
            <h3>Our Vision</h3>
            <p>
              To be the leading force in digital transformation, setting new
              standards of excellence and innovation.
            </p>
          </div>
        </Col>
        <Col md={4} className="mb-4">
          <div className="p-4 bg-light rounded">
            <h3>Our Values</h3>
            <p>
              Innovation, integrity, excellence, and customer-centricity are the
              core values that guide our work.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default About;