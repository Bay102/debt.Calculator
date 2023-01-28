import React from "react";
import PaymentHistory from "./PaymentHistory";

class CalculatorForm extends React.Component {
  state = {
    balance: "",
    interest: "",
    paymentAmount: "",
    paymentsUntilPayoff: "",
    minPayment: "",
    allPayments: [],
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.minimumPayment());
  };

  minimumPayment = () => {
    const { balance, interest } = this.state;
    let principle = +balance * 0.01;
    let paymentInterest = (+interest / 1200) * +balance;
    let minPay = (+principle + +paymentInterest).toFixed(2);
    this.setState({ minPayment: minPay });
  };

  paymentCalculations = () => {
    const { balance, interest, paymentAmount } = this.state;
    const loanInterest = (+interest / 1200) * +balance;
    const paymentAfterInterest = +paymentAmount - +loanInterest;
    this.setState({
      balance: (+balance - +paymentAfterInterest).toFixed(2),
    });
    return paymentAfterInterest;
  };

  untilPaidOff = () => {
    const { balance, paymentAmount } = this.state;
    if (+balance > 0) {
      this.setState({
        paymentsUntilPayoff: (balance / paymentAmount - 1).toFixed(0),
      });
    } else if (+balance - +paymentAmount === 0) {
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

  
  paymentSubmit = (e) => {
    e.preventDefault();
    const { balance, paymentAmount, minPayment } = this.state;
    if (
      +paymentAmount >= minPayment &&
      +paymentAmount > 0 &&
      +paymentAmount <= +balance
    ) {
      this.paymentCalculations();
      this.addToPaymentHistory();
      this.untilPaidOff();
    } else if (+paymentAmount < minPayment) {
      alert("Please pay at least your minimum payment");
    } else if (+paymentAmount > +balance) {
      alert("Please do not pay over your current balance");
    }
  };

  render() {
    const fields = [
      { id: "payment-amount", label: "Enter Your Total Loan", name: "balance" },
      {
        id: "interest-rate",
        label: "Enter Your Interest Rate",
        name: "interest",
      },
      {
        id: "amount",
        label: "Payment-Amount",
        name: "paymentAmount",
        value: this.state.paymentAmount,
      },
    ];
    return (
      <div className="calc-wrapper">
        <form>
          {fields.map((field) => {
            const { id, label, name, value } = field;
            return (
              <div key={id} className="field-wrap">
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
            );
          })}
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
