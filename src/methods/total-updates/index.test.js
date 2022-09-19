import { render, screen } from '../../test-utils/testing-library'
import userEvent from '@testing-library/user-event'

import Options from '../../pages/entry/options'
import OrderEntry from '../../pages/entry/orderEntry'

describe('update totals', () => {
  test('updates subtotal', async () => {
    render(<Options optionType="scoops" />)
    const scoopsSubTotal = screen.getByText('Scoops total: $', {
      exact: false,
    })

    // check scoops starts at 0.00
    expect(scoopsSubTotal).toHaveTextContent('0.00')

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })

    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '1')
    expect(scoopsSubTotal).toHaveTextContent('2.00')

    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    })
    userEvent.clear(chocolateInput)
    userEvent.type(chocolateInput, '2')

    expect(scoopsSubTotal).toHaveTextContent('6.00')
  })

  test('update toppings subtotal when toppings change', async () => {
    render(<Options optionType="toppings" />)

    const toppingsTotal = screen.getByText('Toppings total: $', {
      exact: false,
    })

    expect(toppingsTotal).toHaveTextContent('0.00')

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    })

    userEvent.click(cherriesCheckbox)
    expect(toppingsTotal).toHaveTextContent('1.5')

    const hotFudgeCheckBox = await screen.findByRole('checkbox', {
      name: 'Hot Fudge',
    })

    userEvent.click(hotFudgeCheckBox)
    expect(toppingsTotal).toHaveTextContent('3.0')

    userEvent.click(hotFudgeCheckBox)
    expect(toppingsTotal).toHaveTextContent('1.5')
  })

  describe('grand total', () => {
    test('grand total updates correctly if sccop is added first', async () => {
      render(<OrderEntry />)

      const grandTotal = screen.getByRole('heading', {
        name: /Grand total: \$/i,
      })

      // check starts at 0.00
      expect(grandTotal).toHaveTextContent('0.00')

      const vanillaInput = await screen.findByRole('spinbutton', {
        name: 'Vanilla',
      })

      userEvent.clear(vanillaInput)
      userEvent.type(vanillaInput, '2')

      expect(grandTotal).toHaveTextContent('4.00')

      const cherriesCheckbox = await screen.findByRole('checkbox', {
        name: 'Cherries',
      })
      userEvent.click(cherriesCheckbox)

      expect(grandTotal).toHaveTextContent('5.50')
    })

    test('grand total updates correctly is toppings are added first', async () => {
      render(<OrderEntry />)

      const grandTotal = screen.getByRole('heading', {
        name: /Grand total: \$/i,
      })

      const cherriesCheckbox = await screen.findByRole('checkbox', {
        name: 'Cherries',
      })
      userEvent.click(cherriesCheckbox)

      expect(grandTotal).toHaveTextContent('1.50')

      const vanillaInput = await screen.findByRole('spinbutton', {
        name: 'Vanilla',
      })

      userEvent.clear(vanillaInput)
      userEvent.type(vanillaInput, '2')

      expect(grandTotal).toHaveTextContent('5.50')
    })

    test('grand total updates properly if item is removed', async () => {
      render(<OrderEntry />)

      const grandTotal = screen.getByRole('heading', {
        name: /Grand total: \$/i,
      })

      const cherriesCheckbox = await screen.findByRole('checkbox', {
        name: 'Cherries',
      })
      userEvent.click(cherriesCheckbox)

      expect(grandTotal).toHaveTextContent('1.50')

      const vanillaInput = await screen.findByRole('spinbutton', {
        name: 'Vanilla',
      })

      userEvent.clear(vanillaInput)
      userEvent.type(vanillaInput, '2')

      expect(grandTotal).toHaveTextContent('5.50')

      userEvent.clear(vanillaInput)
      userEvent.type(vanillaInput, '1')
      expect(grandTotal).toHaveTextContent('3.50')

      userEvent.click(cherriesCheckbox)
      expect(grandTotal).toHaveTextContent('2.00')
    })
  })
})
