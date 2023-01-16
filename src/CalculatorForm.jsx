import React from "react";
import PaymentHistory from "./PaymentHistory";

class CalculatorForm extends React.Component {
  state = {
    balance: "",
    interest: "",
    paymentAmount: "",
    allPayments: [],
  };

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
    const loanInterest = (+interest / 12) * +balance;
    const totalPayment = +paymentAmount - +loanInterest;
    this.setState({ balance: balance - +totalPayment });
    return totalPayment;
  };

  paymentSubmit = (e) => {
    e.preventDefault();
    const { balance, paymentAmount } = this.state;
    const principle = balance * 0.01;
    if (paymentAmount < principle) {
      alert("Below Min Payment");
    } else {
      this.calculations();
      const newPayment = {
        text: +this.state.paymentAmount,
        id: Date.now(),
      };
      this.setState({
        allPayments: [...this.state.allPayments, newPayment],
        paymentAmount: "",
      });
    }
  };

  render() {
    return (
      <div className="calc-wrapper">
        <form>
          <div className="field-wrap">
            <label className="labels" htmlFor="payment-amount">
              Enter Your Total Loan:
            </label>
            <input
              onChange={this.startingBalance}
              id="payment-amount"
              type="number"
              autoComplete="off"
            />
          </div>
          <div className="field-wrap">
            <label className="labels" htmlFor="interest-rate">
              Enter Your Interest Rate:
            </label>
            <input
              onChange={this.interestRate}
              id="interest-rate"
              type="number"
              autoComplete="off"
            />
          </div>
          <div className="field-wrap">
            <label className="labels" htmlFor="amount">
              Payment Amount:
            </label>
            <input
              onChange={this.paymentAmount}
              id="amount"
              type="number"
              autoComplete="off"
              value={this.state.paymentAmount}
            />
          </div>
          <div className="pay-button">
            <button onClick={this.paymentSubmit}>Make Payment</button>
          </div>
        </form>
        <hr />
        <PaymentHistory info={this.state} />
      </div>
    );
  }
}

export default CalculatorForm;
