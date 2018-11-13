// @flow
import { observable, action } from 'mobx';
import request from 'superagent';
import { API_URL } from '../constants';
import Service from '../models/Service';

type BodyType = Array<{
  name: string,
  command: string,
  environmentVariableNames: string[],
}>;

class ServiceStore {
  @observable
  services: Service[] = [];

  async fetch() {
    const { body }: { body: BodyType } = await request.get(
      `${API_URL}/services`,
    );
    this.updateFromBody(body);
  }

  updateOne = async (params: {
    name: string,
    command: string,
    environmentVariableNames: string[],
  }) => {
    const { body }: { body: BodyType } = await request
      .post(`${API_URL}/services`)
      .send(params);
    this.updateFromBody(body);
  };

  @action
  updateFromBody = (
    values: Array<{
      name: string,
      command: string,
      environmentVariableNames: string[],
    }>,
  ) => {
    values.forEach(params => {
      const currentService = this.services.find(
        service => service.name === params.name,
      );

      if (currentService) {
        Object.assign(currentService, params);
      } else {
        this.services.push(new Service({ status: 'stopped', ...params }));
      }
    });
  };
}

export default new ServiceStore();
