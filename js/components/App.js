import classNames from './App.css';
import Files from './Files';

import getFilesFromSourceMap from '../getFilesFromSourceMap';

export default class App extends React.Component {
  state = {
    error: null,
    files: null,
    // Used to re-render <Files /> when selected sourcemap changes
    id: 0,
    loading: false,
  };

  render() {
    return (
      <div>
        Source Map:{' '}
        <input accept=".map" type="file" onChange={this._onSelectFile} />
        {!this.state.files && !this.state.loading && (
          <div className={classNames.landingNotice}>
            Select a source map file above to browse the files contained inside
            it.
          </div>
        )}
        {this.state.loading && (
          <div className={classNames.landingNotice}>Loading...</div>
        )}
        {this.state.error && (
          <div className={classNames.error}>
            ERROR: {this.state.error.message}
          </div>
        )}
        {this.state.files && (
          <Files
            key={this.state.id}
            files={this.state.files}
          />
        )}
      </div>
    );
  }

  _onSelectFile = (evt) => {
    this.setState(state => ({id: state.id + 1, loading: true}));
    const file = evt.target.files[0];
    getFilesFromSourceMap(file).then(
      files => this.setState({
        error: null,
        loading: false,
        files,
      }),
      error => this.setState({
        error,
        files: null,
        loading: false,
      })
    );
  }
}
