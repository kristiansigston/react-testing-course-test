import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import OrderEntry from './pages/entry/orderEntry'
import OrderSummary from './pages/summary'
import OrderConfirmation from './pages/confirmation/order-confirmation'

import { OrderDetailsProvider } from './contexts/order-details'

const App = () => {
  const [orderPhase, setOrderPhase] = useState('inProgress')

  let Component = OrderEntry
  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry
      break
    case 'review':
      Component = OrderSummary
      break
    case 'completed':
      Component = OrderConfirmation
      break
    default:
  }
  return (
    <OrderDetailsProvider>
      {/* Summary page and entry page need provider */}
      <Container>
        <Component setOrderPhase={setOrderPhase} />
      </Container>
      {/* confirmation page does not need provider */}
    </OrderDetailsProvider>
  )
}

export default App
