import { Element, Component, Event, EventEmitter, State } from '@stencil/core'
import Lightpick from '../../../node_modules/lightpick/lightpick'

import * as data from 'tags.json'

@Component({
  tag: 'my-filters',
  styleUrl: 'my-filters.scss',
  shadow: false
})
export class myFilters {
  @State() startDatePicker
  @State() endDatePicker

  @Element() el: HTMLElement

  @Event() updateEndDate: EventEmitter
  @Event() updateStartDate: EventEmitter
  @Event() updateFilterTag: EventEmitter

  /*
   *
   * initLightpick()
   * Prepopulate dates
   *
   */
  private initLightpick() {
    const startDatePicker = new Lightpick({
      field: this.el.querySelector('.start_date_picker'),
      parentEl: this.el.querySelector('.start_date_picker-wrapper'),
      singleDate: true,
      footer: true,
      numberOfMonths: 1,
      numberOfColumns: 1,
      format: 'MM/D/YYYY',
      minDate: new Date(),
      onSelect: date => {
        date ? this.updateStartDate.emit(date.utc()) : this.updateStartDate.emit('clear')
      }
    })

    const endDatePicker = new Lightpick({
      field: this.el.querySelector('.end_date_picker'),
      parentEl: this.el.querySelector('.end_date_picker-wrapper'),
      singleDate: true,
      footer: true,
      numberOfMonths: 1,
      numberOfColumns: 1,
      format: 'MM/D/YYYY',
      minDate: new Date(),
      onSelect: date => {
        date ? this.updateEndDate.emit(date.utc()) : this.updateEndDate.emit('clear')
      }
    })

    this.startDatePicker = startDatePicker
    this.endDatePicker = endDatePicker
  }

  /*
   *
   * setInterestFilter()
   * emit value change
   *
   */
  private setTagFilter(e) {
    this.updateFilterTag.emit(e.currentTarget.value)
  }

  componentDidLoad() {
    this.initLightpick()
  }

  render() {
    return (
      <div class="events_filters-wrapper">
        <div class="row_gt-sm justify_sb">
          <div class="swell_all-sm filter_item">
            <label>From Date</label>
            <div class="start_date_picker-wrapper">
              <input type="text" class="start_date_picker" />
            </div>
          </div>

          <div class="swell_all-sm filter_item">
            <label>To Date</label>
            <div class="end_date_picker-wrapper">
              <input type="text" class="end_date_picker" />
            </div>
          </div>

          <div class="swell_all-sm filter_item">
            <label>Filter By Interest</label>
            <div class="select_wrapper">
              <select onChange={e => this.setTagFilter(e)}>
                <option value="clear">All Interests</option>
                {Object.keys(data['tags']).map(key => (
                  <option value={key}>{data['tags'][key].label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
