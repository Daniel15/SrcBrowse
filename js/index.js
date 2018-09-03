import App from './components/App';

sourceMap.SourceMapConsumer.initialize({
  'lib/mappings.wasm': 'https://unpkg.com/source-map@0.7.3/lib/mappings.wasm',
});
ReactDOM.render(<App />, document.getElementById('app'));
