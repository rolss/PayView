
const TransactionDetails = ({ data }) => {
    // !!add: company
    return ( 
        <div className="container receipt mt-5 w-75">
            {data.status ? (
            <div>
                <div className="row align-items-center justify-content-center">
                    <div className="col-md-1 pt-4 ps-0">
                        <i class="bi bi-x-lg big-icon receipt-failed"></i>
                    </div>
                    <div className="col-md-6">
                        <h1 className="mt-5 receipt-failed">Transaction Failed</h1>
                        <p className="ms-1">Your payment could not be processed.</p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <hr style={{ width: '65%' }} />
                    </div> 
                </div>
            </div>
            ) : (
            <div>
                <div className="row align-items-center justify-content-center">
                    <div className="col-md-1 pt-4 ps-0">
                        <i class="bi bi-check-circle big-icon receipt-success"></i>
                    </div>
                    <div className="col-md-6">
                        <h1 className="mt-5 receipt-success">Transaction Successful!</h1>
                        <p className="ms-1">Your payment has been processed. Find details below.</p>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <hr style={{ width: '65%' }} />
                </div>
            </div>
            ) }
            
            <div className="row align-items-center justify-content-center ms-5 mt-4">
                <div className="col-md-2">
                    <p className="mb-3"><strong>Name</strong></p>
                    <p className="mb-3"><strong>Document</strong></p>
                    <p className="mb-3"><strong>Email</strong></p>
                    <p className="mb-3"><strong>Amount</strong></p>
                    <p className="mb-3"><strong>Status</strong></p>
                    <p className="mb-3"><strong>Transaction ID</strong></p>
                </div>
                <div className="col-md-3">
                    <p className="mb-3">{data.name}</p>
                    <p className="mb-3">{data.idType} {data.idNumber}</p>
                    <p className="mb-3">{data.email}</p>
                    <p className="mb-3">{data.amount}</p>
                    <p className="mb-3">{data.status ? 'Failed' : 'Success'}</p>
                    <p className="mb-3">{data._id}</p>
                </div>
                {/* <div className="row mw-50 align-items-center justify-content-center ">
                    <a className="btn btn-warning btn-sm receipt-button" href="/transaction">Make a new transaction</a>
                    <a className="btn btn-warning btn-sm receipt-button" href="/view">View cards</a>
                </div> */}
            </div>
        </div>
     );
}
 
export default TransactionDetails