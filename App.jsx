import { useState } from 'react'
import './App.css'

function App() {

  const paymentHandler = async(event) => {

    const amount = 500;
    const currency = 'INR';
    const receiptId = '12345678790';

    const response =  await fetch('http://localhost:5000/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId
      })
    })

    const order = await response.json();
    console.log('order', order);


    var option = {
      key:"",
      amount,
      currency,
      name:"Test Payment",
      description: "Test Transaction",
      image:"https://i.ibb.co/5Y3m33n/test.png",
      order_id:order.id,
      handler: async function(response){
        
        const body = {...response,}

          const validateResponse = await fetch('http://localhost:5000/validate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)

          })

          const jsonResponse = await validateResponse.json();

          console.log('jsonResponse', jsonResponse);

      },
      prefill: {
        name:"Test Payment",
        email:"test@example.com",
        contact:"9000000000",
      },
      notes:{
        address:"Razorpay Corporate Office",
      },
      notes: {
        name:"Test Payment",
        email:"test@example.com",
        contact:"9000000000",
      },
      theme:{
        color:"#3399cc"
      },
    }

    var rzp1 = new Razorpay(option);
      rzp1.on("payment.failed", function(response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      })

      rzp1.open();
      event.preventDefault();
    }

  return (
    <>
    <div className='product'>
      <h1>Razorpay Payment Gateway</h1>
      <button className='button' onClick={paymentHandler}>Pay Now</button>
    </div>
    </>
  )
}

export default App
