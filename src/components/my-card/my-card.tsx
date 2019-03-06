import { Component } from '@stencil/core'

@Component({
  tag: 'my-card',
  styleUrl: 'my-card.scss',
  shadow: false
})
export class myCard {
  render() {
    return (
      <div class="card">
        <slot name="card-image" />
        <div class="card_content">
          <slot name="card-eyebrow-heading" />
          <slot name="card-heading" />
          <slot name="card-location" />
        </div>
      </div>
    )
  }
}
