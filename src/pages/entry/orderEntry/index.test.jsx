import { render, screen, waitFor } from '../../../test-utils/testing-library'

import OrderEntry from '.'
import { rest } from 'msw'
import { server } from '../../../mocks/server'
import userEvent from '@testing-library/user-event'

describe('OrderEntry', () => {
  test('handles errors from scoops and toppings endpoint', async () => {
    server.resetHandlers(
      rest.get('http:/localhost:3030/scoops', (req, res, ctx) => {
        return ctx.status(500)
      }),
      rest.get('http:/localhost:3030/toppings', (req, res, ctx) => {
        return ctx.status(500)
      })
    )
    render(<OrderEntry setOrderPhase={jest.fn()} />)

    await waitFor(async () => {
      const alerts = await screen.findAllByRole('alert')

      expect(alerts).toHaveLength(2)
    })
    server.resetHandlers()
  })
  test('should enable and disable order button relative to scoops', async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />)

    const orderButton = screen.getByRole('button', {
      name: /order sundae/i,
    })

    expect(orderButton).toBeDisabled()

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })

    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '1')

    expect(orderButton).toBeEnabled()

    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '0')

    expect(orderButton).toBeDisabled()
  })
})
