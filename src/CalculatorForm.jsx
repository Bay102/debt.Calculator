import React from "react";
import PaymentHistory from "./PaymentHistory";

class CalculatorForm extends React.Component {
  state = {
    balance: "",
    interest: "",
    paymentAmount: "",
    allPayments: [],
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  calculations = () => {
    const { balance, interest, paymentAmount } = this.state;
    const loanInterest = (+interest / 12) * +balance;
    const totalPayment = +paymentAmount - +loanInterest;
    this.setState({ balance: (balance - +totalPayment).toFixed(2).toString() });
    return totalPayment;
  };

  preSubmit = () => {
    this.calculations();
    const newPayment = {
      text: +this.state.paymentAmount,
      id: Date.now(),
    };
    this.setState({
      allPayments: [...this.state.allPayments, newPayment],
      paymentAmount: "",
    });
  };

  paymentSubmit = (e) => {
    e.preventDefault();
    const { balance, paymentAmount } = this.state;
    const principle = balance * 0.01;
    if (paymentAmount < principle) {
      alert("Below Min Payment");
    } else {
      this.preSubmit();
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
              onChange={this.handleChange}
              id="payment-amount"
              type="number"
              autoComplete="off"
              name="balance"
            />
          </div>
          <div className="field-wrap">
            <label className="labels" htmlFor="interest-rate">
              Enter Your Interest Rate:
            </label>
            <input
              onChange={this.handleChange}
              id="interest-rate"
              type="number"
              autoComplete="off"
              name="interest"
            />
          </div>
          <div className="field-wrap">
            <label className="labels" htmlFor="amount">
              Payment Amount:
            </label>
            <input
              onChange={this.handleChange}
              id="amount"
              type="number"
              autoComplete="off"
              value={this.state.paymentAmount}
              name="paymentAmount"
            />
          </div>
          <div className="pay-button">
            <button onClick={this.paymentSubmit}>Make Payment</button>
          </div>
        </form>

        <PaymentHistory info={this.state} />
      </div>
    );
  }
}

export default CalculatorForm;
