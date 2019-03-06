import { Component } from '@stencil/core'

@Component({
  tag: 'my-grid',
  styleUrl: 'my-grid.scss',
  shadow: false
})
export class myCard {
  render() {
    return (
      <div class="grid_wrapper">
        <slot name="grid-item" />
      </div>
    )
  }
}
