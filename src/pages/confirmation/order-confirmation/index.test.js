import OrderConfirmation from '.'
import { rest } from 'msw'
import { server } from '../../../mocks/server'
import { render, screen } from '../../../test-utils/testing-library'

describe('catch error', () => {
  test('should handle error from server', async () => {
    server.resetHandlers(
      rest.post('http:/localhost:3030/order', (req, res, ctx) => {
        return ctx.status(500)
      })
    )
    render(<OrderConfirmation setOrderPhase={jest.fn()} />)

    const alert = await screen.findByRole('alert')

    expect(alert).toBeInTheDocument()
  })
})
