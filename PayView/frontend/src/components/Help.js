import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Help = () => {
  const [showModal, setShowModal] = React.useState(false);
  const location = useLocation()

  return (
    <span className='p-5'>
      {/* Modal */}
      <Button variant="primary" onClick={() => setShowModal(true)}>Ayuda</Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        {location.pathname === '/view' && 
        <span>
          <Modal.Header closeButton>
          <Modal.Title className='modaltext' >Consultar tarjetas e historial</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className='modaltext'>En esta página puede consultar el saldo de cualquiera de sus tarjetas, débito o crédito</p>
          <p className='modaltext'>Al consultar, se vinculará la tarjeta con su perfil, para que pueda volver a consultarla en el futuro</p>
          <p className='modaltext'>Para desvincular una tarjeta con su perfil, haga click en "Borrar" en la tabla superior derecha</p>
          <p className='modaltext'>En cualquier momento puede revisar su historial, y hacer click en "Ver más" para ver su historial completo</p>
        </Modal.Body>
        </span>
        }
        {location.pathname === '/transaction' && 
        <span>
          <Modal.Header closeButton>
          <Modal.Title className='modaltext' >Realizar una transacción</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className='modaltext'>En esta página puede realizar una transacción con su tarjeta de crédito</p>
          <p className='modaltext'>Si desea usar su tarjeta débito, por favor indiquelo para ser redirigido a PSE</p>
          <p className='modaltext'>Las transacciones exitosas se añadiran a su historial de transacciones</p>
          <p className='modaltext'>Además, se enlazará su perfil con la tarjeta con la que realice la transacción</p>
          <p className='modaltext'>Al realizar la transacción, podrá ver el resultado de la misma inmediatamente</p>
        </Modal.Body>
        </span>
        }
        {location.pathname === '/signup' && 
        <span>
          <Modal.Header closeButton>
          <Modal.Title className='modaltext' >Registro</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className='modaltext'>Para utilizar los servicios de consulta y transacción, debe registrarse con un correo valido y una contraseña segura</p>
        </Modal.Body>
        </span>
        }
        {location.pathname === '/login' && 
        <span>
          <Modal.Header closeButton>
          <Modal.Title className='modaltext' >Acceso</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className='modaltext'>Por favor inicie sesión con sus credenciales para acceder a los servicios de consulta y transacción</p>
        </Modal.Body>
        </span>
        }
        {location.pathname === '/' && 
        <span>
          <Modal.Header closeButton>
          <Modal.Title className='modaltext' >¡Bienvenido!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className='modaltext'>Crea una cuenta para empezar a usar nuestros servicios</p>
        </Modal.Body>
        </span>
        }
        
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </span>
  );
};

export default Help;


