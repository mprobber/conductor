// @flow
import { observable, computed } from 'mobx';
import type EnvironmentVariable from '../models/EnvironmentVariable';
import EnvironmentVariableStore from '../stores/EnvironmentVariableStore';
export default class Service {
  @observable
  name: string;
  @observable
  command: string;
  @observable
  environmentVariableNames: string[] = [];
  @observable
  status: 'stopped' | 'running';

  constructor(params: {
    name: string,
    command: string,
    status: 'stopped' | 'running',
    environmentVariableNames: string[],
  }) {
    Object.assign(this, params);
  }

  @computed
  get environmentVariables(): EnvironmentVariable[] {
    return EnvironmentVariableStore.environmentVariables.filter(({ name }) => {
      return this.environmentVariableNames.includes(name);
    });
  }
}
