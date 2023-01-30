import React from "react";

const PaymentHistory = ({
  info: { allPayments, balance, paymentsUntilPayoff, minPayment },
}) => {
  return (
    <div>
      <div className="balance-wrap">
        <div>LOAN BALANCE:</div>
        <div>${balance}</div>
      </div>
      <div className="payoff">
        <div>Minimum Payment Due: ${minPayment}</div>
        <div>Remaining-ish Payments: {paymentsUntilPayoff}</div>
      </div>
      <div className="history">PAYMENT HISTORY</div>

      <ul>
        {allPayments.map((payment) => (
          <li key={payment.id}>{payment.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentHistory;
