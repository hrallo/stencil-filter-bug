import { Component, State, Listen } from '@stencil/core'
import * as data from 'cards.json'

@Component({
  tag: 'my-component-working',
  styleUrl: 'my-component-working.scss',
  shadow: false
})
export class MyComponentWorking {
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

  render() {
    return [
      <my-filters />,
      <div class="grid_wrapper">
        {this.getCardData().map(card => (
          <div class="card">
            <img src={card['image']} />
            <div class="card_content">
              <h2>{card['eyebrowHeading']}</h2>
              <h1>{card['heading']}</h1>
              <p>{card['locationCopy']}</p>
            </div>
          </div>
        ))}
      </div>
    ]
  }
}
