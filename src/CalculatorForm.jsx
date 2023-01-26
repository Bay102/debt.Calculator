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
    if (+balance > 0) {
      this.setState({
        paymentsUntilPayoff: (balance / paymentAmount - 1 ).toFixed(0),
      });
    } else if ( +balance - + paymentAmount === 0 ) {
      this.setState({ paymentsUntilPayoff: 0 });
    }
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
    } else if (+paymentAmount < +principle) {
      alert("Please pay at least your minimum payment");
    } else if (+paymentAmount > +balance) {
      alert("Please do not pay over your current balance");
    }
  };

  render() {

    const fields = [
      {id:'payment-amount', label:'Enter Your Total Loan', name: 'balance'},
      {id:'interest-rate', label:'Enter Your Interest Rate', name: 'interest'},
      {id:'amount', label:'Payment-Amount', name: 'paymentAmount', value: this.state.paymentAmount},
    ]

    return (
      <div className="calc-wrapper">
        <form>
          {fields.map((field) => {
            const { id, label, name, value } = field
            return (
             <div className="field-wrap">
            <label className="labels" htmlFor={id}>
              {label}:
            </label>
            <input
              onChange={this.handleChange}
              id={id}
              type="number"
              autoComplete="off"
              name={name}
              value={value && value}
            />
          </div>
          )
          })}
         
          {/* <div className="field-wrap">
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
          </div> */}
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
