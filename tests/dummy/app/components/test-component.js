import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TimeInputComponent extends Component {
  picture = 'lady.jpg';
  @tracked width = 160;
  @tracked tag = 'logo';

  @action
  changeWidth(input) {
    this.width = input.target.value;
  }

  @action
  setResourceTag(input) {
    this.tag = input.target.value;
  }
  
}
