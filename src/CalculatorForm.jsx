import React from "react";
import PaymentHistory from "./PaymentHistory";

class CalculatorForm extends React.Component {

   state = {
      totalStart: '',
      interest: '',
      paymentAmount: '',
      balance: '',
   }
      
   // 1% minimum payment, cannot pay less than min, record every payment and show it in payment history 

   startingBalance = ({target: {value}}) => {this.setState({totalStart: value})}

   paymentAmount = ({target: {value}}) => {this.setState({paymentAmount: value})}

   interestRate = ({target: {value}}) => {this.setState({interest: value})}

   
   calculations = () => {
    
      const loanInterest = (+this.state.interest / 12) * (+this.state.totalStart); 
      console.log(loanInterest);
      
      const principle = (+this.state.totalStart) * 0.01
      console.log(principle);

      const totalPayment = (+loanInterest) + (+principle);
      return totalPayment
   }


   paymentSubmit = (e) => { 
      e.preventDefault();
      this.calculations();
      const updatedBalance = (+this.totalStart) - (this.calculations()) ; console.log(updatedBalance);
      this.setState({balance: updatedBalance })
     
   }



   render() {

      // const {totalStart, interest, paymentAmount, balance} = this.state;

      return(
         <div className="calc-wrapper">
            <form onSubmit={this.paymentSubmit} action="">
               <label className="labels" htmlFor="payment-amount">Enter Your Total Loan:</label>
               <input onChange={this.startingBalance} id="payment-amount" type="number" />
               <br /><br />
               <label className="labels" htmlFor="interest-rate">Enter Your Interest Rate:</label>
               <input onChange={this.interestRate} id="interest-rate" type="number" />
               <br /><br />
               <label className="labels" htmlFor="amount">Payment Amount:</label>
               <input onChange={this.paymentAmount} id="amount" type="number" />
               <br /><br />
               <div className="pay-button">
                  <button onClick={this.paymentSubmit} >Make Payment</button>
               </div>
            
            </form>
            <hr />
               <PaymentHistory  balance={this.state.totalStart}/>
         </div>
      )
   }
}

export default CalculatorForm; 