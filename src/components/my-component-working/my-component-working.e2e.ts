import { newE2EPage } from '@stencil/core/testing'

describe('my-component-working', () => {
  it('renders', async () => {
    const page = await newE2EPage()

    await page.setContent('<my-component-working></my-component-working>')
    const element = await page.find('my-component-working')
    expect(element).toHaveClass('hydrated')
  })
})
