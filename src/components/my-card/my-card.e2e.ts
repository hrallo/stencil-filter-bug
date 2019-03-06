import { newE2EPage } from '@stencil/core/testing'

describe('my-card', () => {
  it('renders', async () => {
    const page = await newE2EPage()

    await page.setContent('<my-card></my-card>')
    const element = await page.find('my-card')
    expect(element).toHaveClass('hydrated')
  })
})
