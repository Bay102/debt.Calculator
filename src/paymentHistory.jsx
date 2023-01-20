import React from "react";

class PaymentHistory extends React.Component {
  render() {
    const {  info: { allPayments, balance , paymentsUntilPayoff} } = this.props;

    return (
      <div>
        <div className="balance-wrap">
          <div>LOAN BALANCE:</div>
          <div>${balance}</div>
        </div>
        <div className="payoff">
            <div>If you make repeat payments of yor last payment, this loan will be paid off in: {paymentsUntilPayoff} payments</div>
        </div>
        <div className="history">PAYMENT HISTORY</div>
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
