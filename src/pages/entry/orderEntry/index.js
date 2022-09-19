import Options from '../options'
import Button from 'react-bootstrap/Button'
import { useOrderDetails } from '../../../contexts/order-details'

const OrderEntry = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails()

  const orderDisabled = orderDetails.totals.scoops === '$0.00'
  return (
    <div>
      <h1>Design your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand Total: {orderDetails.totals.grandTotal}</h2>
      <Button disabled={orderDisabled} onClick={() => setOrderPhase('review')}>
        Order Sundae!
      </Button>
    </div>
  )
}

export default OrderEntry
