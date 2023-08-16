const Homepage = () => {
    return ( 
        <>
            <section>
                <div className="container-fluid">
                    <div className="row justify-content-center align-items-center text-center text-sm-start mt-4 ms-sm-4 ms-lg-5 pb-3">
                        <div className="col-12 col-sm-6 col-md-5 col-xl-4 m-0 p-0 ms-sm-4 ms-lg-3 pe-xl-4">
                            <h1 className="display-4 text-left d-lg-block d-none">Welcome to <span className='d-block'>PayView</span></h1>
                            <h1 className="display-5 text-left d-md-block d-lg-none">Welcome to PayView</h1>

                            <p className='text-left mt-3 pe-lg-5 mb-lg-4 d-lg-block d-none'>Make transactions and visualize your card information with just a few clicks</p>
                            <p style={{ fontSize: '14px' }} className='text-left mt-3 mb-4 px-4 pe-md-4 d-sm-block d-lg-none'>Make transactions and visualize your card information</p>
                            <a href='/signup' className="btn btn-warning btn-sm w-75 d-lg-none">Get started</a>
                            <a href='/signup' className="btn btn-warning mt-2 mt-sm-3 w-75 d-lg-block d-none">Get started</a>
                        </div>
                        <div className="col-6 col-sm-5 mt-4 mt-sm-3 ">
                            <img src={require('../img/credit.png')} alt="a" width="500" height="500" className="img-fluid d-none d-sm-block"/>
                        </div>
                    </div>
                </div>
            </section>
                        
            <section>
                <div className="container-fluid p-0">
                    <div className='row justify-content-center align-items-sm-center py-3 g-0 alt-row'>
                        <div className="col-4 col-sm-3 col-xl-2 my-4 my-sm-5 me-sm-5 me-lg-4 me-xl-5">
                            <img src={require('../img/cardpaid.png')} alt="" width={150} height={150} className="img-fluid"/>
                        </div>
                        <div className="col-10 col-sm-6 col-md-5 col-lg-4 col-xl-3">
                            <h3 className='display-6 d-sm-block d-none'>Pay with ease</h3> 
                            <h3 className='display-6 d-sm-none text-center'>Pay with ease</h3> 
                            <p className="lead d-sm-block d-none">Make quick transactions through Western and East Banks</p>
                            <p style={{ fontSize: '16px' }} className="lead px-3 d-sm-none text-center">Make quick transactions through Western and East Banks</p>
                        </div>
                    </div>
                    <div className='row justify-content-center align-items-sm-center g-0'>
                        <div className="col-4 d-sm-none mt-4">
                            <img className='img-fluid mb-4 d-sm-none' src={require('../img/security.png')} alt="" width={200} height={200}/>
                        </div>
                        <div className="col-12 col-sm-7 col-md-6 col-lg-5 col-xl-4 mb-4 ms-sm-4 pe-sm-5">
                            <h3 className='display-6 d-sm-block d-none'>Remain protected</h3> 
                            <h3 className='display-6 d-sm-none text-center'>Remain protected</h3> 
                            <p className="lead d-sm-block d-none">PayView ensures protection against malicious agents</p>
                            <p style={{ fontSize: '16px' }} className="lead px-5 d-sm-none text-center">PayView ensures protection against malicious agents</p>
                        </div>
                        <div className="col-4 col-xl-3 my-5 d-sm-block d-none">
                            <img className='img-fluid mb-5 ms-md-5' src={require('../img/security.png')} alt="" width={200} height={200}/>
                        </div>
                    </div>
                    <div className='alt-row row justify-content-center align-items-sm-center py-3 g-0'>
                        <div className="col-4 col-sm-3 col-xl-2 my-4 my-sm-5 me-sm-5 me-lg-4 me-xl-5">
                            <img src={require('../img/receipt3.png')} alt="" width={200} height={200} className="img-fluid"/>
                        </div>
                        <div className="col-10 col-xl-4 col-lg-4 col-md-5 col-sm-6">
                        <h3 className='display-6 d-sm-block d-none'>Keep your history</h3> 
                        <h3 className='display-6 d-sm-none text-center'>Keep your history</h3> 
                        <p className="lead d-sm-block d-none">View and get receipts of all your previous transactions whenever you like</p>
                        <p style={{ fontSize: '16px' }} className="lead px-3 d-sm-none text-center">View and get receipts of all your previous transactions</p>
                        </div>
                    </div>
                    <div className='row justify-content-center align-items-sm-center g-0'>
                        <div className="col-4 mt-4 d-sm-none">
                            <img className='img-fluid mb-2 d-sm-none' src={require('../img/chat.png')} alt="" width={200} height={200}/>
                        </div>
                        <div className="col-12 col-sm-7 col-md-6 col-lg-5 col-xl-4 d-flex flex-column mb-4 ms-sm-4 pe-sm-5">
                            <h3 className='display-6 d-sm-block d-none'>We're all ears</h3> 
                            <h3 className='display-6 d-sm-none text-center'>We're all ears</h3> 
                            <p className="lead d-sm-block d-none">Get in touch with our customer support services at any time</p>
                            <p style={{ fontSize: '16px' }} className="lead px-4 d-sm-none text-center">Get in touch with our customer support services at any time</p>
                            <button className="btn btn-warning align-self-center align-self-sm-start w-50">Contact us</button>
                        </div>
                        <div className="col-4 col-xl-3 my-5 d-sm-block d-none">
                            <img className='mb-5 ms-md-5 img-fluid' src={require('../img/chat.png')} alt="" width={200} height={200}/>
                        </div>
                    </div>
                </div>
            </section>
            <footer style={{backgroundColor:"#414043"}}>
                <div className="container-fluid">
                    <div className="row justify-content-center align-items-center text-center py-3 py-sm-4">
                        <div className="col-12 col-sm-3 mb-2">
                            <a className='d-block text-decoration-none fw-semi-bold' href="/signup">Get started</a>
                        </div>
                        <div className="col-12 col-sm-3 mb-2">
                            <a className='d-block text-decoration-none fw-semi-bold' href="#">About us</a>
                        </div>
                        <div className="col-12 col-sm-3 mb-2">
                            <a className='d-block text-decoration-none fw-semi-bold' href="#">Contact us</a>
                        </div>
                        <div className="col-12 col-sm-3 mb-2">
                            <a className='d-block text-decoration-none fw-semi-bold' href="#">FAQ</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
     );
}
  
export default Homepage;  

