import React from "react";

class PaymentHistory extends React.Component {
  render() {
    const { info: { allPayments, balance } } = this.props;
    
    return (
      <div>
        <div className="balance-wrap">
          <div>LOAN BALANCE:</div> 
          <div>{balance}</div>
        </div> 
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
