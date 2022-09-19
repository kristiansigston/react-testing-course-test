import axios from 'axios'
import { useEffect, useState } from 'react'
import ScoopOption from '../scoop'
import ToppingsOption from '../toppings'
import Row from 'react-bootstrap/Row'
import AlertBanner from '../../common/alert'
import pricePerItem from '../../../constants'
import { useOrderDetails } from '../../../contexts/order-details'
import formatCurrency from '../../../utilities/format-currency'

const Options = ({ optionType }) => {
  const [items, setItems] = useState([])
  const [error, setError] = useState(false)
  const [orderDetails, updateItemCount] = useOrderDetails()
  // optionType is "scoops or toppings"
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setError(false)
        setItems(response.data)
      })
      .catch((error) => {
        setError(true)
      })
  }, [optionType])

  if (error) {
    return <AlertBanner />
  }

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingsOption // replace with topping option when available
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase()

  const optionItems = items.map((item) => {
    return (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
        updateItemCount={(itemName, newItemCount) =>
          updateItemCount(itemName, newItemCount, optionType)
        }
      />
    )
  })

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} Total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </>
  )
}

export default Options
