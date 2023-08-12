import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Help = () => {
  const location = useLocation()

  return (
    <>
    <a type="button" class="nav-link" data-bs-toggle="modal" data-bs-target="#Modal"><i class="bi bi-question-circle"></i></a>
    <div class="modal fade" id="Modal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            {location.pathname === '/' &&
              <h5 class="modal-title" id="ModalLabel">Welcome</h5>
            }
            {location.pathname === '/login' &&
              <h5 class="modal-title" id="ModalLabel">Log in</h5>
            }
            {location.pathname === '/signup' &&
              <h5 class="modal-title" id="ModalLabel">Sign up</h5>
            }
            {location.pathname === '/transaction' &&
              <h5 class="modal-title" id="ModalLabel">Making a transaction</h5>
            }
            {location.pathname === '/view' &&
              <h5 class="modal-title" id="ModalLabel">Viewing your cards</h5>
            }
            {location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/transaction' && location.pathname !== '/view' && (
              <h5 class="modal-title" id="ModalLabel">Sorry</h5>
            )}
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            {location.pathname === '/' &&
              <p>Please <a href="/signup" className='m-0 text-decoration-none text-secondary fw-semi-bold'>create an account</a> or <a href="/login" className='m-0 text-decoration-none text-secondary fw-semi-bold'>log in</a> to start using our services</p>
            }
            {location.pathname === '/login' &&
              <p>Log in with your email and password to use our services. Don't have an account? Create one <a href="/signup" className='m-0 text-secondary'>here</a></p>
            }
            {location.pathname === '/signup' &&
              <p>Signup with your email and password to use our services. Already have an account? Log in <a href="/login" className='m-0 text-secondary'>here</a></p>
            }
            {location.pathname === '/transaction' &&
              <p>
                Make transactions by filling in all the information of the person who is going to pay.
                Please verify all the information is correct before clicking on the yellow "Pay" button.
                After clicking, you will be redirected to a page with your receipt.
              </p>
            }
            {location.pathname === '/view' &&
              <p>
                View information about your cards and the history of your transactions through PayView
                Upon adding a card using the card form in this page, or making a transaction with a card, the card will be linked to your account for you to view its details at any time
                You may unlink a card from your account at any time by clicking on the "unlink" button. Note this will not make any changes on your actual card
                To view your full history of transactions with PayView, click on the "See more" button
              </p>
            }
            {location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/transaction' && location.pathname !== '/view' && (
              <p>We can't help you on this page</p>
            )}
            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    </>
    // <span className='p-5'>
    //   {/* Modal */}
    //   <Button variant="warning" onClick={() => setShowModal(true)}>Help</Button>
    //   <Modal show={showModal} onHide={() => setShowModal(false)}>
    //     {location.pathname === '/view' && 
    //     <span>
    //       <Modal.Header closeButton>
    //       <Modal.Title className='modaltext' >Consultar tarjetas e historial</Modal.Title>
    //     </Modal.Header>

    //     <Modal.Body>
    //       <p className='modaltext'>En esta página puede consultar el saldo de cualquiera de sus tarjetas, débito o crédito</p>
    //       <p className='modaltext'>Al consultar, se vinculará la tarjeta con su perfil, para que pueda volver a consultarla en el futuro</p>
    //       <p className='modaltext'>Para desvincular una tarjeta con su perfil, haga click en "Borrar" en la tabla superior derecha</p>
    //       <p className='modaltext'>En cualquier momento puede revisar su historial, y hacer click en "Ver más" para ver su historial completo</p>
    //     </Modal.Body>
    //     </span>
    //     }
    //     {location.pathname === '/transaction' && 
    //     <span>
    //       <Modal.Header closeButton>
    //       <Modal.Title className='modaltext' >Realizar una transacción</Modal.Title>
    //     </Modal.Header>

    //     <Modal.Body>
    //       <p className='modaltext'>En esta página puede realizar una transacción con su tarjeta de crédito</p>
    //       <p className='modaltext'>Si desea usar su tarjeta débito, por favor indiquelo para ser redirigido a PSE</p>
    //       <p className='modaltext'>Las transacciones exitosas se añadiran a su historial de transacciones</p>
    //       <p className='modaltext'>Además, se enlazará su perfil con la tarjeta con la que realice la transacción</p>
    //       <p className='modaltext'>Al realizar la transacción, podrá ver el resultado de la misma inmediatamente</p>
    //     </Modal.Body>
    //     </span>
    //     }
    //     {location.pathname === '/signup' && 
    //     <span>
    //       <Modal.Header closeButton>
    //       <Modal.Title className='modaltext' >Registro</Modal.Title>
    //     </Modal.Header>

    //     <Modal.Body>
    //       <p className='modaltext'>Para utilizar los servicios de consulta y transacción, debe registrarse con un correo valido y una contraseña segura</p>
    //     </Modal.Body>
    //     </span>
    //     }
    //     {location.pathname === '/login' && 
    //     <span>
    //       <Modal.Header closeButton>
    //       <Modal.Title className='modaltext' >Acceso</Modal.Title>
    //     </Modal.Header>

    //     <Modal.Body>
    //       <p className='modaltext'>Please log in with your credentials to access payment and viewing services</p>
    //     </Modal.Body>
    //     </span>
    //     }
    //     {location.pathname === '/' && 
    //     <span>
    //       <Modal.Header closeButton>
    //       <Modal.Title className='modaltext' >Welcome!</Modal.Title>
    //     </Modal.Header>

    //     <Modal.Body>
    //       <p className='modaltext'>Please create an account or log in to start using our services</p>
    //     </Modal.Body>
    //     </span>
    //     }
        
    //     <Modal.Footer>
    //       <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
    //     </Modal.Footer>
    //   </Modal>
    // </span>
  );
};

export default Help;


