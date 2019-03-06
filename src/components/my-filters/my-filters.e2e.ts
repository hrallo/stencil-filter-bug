import { newE2EPage } from '@stencil/core/testing'

describe('my-filters', () => {
  it('renders', async () => {
    const page = await newE2EPage()

    await page.setContent('<my-filters></my-filters>')
    const element = await page.find('my-filters')
    expect(element).toHaveClass('hydrated')
  })
})
