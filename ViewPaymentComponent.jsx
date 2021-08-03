import React, { Component } from 'react'
//import PaymentService from '../services/PaymentService'

class ViewPaymentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            paymentId: this.props.match.params.paymentId,
            payment: {}
        }
    }

    componentDidMount(){
       PaymentService.getPaymentById(this.state.paymentId).then( res => {
           this.setState({payment: res.data});
       })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Payment Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Payment Id: </label>
                            <div> { this.state.payment.paymentId }</div>
                        </div>
                        <div className = "row">
                            <label> Payment Status: </label>
                            <div> { this.state.payment.status }</div>
                        </div>
                        <div className = "row">
                            <label> Payment Amount: </label>
                            <div> { this.state.payment.amount }</div>
                        </div>
                        <div className = "row">
                            <label> Payment Type: </label>
                            <div> { this.state.payment.type1 }</div>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}

export default ViewPaymentComponent
