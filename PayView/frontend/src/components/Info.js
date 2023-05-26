import { Col, Container, Row } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { InfoCircle } from "react-bootstrap-icons";
import tarjeta from "../assets/img/creditcard.png";
import chat_linea from "../assets/img/chat-en-linea.png";
import llamada from "../assets/img/llamada-telefonica.png";
import cita_llamada from "../assets/img/smartphone.png";

const Info = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <section className="info" id="info">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <h2>PayView te permitirá pagar</h2>
            <h2>desde cualquier parte del mundo</h2>
            <p>
              Tenemos un sistema totalmente seguro y confiable para realizar los
              pagos de tu matrícula u otros conceptos de nuestra institución
              educativa.
            </p>
            <button onClick={() => console.log("Connect")}>
              Conoce más <InfoCircle size={25} />
            </button>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <img src={tarjeta} alt="imagen" />
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col>
            <div className="dudas-bx">
              <h2>¿Aún tienes dudas?</h2>
              <Carousel
                responsive={responsive}
                infinite={true}
                className="info-slider"
              >
                {/* Las imagenes deben ser reemplazadas por las originales usadas en el boceto */}
                <div className="item">
                  <img src={chat_linea} alt="imagen" width={100} height={100} />
                  <h5>Chat en línea</h5>
                  {/* Convertir en links cuando se sepa a que referencia lleva */}
                  <p>Escribenos</p>
                </div>
                <div className="item">
                  <img src={llamada} alt="imagen" width={100} height={100} />
                  <h5>Llamanos a nuestra línea</h5>
                  {/* se debe poner el número de telefono que sale en el boceto */}
                  <p>018000 91 2345</p>
                </div>
                <div className="item">
                  <img
                    src={cita_llamada}
                    alt="imagen"
                    width={100}
                    height={100}
                  />
                  <h5>Prefieres que te llamemos</h5>
                  <p>Cuando quieras</p>
                </div>
              </Carousel>
            </div>
            
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Info