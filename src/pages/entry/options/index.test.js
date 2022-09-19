import { render, screen } from '../../../test-utils/testing-library'
import Options from '.'

describe('Options', () => {
  test('displays image for each scoop option', async () => {
    render(<Options optionType="scoops" />)

    const scoopImages = await screen.findAllByRole('img', {
      name: /scoop$/i,
    })
    expect(scoopImages).toHaveLength(2)

    // confirm alt text of images
    const altText = scoopImages.map((element) => element.alt)
    expect(altText).toEqual(['Chocolate Scoop', 'Vanilla Scoop'])
  })
  test('displays image for each topping option', async () => {
    render(<Options optionType="toppings" />)

    const scoopImages = await screen.findAllByRole('img', {
      name: /Topping$/i,
    })
    expect(scoopImages).toHaveLength(3)

    // confirm alt text of images
    const altText = scoopImages.map((element) => element.alt)
    expect(altText).toEqual([
      'Cherries Topping',
      'M&Ms Topping',
      'Hot Fudge Topping',
    ])
  })
})
