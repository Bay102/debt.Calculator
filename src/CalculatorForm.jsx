import React from "react";
import PaymentHistory from "./PaymentHistory";

class CalculatorForm extends React.Component {
  state = {
    balance: "",
    interest: "",
    paymentAmount: "",
    paymentsUntilPayoff: "",
    allPayments: [],
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  untilPaidOff = () => {
    const { balance, paymentAmount } = this.state;
    this.setState({
      paymentsUntilPayoff: (balance / paymentAmount).toFixed(0),
    });
  };

  calculations = () => {
    this.untilPaidOff();
    const { balance, interest, paymentAmount } = this.state;
    const loanInterest = (+interest / 12) * +balance;
    const paymentAfterInterest = +paymentAmount - +loanInterest;
    this.setState({
      balance: (balance - +paymentAfterInterest).toFixed(2),
    });
    return paymentAfterInterest;
  };

  preSubmit = () => {
    const { paymentAmount, balance } = this.state;
    let principle = balance * 0.01;
    if (paymentAmount > 0 && paymentAmount >= principle) {
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

  payOff = () => {
    const { balance, paymentAmount } = this.state;
    const principle = balance * 0.01;
    if (paymentAmount < principle) {
      alert("Below Min Payment");
    }
    if (balance <= 100) {
    }
    if (balance === 0) {
      alert("Loan is Paid Off!");
    } else {
      this.preSubmit();
    }
  };

  paymentSubmit = (e) => {
    e.preventDefault();
    this.payOff();
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
