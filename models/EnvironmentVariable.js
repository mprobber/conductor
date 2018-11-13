// @flow
import { observable } from 'mobx';
export default class EnvironmentVariable {
  @observable
  name: string;
  @observable
  value: string;

  constructor(options: { name: string, value: string }) {
    Object.assign(this, options);
  }
}
