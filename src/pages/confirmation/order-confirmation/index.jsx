import { useEffect, useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import { useOrderDetails } from '../../../contexts/order-details'
import AlertBanner from '../../common/alert'

const OrderConfirmation = ({ setOrderPhase }) => {
  const [, , resetOrder] = useOrderDetails()
  const [orderNumber, setOrderNumber] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    axios
      .post('http://localhost:3030/order')
      .then((response) => {
        setOrderNumber(response.data.orderNumber)
      })
      .catch((error) => {
        setError(true)
      })
  }, [])

  const handleClick = () => {
    resetOrder()

    setOrderPhase('inProgress')
  }

  if (error) {
    return <AlertBanner message={null} variant={null} />
  }

  if (orderNumber) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Thank you!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: '25%' }}>
          as per our terms and conditions, nothing will happen now
        </p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    )
  }
  return <div>Loading...</div>
}

export default OrderConfirmation
