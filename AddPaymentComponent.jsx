import React, { Component } from 'react'
import PaymentService from '../services/PaymentService';

class AddPaymentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            paymentId: '',
            amount: '',
            status:'',
            type1:''
           
        }
        this.onSubmit=this.onSubmit.bind(this);
        this.changepaymentIdHandler = this.changepaymentIdHandler.bind(this);
        this.changeamountHandler = this.changeamountHandler.bind(this);
        this.changestatusHandler = this.changestatusHandler.bind(this);
        this.changetype1Handler = this.changetype1Handler.bind(this);
        
       this.saveOrUpdatePayment = this.saveOrUpdatePayment.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.paymentId === '_add'){
           return
        }else{
            PaymentService.getPaymentById(this.state.paymentId).then( (res) =>{
                let payment = res.data;
                this.setState({
                    paymentId: payment.paymentId,
                    amount: payment.amount,
                    status : payment.status,
                    type1 : payment.type1,
                   
                });
            });
        }        
    }
    
    
    
    changepaymentIdHandler= (event) => {
      
        this.setState({paymentId: event.target.value});
    }

    changeamountHandler= (event) => {
      
        this.setState({amount: event.target.value});
    }

    changestatusHandler= (event) => {
     
        this.setState({status: event.target.value});
    }
    changetype1Handler= (event) => {
        
          this.setState({type1: event.target.value});
      }

  

    cancel(){
        this.props.handleCancel();
       // this.props.history.push('/payments');
    }
    onSubmit(e) {
        e.preventDefault();
        let payment = {paymentId: this.state.paymentId, amount: this.state.amount, status: this.state.status, type1: this.state.type1, cardName : this.state.cardName, cardNumber: this.state.cardNumber, cardExpiry : this.state.cardExpiry, cvv :this.state.cvv};
        console.log('payment => ' + JSON.stringify(payment));

        if (!this.state.paymentId || !this.state.amount ||  !this.state.status ||  !this.state.type1 ) {
            this.setState((state) => ({ ...state, error: 'Please set paymentid & status & amount & type1!' }));
        } else {
            this.setState((state) => ({  ...state,error: '' }));
            this.props.onSubmitPayment(
                
                {
                    paymentId: this.state.paymentId,
                    amount: this.state.amount,
                    status : this.state.status,
                    type1 : this.state.type1

                    
                },
                
            );
           // 
        }
        
    }

    getTitle(){
        
            return <h3 className="text-center">Add Payment</h3>
        
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container" >
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form onSubmit={this.onSubmit} className='add-payment-form' >
                                        <div className = "form-group">
                                            <label> paymentId: </label>
                                            <input placeholder="paymentId" required className="form-control" 
                                                value={this.state.paymentId} onChange={this.changepaymentIdHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> amount: </label>
                                            <input placeholder="amount" required className="form-control" 
                                                value={this.state.amount} onChange={this.changeamountHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> status: </label>
                                            <input placeholder="status" required className="form-control" 
                                                value={this.state.status} onChange={this.changestatusHandler}/>
                                        </div>

                                        <div className = "form-group">
                                            <label> type1: </label>
                                            <input placeholder="type1" required className="form-control" 
                                                value={this.state.type1} onChange={this.changetype1Handler}/>
                                        </div>

                                        <div className = "form-group">
                                            <label> cardName: </label>
                                            <input placeholder="cardName" required className="form-control" 
                                                value={this.state.cardName} onChange={this.changecardNameHandler}/>
                                                 </div>

<div className = "form-group">
                                            <label> cardNumber: </label>
                                            <input placeholder="cardNumber" required className="form-control" 
                                                value={this.state.cardNumber} onChange={this.changecardNumberHandler}/>
                                        </div>

                                        <div className = "form-group">
                                            <label> cardExpiry: </label>
                                            <input placeholder="cardExpiry" required className="form-control" 
                                                value={this.state.cardExpiry} onChange={this.changecardExpiryHandler}/>
                                        </div>

                                        <div className = "form-group">
                                            <label> cvv: </label>
                                            <input placeholder="cvv" required className="form-control" 
                                                value={this.state.cvv} onChange={this.changecvvHandler}/>
                                        </div>


                                       
                                        {this.state.error && <b className="m-1 text-danger">{this.state.error}</b>}
                                        <button className="btn btn-success" onClick={this.onSubmit} style={{marginLeft: "10px"}}>Add</button>
                                        <button className="btn btn-success" onClick={this.saveOrUpdatePayment}>Update and Save</button> 
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                        
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default AddPaymentComponent

