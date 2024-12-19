import React from 'react';
import '../styles/footer.css'

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="footer-heading">About Us</h5>
            <p className="footer-text">
              We are dedicated to providing exceptional services and solutions to our valued customers worldwide.
            </p>
          </div>
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="list-unstyled footer-links">
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/support">Support</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="footer-heading">Contact Info</h5>
            <ul className="list-unstyled footer-contact">
              <li>📍 123 Business Avenue, Suite 100</li>
              <li>📞 +1 (555) 123-4567</li>
              <li>✉️ contact@company.com</li>
            </ul>
          </div>
        </div>
        <hr className="footer-divider" />
        <div className="row">
          <div className="col-12 text-center">
            <p className="copyright">
              © {new Date().getFullYear()} CompanyName. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;