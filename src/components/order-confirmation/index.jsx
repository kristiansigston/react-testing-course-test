import axios from 'axios'
import { useEffect, useState } from 'react'

const OrderConfirmation = () => {
  const [orderNumber, setOrderNumber] = useState(null)

  useEffect(() => {
    axios
      .post('http//localhost:3030/toppings')
      .then((response) => {
        setOrderNumber(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  if (!orderNumber) {
    return <div>Loading...</div>
  }

  return <div>{orderNumber}</div>
}

export default OrderConfirmation
