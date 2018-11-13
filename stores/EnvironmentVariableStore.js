// @flow
import { observable, action } from 'mobx';
import { type Store } from './interface';
import request from 'superagent';
import EnvironmentVariable from '../models/EnvironmentVariable';
import { API_URL } from '../constants';

class EnvironmentVariableStore implements Store<EnvironmentVariable> {
  @observable
  environmentVariables: EnvironmentVariable[] = [];

  async fetch() {
    const { body } = await request.get(`${API_URL}/environment-variables`);
    this.updateFromBody(body);
  }

  updateOne = async (params: { name: string, value: string }) => {
    const { body } = await request
      .post(`${API_URL}/environment-variables`)
      .send(params);
    this.updateFromBody(body);
  };

  @action
  updateFromBody = (values: Array<{ name: string, value: string }>) => {
    values.forEach(params => {
      const currentVariable = this.environmentVariables.find(
        variable => variable.name === params.name,
      );

      if (currentVariable) {
        currentVariable.value = params.value;
      } else {
        this.environmentVariables.push(new EnvironmentVariable(params));
      }
    });
  };
}

export default new EnvironmentVariableStore();
