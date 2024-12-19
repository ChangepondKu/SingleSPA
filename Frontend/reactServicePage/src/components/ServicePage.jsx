import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Code, Palette, BarChart, Globe } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Code size={40} />,
      title: 'Web Development',
      description: 'Custom web applications built with cutting-edge technologies.',
      price: '$999',
    },
    {
      icon: <Palette size={40} />,
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive designs that users love.',
      price: '$799',
    },
    {
      icon: <BarChart size={40} />,
      title: 'Digital Marketing',
      description: 'Data-driven marketing strategies for business growth.',
      price: '$599',
    },
    {
      icon: <Globe size={40} />,
      title: 'SEO Services',
      description: 'Improve your online visibility and reach.',
      price: '$499',
    },
  ];

  return (
    <Container className="py-5">
      <Row className="text-center mb-5">
        <Col>
          <h1 className="display-4">Our Services</h1>
          <p className="lead text-muted">
            Comprehensive solutions for your business needs
          </p>
        </Col>
      </Row>

      <Row>
        {services.map((service, index) => (
          <Col md={6} lg={3} key={index} className="mb-4">
            <Card className="h-100 service-card">
              <Card.Body className="text-center">
                <div className="text-primary mb-3">{service.icon}</div>
                <Card.Title>{service.title}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
                <div className="h4 mb-3">{service.price}</div>
                <Button variant="outline-primary">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-5">
        <Col md={8} className="mx-auto text-center">
          <h3>Need a Custom Solution?</h3>
          <p className="lead">
            Contact us to discuss your specific requirements and how we can help.
          </p>
          <Button variant="primary" size="lg">
            Contact Us
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Services;