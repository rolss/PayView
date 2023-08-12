const TransactionDetails = ({ data }) => {
    // !!add: company
    return ( 
        <>
            <div className="container receipt mt-5 p-sm-4 pt-md-4 pt-lg-5">
                {data.status ? (
                    <>
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-1">
                            <i class="bi bi-x-lg big-icon receipt-failed"></i>
                        </div>
                        <div className="col-md-7">
                            <h1 className="receipt-failed">Transaction Failed</h1>
                            <p>Your payment could not be processed.</p>
                        </div>
                        <div className="d-flex justify-content-center">
                            <hr style={{ width: '65%' }} />
                        </div> 
                    </div>
                    </>
                ) : (
                    <>
                    <div className="row align-items-center justify-content-center ms-lg-3">
                        <div className="col-sm-12 col-lg-1 col-xl-1 text-center me-lg-3 me-xl-0">
                            <i class="bi bi-check-circle big-icon receipt-success"></i>
                        </div>
                        <div className="col-sm-12 col-lg-8 col-xl-6">
                            <h1 className="receipt-success text-center text-lg-start">Transaction Successful!</h1>
                            <p className="ps-1 d-lg-block d-none">Your payment has been processed. Find details below.</p>
                        </div>
                    </div>
                    <hr className="mb-4 mt-2" />
                    </>
                )}
                

                <div className="row align-items-center justify-content-center">
                <div className="col-12 d-sm-none text-center">
                    <p className="mb-3"><strong className="d-block">Name</strong> {data.name}</p>
                    <p className="mb-3"><strong className="d-block">Document</strong> {data.idType} {data.idNumber}</p>
                    <p className="mb-3"><strong className="d-block">Email</strong> {data.email}</p>
                    <p className="mb-3"><strong className="d-block">Amount</strong> {data.amount}</p>
                    <p className="mb-3"><strong className="d-block">Status</strong> {data.status ? 'Failed' : 'Success'}</p>
                    <p className="mb-3"><strong className="d-block">Transaction ID</strong> {data._id}</p>
                </div>
                    <div className="col-sm-4 col-md-5 col-xl-3 d-sm-block d-none">
                        <p className="mb-3"><strong>Name</strong></p>
                        <p className="mb-3"><strong>Document</strong></p>
                        <p className="mb-3"><strong>Email</strong></p>
                        <p className="mb-3"><strong>Amount</strong></p>
                        <p className="mb-3"><strong>Status</strong></p>
                        <p className="mb-3"><strong>Transaction ID</strong></p>
                    </div>
                    <div className="col-sm-5 col-md-5 col-xl-3 d-sm-block d-none">
                        <p className="mb-3">{data.name}</p>
                        <p className="mb-3">{data.idType} {data.idNumber}</p>
                        <p className="mb-3">{data.email}</p>
                        <p className="mb-3">{data.amount}</p>
                        <p className="mb-3">{data.status ? 'Failed' : 'Success'}</p>
                        <p className="mb-3">{data._id}</p>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row align-items-center justify-content-center ">
                    <a className="receipt-button" href="/transaction">New transaction</a>
                    <a className="receipt-button px-4" href="/view">View cards</a>
                </div>
            </div>
        </>
     );
}
 
export default TransactionDetails