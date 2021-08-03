import React, { Component } from 'react'
import PaymentService from '../services/PaymentService';

class CreatePaymentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            paymentId: this.props.match.params.paymentId,
            status: '',
            amount: '',
            type1: '',

        }
        
        this.changepaymentIdHandler = this.changepaymentIdHandler.bind(this);
        this.changepaymentStatusHandler = this.changepaymentStatusHandler.bind(this);
        this.changepaymentAmountHandler = this.changepaymentAmountHandler.bind(this);
        this.changepaymentType1Handler = this.changepaymentType1Handler.bind(this);
        this.saveOrUpdatePayment = this.saveOrUpdatePayment.bind(this);
    }

    componentDidMount() {

        // step 4
        alert(this.state.paymentId)
        PaymentService.getPaymentById(this.state.paymentId).then((res) => {
            let payment = res.data;
            this.setState({
                paymentId: payment.paymentId,
                status: payment.status,
                amount: payment.amount,
                type1: payment.type1,


            });
        });
    }

    saveOrUpdatePayment = (e) => {
        e.preventDefault();
        //alert("hi");
        let payment = { paymentId: this.state.paymentId, brand: this.state.brand, amount: this.state.amount, type1: this.state.type1, registrationState: this.state.registrationState, registrationYear: this.state.registrationYear, variant: this.state.variant };
        console.log('payment => ' + JSON.stringify(payment));
        // step 5
        if (this.state.paymentId === '_add') {
            PaymentService.createPayment(payment).then(res => {
                this.props.history.push('/payments');
            });
        } else {
            PaymentService.updatePayment(payment, this.state.paymentId).then(res => {
                this.props.history.push('/payments');
            });
        }
    }

    changepaymentIdHandler = (event) => {
        // alert("fName"+event.target.value)
        this.setState({ paymentId: event.target.value });
    }
    changepaymentStatusHandler = (event) => {
        // alert("fName"+event.target.value)
        this.setState({ brand: event.target.value });
    }

    changepaymentAmountHandler = (event) => {
        //  alert("lName"+event.target.value)
        this.setState({ amount: event.target.value });
    }

    changepaymentType1Handler = (event) => {
        //  alert("email"+event.target.value)
        this.setState({ type1: event.target.value });
    }



    cancel() {
        this.props.history.push('/payments');
    }
    onSubmit(e) {
        e.preventDefault();
        let payment = { paymentId: this.state.paymentId, brand: this.state.brand, amount: this.state.amount, type1: this.state.type1, registrationState: this.state.registrationState, registrationYear: this.state.registrationYear, variant: this.state.variant };
        console.log('payment => ' + JSON.stringify(payment));

        if (!this.state.brand || !this.state.amount || !this.state.type1 || !this.state.registrationState || !this.state.registrationYear || !this.state.variant) {
            this.setState((state) => ({ ...state, error: 'Please set paymentId & paymentAmount!' }));
        } else {
            this.setState((state) => ({ ...state, error: 'plz validate' }));
            this.props.onSubmitPayment(

                {
                    paymentId: this.state.paymentId,
                    status: this.state.status,
                    amount: this.state.amount,
                    type1: this.state.type1


                },

            );
            // 
        }

    }

    getTitle() {
        if (this.state.paymentId === '_add') {
            return <h3 className="text-center">Add payment</h3>
        } else {
            return <h3 className="text-center">Update payment</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="paymentd col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="paymentd-body">
                                <form onSubmit={this.onSubmit} className='add-payment-form' >
                                    <div className="form-group">
                                        <label> payment Id: </label>
                                        <input placeholder="Payment Id" required className="form-control"
                                            value={this.state.paymentId} onChange={this.changepaymentIdHandler} />
                                    </div>

                                    <div className="form-group">
                                        <label> payment Status: </label>
                                        <input placeholder="Payment Status" required className="form-control"
                                            value={this.state.status} onChange={this.changepaymentStatusHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Payment Amount: </label>
                                        <input placeholder="payment Amount" required className="form-control"
                                            value={this.state.amount} onChange={this.changepaymentAmountHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> payment Type1: </label>
                                        <input placeholder="Payment Type1" required className="form-control"
                                            value={this.state.type1} onChange={this.changepaymentType1Handler} />
                                    </div>






                                    {this.state.error && <b className="m-1 text-danger">{this.state.error}</b>}

                                    <button className="btn btn-success" onClick={this.saveOrUpdatePayment}>UpdateNSave</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>

                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreatePaymentComponent