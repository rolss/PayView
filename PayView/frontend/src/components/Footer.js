import { Col, Container, Row } from "react-bootstrap";
import { Facebook, Instagram, Linkedin, Twitter, Whatsapp, Youtube } from "react-bootstrap-icons";
import logo from "../assets/img/logo.jpeg";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col sm={6}>
            <div className="logo-image">
              <img src={logo} alt="Logo" height="100" />
            </div>
          </Col>
          <Col sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <p>
                <Facebook size={25} />
              </p>
              <p>
                <Instagram size={20} />
              </p>
              <p>
                <Linkedin size={20} />
              </p>
              <p>
                <Twitter size={20} />
              </p>
              <p>
                <Youtube size={20} />
              </p>
              <p>
                <Whatsapp size={20} />
              </p>
            </div>
            <p>2023 PayView. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer