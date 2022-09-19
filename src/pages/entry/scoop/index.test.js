import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ScoopOption from '.'

describe('scoops', () => {
  test('invalidates on incorrect numbers of scoops', async () => {
    render(<ScoopOption name="Vanilla" updateItemCount={jest.fn()} />)

    const VanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })

    userEvent.clear(VanillaInput)
    userEvent.type(VanillaInput, '1')

    expect(VanillaInput).not.toHaveClass('is-invalid')

    userEvent.clear(VanillaInput)
    userEvent.type(VanillaInput, '1.5')

    expect(VanillaInput).toHaveClass('is-invalid')

    userEvent.clear(VanillaInput)
    userEvent.type(VanillaInput, '-1')

    expect(VanillaInput).toHaveClass('is-invalid')

    userEvent.clear(VanillaInput)
    userEvent.type(VanillaInput, '20')

    expect(VanillaInput).toHaveClass('is-invalid')
  })
})
