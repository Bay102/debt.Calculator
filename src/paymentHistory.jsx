import React from "react";

class PaymentHistory extends React.Component {

   render() {
      const { balance, payments } = this.props;
      console.log(payments);
      return(
         <div>
            <label htmlFor="current-balance">Current Balance:{balance}</label>
            <br /><br />
            <hr />
            <ul>
            
            </ul>
         </div>
      )
   }
}

export default PaymentHistory;