// @flow
import React from 'react';
import ReactDom from 'react-dom';
import Root from './Root';

const rootNode = document.createElement('div');
if (document.body) document.body.appendChild(rootNode);
ReactDom.render(<Root />, rootNode);
