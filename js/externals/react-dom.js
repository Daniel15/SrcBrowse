if (process.env.NODE_ENV === 'production') {
  // Loaded from CDN
  module.exports = ReactDOM;
} else {
  module.exports = require('/node_modules/react-dom');
}
