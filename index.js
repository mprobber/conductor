// @flow
import React from 'react';
import ReactDom from 'react-dom';
import Root from './Root';

const rootNode = document.querySelector('#root');

if (rootNode) {
  ReactDom.render(<Root />, rootNode);
} else {
  throw new Error('Could not find root node');
}
