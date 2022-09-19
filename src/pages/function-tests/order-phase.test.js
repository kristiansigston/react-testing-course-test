import App from '../../App'
import { screen, render } from '../../test-utils/testing-library'
import userEvent from '@testing-library/user-event'

describe('order phase', () => {
  test('should do stuff', async () => {
    render(<App />)

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })

    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '1')

    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    })

    userEvent.clear(chocolateInput)
    userEvent.type(chocolateInput, '2')

    const cherriesCheckBox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    })

    userEvent.click(cherriesCheckBox)

    const orderSummaryButton = screen.getByRole('button', {
      name: /order sundae/i,
    })

    userEvent.click(orderSummaryButton)

    const summaryHeading = screen.getByRole('heading', {
      name: 'Order Summary',
    })
    expect(summaryHeading).toBeInTheDocument()

    const scoopsHeading = screen.getByRole('heading', {
      name: 'Scoops: $6.00',
    })
    expect(scoopsHeading).toBeInTheDocument()
    const toppingsHeading = screen.getByRole('heading', {
      name: 'Toppings: $1.50',
    })
    expect(toppingsHeading).toBeInTheDocument()

    expect(screen.getByText('2 Chocolate')).toBeInTheDocument()
    expect(screen.getByText('1 Vanilla')).toBeInTheDocument()
    expect(screen.getByText('Cherries')).toBeInTheDocument()

    const tcCheckbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    })

    expect(tcCheckbox).toBeInTheDocument()

    userEvent.click(tcCheckbox)

    const confirmOrderButton = screen.getByRole('button', {
      name: /confirm order/i,
    })

    expect(confirmOrderButton).toBeInTheDocument()

    userEvent.click(confirmOrderButton)

    const orderNumberLoading = screen.getByText(/loading/i)
    expect(orderNumberLoading).toBeInTheDocument()

    const thankYouHeader = await screen.findByRole('heading', {
      name: /thank you/i,
    })

    expect(thankYouHeader).toBeInTheDocument()

    const notLoading = screen.queryByText('loading')
    expect(notLoading).not.toBeInTheDocument()

    const orderNumber = await screen.findByText(/order number/i)
    expect(orderNumber).toBeInTheDocument()

    const newOrderButton = screen.getByRole('button', {
      name: /create new order/i,
    })

    userEvent.click(newOrderButton)

    const scoopsTotal = screen.getByText('Scoops Total: $0.00')
    expect(scoopsTotal).toBeInTheDocument()
    const toppingsTotal = screen.getByText('Toppings Total: $0.00')
    expect(toppingsTotal).toBeInTheDocument()

    await screen.findByRole('spinbutton', { name: 'Vanilla' })
    await screen.findByRole('checkbox', { name: 'Cherries' })
  })
  it('should not have the toppings on the summary page if there are no toppings selected', async () => {
    render(<App />)
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })

    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '1')

    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    })

    userEvent.clear(chocolateInput)
    userEvent.type(chocolateInput, '2')

    const orderSummaryButton = screen.getByRole('button', {
      name: /order sundae/i,
    })

    userEvent.click(orderSummaryButton)

    const summaryHeading = screen.getByRole('heading', {
      name: 'Order Summary',
    })
    expect(summaryHeading).toBeInTheDocument()

    const scoopsHeading = screen.getByRole('heading', {
      name: 'Scoops: $6.00',
    })

    const toppingsHeading = screen.queryByRole('heading', {
      name: /toppings/i,
    })
    expect(toppingsHeading).not.toBeInTheDocument()

    expect(scoopsHeading).toBeInTheDocument()
  })
})
