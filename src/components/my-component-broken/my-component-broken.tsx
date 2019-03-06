import { Component, State, Listen } from '@stencil/core'
import * as data from 'cards.json'

@Component({
  tag: 'my-component-broken',
  styleUrl: 'my-component-broken.scss',
  shadow: false
})
export class MyComponent {
  @State() startDate
  @State() endDate
  @State() tag

  @Listen('updateStartDate')
  filterStartDate(e) {
    if (e.detail != 'clear') {
      this.startDate = new Date(e.detail)
    } else {
      this.startDate = null
    }
  }

  @Listen('updateEndDate')
  filterEndDate(e) {
    if (e.detail != 'clear') {
      this.endDate = new Date(e.detail)
    } else {
      this.endDate = null
    }
  }

  @Listen('updateFilterTag')
  filterByTag(e) {
    if (e.detail != 'clear') {
      this.tag = e.detail
    } else {
      this.tag = null
    }
  }

  /*
   * getCardData
   * sets card state
   *
   */
  private getCardData() {
    let alteredData = data['cards']

    if (this.startDate) {
      alteredData = alteredData.filter(card => this.isDateBefore(card['startDate'], this.startDate))
    }

    if (this.endDate) {
      alteredData = alteredData.filter(card => this.isDateAfter(card['startDate'], this.endDate))
    }

    if (this.tag) {
      alteredData = alteredData.filter(card => this.hasTagMatch(card['tags'], this.tag))
    }

    return alteredData ? alteredData : data['cards']
  }

  /*
   * getFormattedDate
   * formats post date
   *
   */
  private getFormattedDate(string) {
    var year = string.substring(0, 4)
    var month = string.substring(4, 6)
    var day = string.substring(6, 8)
    return new Date(year, month - 1, day)
  }

  /*
   * isDateBefore
   * returns boolean if date is before/after start/end
   *
   */
  private isDateBefore(cardDate, compareDate) {
    const cardDateFormatted = this.getFormattedDate(cardDate)
    return compareDate < cardDateFormatted
  }

  /*
   * isDateAfter
   * returns boolean if date is before/after start/end
   *
   */
  private isDateAfter(cardDate, compareDate) {
    const cardDateFormatted = this.getFormattedDate(cardDate)
    return compareDate > cardDateFormatted
  }

  /*
   * hasTagMatch
   * returns boolean if date is before/after start/end
   *
   */
  private hasTagMatch(cardTags, selectedTag) {
    let contains = false
    for (let index = 0; index < cardTags.length; index++) {
      if (cardTags[index] === selectedTag) {
        contains = true
        break
      }
    }
    return contains
  }

  /*
   * showZeroState
   * passes boolean to cards component
   */
  private showZeroState() {
    return this.getCardData().length ? false : true
  }

  render() {
    return [
      <my-filters />,
      <my-grid>
        {this.getCardData().map(card => (
          <my-card slot="grid-item">
            {/* conditional slots causing bug */}
            {card['image'] ? <img slot="card-image" src={card['image']} /> : null}

            {card['eyebrowHeading'] ? (
              <h2 slot="card-eyebrow-heading">{card['eyebrowHeading']}</h2>
            ) : null}

            {card['heading'] ? <h1 slot="card-heading">{card['heading']}</h1> : null}

            {card['locationCopy'] ? <p slot="card-location">{card['locationCopy']}</p> : null}

            {/* <img slot="card-image" src={card['image']} />

            <h2 slot="card-eyebrow-heading">{card['eyebrowHeading']}</h2>

            <h1 slot="card-heading">{card['heading']}</h1>

            <p slot="card-location">{card['locationCopy']}</p> */}
          </my-card>
        ))}
      </my-grid>,
      <div>
        {this.showZeroState() ? (
          <div class="zero_state">
            <h2>Whoops! Nothing Found</h2>
            <h3>
              Check back later or <a>reset</a> the filters
            </h3>
          </div>
        ) : null}
      </div>
    ]
  }
}
