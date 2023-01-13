import React from "react";

class PaymentHistory extends React.Component {

   render() {
      const { balance } = this.props;
      return(
         <div>
            <label htmlFor="current-balance">Current Balance:{balance}</label>
         </div>
      )
   }
}

export default PaymentHistory;