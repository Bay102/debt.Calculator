import React from "react";

class PaymentHistory extends React.Component {
  render() {
    const { info: { allPayments, balance } } = this.props;

    return (
      <div>
        <label htmlFor="current-balance">Current Balance:{balance}</label>
        <br />
        <br />
        <hr />
        <div>PAYMENT HISTORY</div>
        <ul>
          {allPayments.map((payment) => (
            <li key={payment.id}>{payment.text}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PaymentHistory;
