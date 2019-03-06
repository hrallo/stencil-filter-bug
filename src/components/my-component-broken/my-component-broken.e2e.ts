import { newE2EPage } from '@stencil/core/testing'

describe('my-component-broken', () => {
  it('renders', async () => {
    const page = await newE2EPage()

    await page.setContent('<my-component-broken></my-component-broken>')
    const element = await page.find('my-component-broken')
    expect(element).toHaveClass('hydrated')
  })
})
