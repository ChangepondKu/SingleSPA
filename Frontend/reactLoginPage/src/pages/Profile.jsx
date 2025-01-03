import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { User, Mail, Phone, MapPin, Briefcase, Calendar } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import axios from 'axios';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const state = useSelector(state => state.user)
  console.log(state)
  // Get the token from cookies
  const token = Cookies.get('authToken');

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    // phone: '',
    // address: '',
    // occupation: '',
    // birthDate: '',
    // bio: '',
  });

  useEffect(() => {
    const mockUserData = {
      name: sessionStorage.getItem('name') || state?.name || '',
      // lastName: localStorage.getItem('lastName') || '',
      email: sessionStorage.getItem('email') || state?.email || '',
      // phone: localStorage.getItem('phone') || '',
      // address: '123 Main St, City, Country',
      // occupation: 'Software Developer',
      // birthDate: '1990-01-01',
      // bio: 'Passionate about technology and innovation.',
      id: sessionStorage.getItem('id') || state?.id
    };
    setProfile(mockUserData);
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {

      if (!token) {
        setError('Authentication token not found. Please log in again.');
        return;
      }

      // Make the API call with Axios
      await axios.put(
        'http://localhost:5000/api/auth/update',
        profile, // Send the profile data as the request body
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      ).then((res) => {
        dispatch({
          type: 'user/setUserDetails',
          payload: res.data.user,
        })
      });

      // Handle success response
      setSuccess('Profile updated successfully!');
      setIsEditing(false);

      // // Optionally update the state or localStorage
      // localStorage.setItem('name', profile.name);
      // localStorage.setItem('email', profile.email);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err) {
      // Handle error response
      const errorMessage = err.response?.data?.message || 'Failed to update profile. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Profile</h2>
                <Button
                  variant={isEditing ? 'outline-secondary' : 'primary'}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>

              {success && <Alert variant="success">{success}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <User size={18} className="me-2" />
                        First Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                  {/* <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <User size={18} className="me-2" />
                        Last Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col> */}
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <Mail size={18} className="me-2" />
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group>

                {/* <Form.Group className="mb-3">
                  <Form.Label>
                    <Phone size={18} className="me-2" />
                    Phone
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group> */}

                {/* <Form.Group className="mb-3">
                  <Form.Label>
                    <MapPin size={18} className="me-2" />
                    Address
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group> */}

                <Row>
                  {/* <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <Briefcase size={18} className="me-2" />
                        Occupation
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="occupation"
                        value={profile.occupation}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <Calendar size={18} className="me-2" />
                        Birth Date
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="birthDate"
                        value={profile.birthDate}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </Form.Group>
                  </Col> */}
                </Row>

                {/* <Form.Group className="mb-3">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows={3}
                  />
                </Form.Group> */}

                {isEditing && (
                  <div className="d-grid">
                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
