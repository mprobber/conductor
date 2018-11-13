// @flow
import React from 'react';
import { observer } from 'mobx-react';
import EnvironmentVariableStore from '../stores/EnvironmentVariableStore';
import ServiceStore from '../stores/ServiceStore';

class Root extends React.Component<{}> {
  ctr: number = 0;
  componentDidMount() {
    EnvironmentVariableStore.fetch();
    ServiceStore.fetch();
  }

  addEnvironmentVariable = () => {
    const environmentVariable = {
      name: `foo${this.ctr}`,
      value: `bar${Math.floor(Math.random() * 100)}`,
    };
    this.ctr++;
    EnvironmentVariableStore.updateOne(environmentVariable);
  };

  addService = () => {
    const service = {
      name: `service${this.ctr}`,
      command: 'ls',
      environmentVariableNames: ['foo0', 'foo1'],
    };
    this.ctr++;
    ServiceStore.updateOne(service);
  };

  render() {
    window.services = ServiceStore.services;
    return (
      <div>
        {JSON.stringify(EnvironmentVariableStore.environmentVariables)}
        <button onClick={this.addEnvironmentVariable}>agh</button>
        <button onClick={this.addService}>blurp</button>
        {ServiceStore.services.map(service => {
          console.log(service);
          return (
            <div key={service.name}>
              {service.name}
              <div>
                {service.environmentVariables.map(environmentVariable => (
                  <div key={environmentVariable.name}>
                    {environmentVariable.name} - {environmentVariable.value}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default observer(Root);
