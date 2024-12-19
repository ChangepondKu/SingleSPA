import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ArrowRight, Award, Users, Target } from 'lucide-react';
import '../styles/homepage.css'
import { useSelector } from 'react-redux';


const HomePage = () => {

  const userdata = useSelector(state => state.user);
  console.log(userdata)

  return (
    <>
      <div className="hero-section text-light d-flex align-items-center">
        <Container>
          <Row>
            <Col md={8} className="mx-auto text-center">
              <h1 className="display-4 mb-4">Welcome to NewTech</h1>
              <p className="lead mb-4">
                Transforming ideas into reality with innovative solutions
              </p>
              <Button variant="primary" size="lg" href="/services">
                Explore Our Services <ArrowRight className="ms-2" />
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="text-center mb-5">
          <Col>
            <h2 className="display-5">Why Choose Us?</h2>
            <p className="lead text-muted">Delivering excellence in everything we do</p>
          </Col>
        </Row>

        <Row>
          <Col md={4} className="mb-4">
            <div className="text-center">
              <Award size={48} className="text-primary mb-3" />
              <h3>Quality First</h3>
              <p>We never compromise on quality, ensuring the best results for our clients.</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="text-center">
              <Users size={48} className="text-primary mb-3" />
              <h3>Expert Team</h3>
              <p>Our team of professionals brings years of experience and expertise.</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="text-center">
              <Target size={48} className="text-primary mb-3" />
              <h3>Goal Oriented</h3>
              <p>We focus on achieving measurable results for your business.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;