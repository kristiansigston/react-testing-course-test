import { createContext, useContext, useState, useMemo, useEffect } from 'react'
import pricePerItem from '../../constants'
import formatCurrency from '../../utilities/format-currency'

const OrderDetails = createContext()

// craete custom hook

export const useOrderDetails = () => {
  const context = useContext(OrderDetails)

  if (!context) {
    throw new Error(
      'useOrderDetails must be used within an OrderDetailsProvider'
    )
  }

  return context
}

const calculateSubTotal = (optionType, optionCounts) => {
  let optionCount = 0
  for (const count of optionCounts[optionType].values() || 0) {
    optionCount += count
  }

  return optionCount * pricePerItem[optionType]
}

export const OrderDetailsProvider = (props) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  })

  const zeroCurrency = formatCurrency(0)

  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  })

  useEffect(() => {
    const scoopsSubTotal = calculateSubTotal('scoops', optionCounts)
    const toppingsSubTotal = calculateSubTotal('toppings', optionCounts)
    const grandTotal = scoopsSubTotal + toppingsSubTotal
    setTotals({
      scoops: formatCurrency(scoopsSubTotal),
      toppings: formatCurrency(toppingsSubTotal),
      grandTotal: formatCurrency(grandTotal),
    })
  }, [optionCounts])

  const value = useMemo(() => {
    const updateItemCounts = (itemName, newItemCount, optionType) => {
      const newOptionCounts = { ...optionCounts }

      const optionCountsMap = optionCounts[optionType]
      optionCountsMap.set(itemName, parseInt(newItemCount, 10))

      setOptionCounts(newOptionCounts)
    }

    const resetOrder = () => {
      setOptionCounts({ scoops: new Map(), toppings: new Map() })
    }

    return [{ ...optionCounts, totals }, updateItemCounts, resetOrder]
  }, [optionCounts, totals])

  return <OrderDetails.Provider value={value} {...props} />
}
