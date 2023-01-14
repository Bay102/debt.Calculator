import React from "react";
import PaymentHistory from "./PaymentHistory";

class CalculatorForm extends React.Component {
  state = {
    balance: "",
    interest: "",
    paymentAmount: "",
  };

//   settingState = ({target: { value }}, stateValue) => {
//   }


  startingBalance = ({ target: { value } }) => {
    this.setState({ balance: value });
  };
  interestRate = ({ target: { value } }) => {
    this.setState({ interest: value });
  };
  paymentAmount = ({ target: { value } }) => {
    this.setState({ paymentAmount: value });
  };


  calculations = () => {
    const { balance, interest, paymentAmount } = this.state;
    const loanInterest = (+interest / 12) * +balance;  console.log(loanInterest);
    const totalPayment = +paymentAmount - +loanInterest;    
    this.setState({ balance: balance  -  +totalPayment })
    return totalPayment;
  };

  paymentSubmit = (e) => {
    e.preventDefault();
    this.calculations();
  };

  render() {
    const { balance, paymentAmount } = this.state;

    return (
      <div className="calc-wrapper">
        <form onSubmit={this.paymentSubmit} action="">
          <label className="labels" htmlFor="payment-amount">
            Enter Your Total Loan:
          </label>
          <input
            onChange={this.startingBalance}
            id="payment-amount"
            type="number"
          />
          <br />
          <br />
          <label className="labels" htmlFor="interest-rate">
            Enter Your Interest Rate:
          </label>
          <input
            onChange={this.interestRate}
            id="interest-rate"
            type="number"
          />
          <br />
          <br />
          <label className="labels" htmlFor="amount">
            Payment Amount:
          </label>
          <input onChange={this.paymentAmount} id="amount" type="number" />
          <br />
          <br />
          <div className="pay-button">
            <button onClick={this.paymentSubmit}>Make Payment</button>
          </div>
        </form>
        <hr />
        <PaymentHistory payments={paymentAmount} balance={balance} />
      </div>
    );
  }
}

export default CalculatorForm;
