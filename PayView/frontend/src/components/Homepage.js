const Homepage = () => {
    return ( 
        <div>
            <section>
                <div className="container-fluid">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-4 mx-5 pl-5">
                            <h1 className="display-4 text-left">Welcome to <span className='d-block'>PayView</span></h1>
                            <p className='mt-4 pr-5 text-left'>Make transactions and visualize your card information with just a few clicks</p>
                            <button className="btn btn-warning mt-3">Get started</button>
                        </div>
                        <div className="mt-3 col-5">
                            <img src={require('../img/credit.png')} alt="a" width="500" height="500"/>
                        </div>
                    </div>
                </div>
            </section>
                        
            <section>
                <div className="container-fluid">
                    <div className='alt-row row mt-5 justify-content-center align-items-center g-0'>
                        <div className="col-3 my-5">
                            <img src={require('../img/cardpaid.png')} alt="" width={200} height={200}/>
                        </div>
                        <div className="col-3">
                        <h3 className='display-6'>Pay with ease</h3> 
                        <p className="lead">Access our fast and secure transaction services and use Western Bank or East Bank for any payment</p>
                        </div>
                    </div>
                    <div className='row justify-content-center align-items-center'>
                        <div className="col-4 ml-4">
                        <h3 className='display-6'>Remain protected</h3> 
                        <p className="pr-4 lead">PayView transactions and accounts are encrypted and protected from malicious agents</p>
                        </div>
                        <div className="col-4 my-5">
                            <img className='ml-5 mb-5' src={require('../img/security.png')} alt="" width={200} height={200}/>
                        </div>
                    </div>
                    <div className='alt-row row justify-content-center align-items-center g-0'>
                        <div className="col-3 my-5">
                            <img src={require('../img/receipt3.png')} alt="" width={200} height={200}/>
                        </div>
                        <div className="col-3">
                        <h3 className='display-6'>Keep your history</h3> 
                        <p className="lead">View and get receipts of all your previous transactions whenever you like</p>
                        </div>
                    </div>
                    <div className='row justify-content-center align-items-center'>
                        <div className="col-4 ml-4">
                        <h3 className='display-6'>We're all ears</h3> 
                        <p className="pr-4 lead">Get in touch with our customer support services at any time</p>
                        <button className="btn btn-warning">Contact us</button>
                        </div>
                        <div className="col-4 my-5">
                            <img className='ml-5 mb-5' src={require('../img/chat.png')} alt="" width={200} height={200}/>
                        </div>
                    </div>
                </div>
            </section>
            <footer>
                <div className="container-fluid">
                    <div className="row py-3 justify-content-center align-items-center">
                        <div className="col-3 mx-5">
                            <h6 className="heading-6">Company</h6>
                            <a className='d-block text-decoration-none text-dark' href="#">About us</a>
                            <a className='d-block text-decoration-none text-dark' href="#">Contact us</a>
                            <a className='d-block text-decoration-none text-dark' href="#">FAQ</a>
                        </div>
                        <div className="col-3">
                            <h6 className="heading-6">App</h6>
                            <a className='d-block text-decoration-none text-dark' href="#">Get started</a>
                            <a className='d-block text-decoration-none text-dark' href="#">Associates</a>
                            <a className='d-block text-decoration-none text-dark' href="#">References</a>
                        </div>
                        <div className="col-2 flex-nowrap">
                            <p>All rights reserved. Copyright 2023</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
     );
}
  
export default Homepage;  

