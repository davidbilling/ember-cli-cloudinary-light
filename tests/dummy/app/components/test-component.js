import Component from '@ember/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class TimeInputComponent extends Component {

  picture = 'lady.jpg';
  @tracked width = 160;
  @action
  changeWidth(input) {
    this.width = input.target.value;
  }
}
