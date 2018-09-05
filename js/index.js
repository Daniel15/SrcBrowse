// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import sourceMap from 'source-map';
import nullthrows from 'nullthrows';

import App from './components/App';

sourceMap.SourceMapConsumer.initialize({
  'lib/mappings.wasm': 'https://unpkg.com/source-map@0.7.3/lib/mappings.wasm',
});
ReactDOM.render(<App />, nullthrows(document.getElementById('app')));
