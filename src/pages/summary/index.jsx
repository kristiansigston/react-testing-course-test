import React from 'react'
import SummaryForm from '../summary-form'
import { useOrderDetails } from '../../contexts/order-details'

const OrderSummary = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails()

  const scoopArray = Array.from(orderDetails.scoops.entries())
  const scoopList = scoopArray.map((key, value) => {
    return (
      <li key={key}>
        {key[1]} {key[0]}
      </li>
    )
  })

  const hasToppings = orderDetails.toppings.size > 0
  let toppingContainer = null
  if (hasToppings) {
    const toppingsArray = Array.from(orderDetails.toppings.keys())
    let toppingList = toppingsArray.map((key) => {
      return <li key={key}>{key}</li>
    })

    toppingContainer = (
      <>
        <h2>Toppings: {orderDetails.totals.toppings}</h2>
        <ul>{toppingList}</ul>
      </>
    )
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopList}</ul>
      {toppingContainer}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  )
}

export default OrderSummary
