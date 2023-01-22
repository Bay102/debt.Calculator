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
    if (balance > 0) {
      this.setState({
        paymentsUntilPayoff: (balance / paymentAmount).toFixed(0),
      });
    } else this.setState({ paymentsUntilPayoff: 0 });
  };

  addToPaymentHistory = () => {
    const { paymentAmount, allPayments } = this.state;
    const newPayment = {
      text: +paymentAmount,
      id: Date.now(),
    };
    this.setState({
      allPayments: [...allPayments, newPayment],
      paymentAmount: "",
    });
  };

  alerts = () => {
    const { balance, paymentAmount } = this.state;
    let principle = balance * 0.01;
    if (paymentAmount > balance) {
      alert("Payment is Over Your Current Balance");
    }
    if (paymentAmount < principle) {
      alert(" Your Payment is too Low");
    }
  };

  paymentCalculations = () => {
    const { balance, interest, paymentAmount } = this.state;
    const loanInterest = (+interest / 12) * +balance;
    const paymentAfterInterest = +paymentAmount - +loanInterest;

    this.setState({
      balance: (+balance - +paymentAfterInterest).toFixed(2),
    });
    return paymentAfterInterest;
  };

  paymentSubmit = (e) => {
    e.preventDefault();
    const { balance, paymentAmount } = this.state;
    let principle = balance * 0.01;
    if (
      +paymentAmount >= +principle &&
      +paymentAmount > 0 &&
      +paymentAmount <= +balance
    ) {
      this.paymentCalculations();
      this.addToPaymentHistory();
      this.untilPaidOff();
    } else if (+paymentAmount < +principle || paymentAmount > balance) {
      this.alerts();
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
