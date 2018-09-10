// @flow

import React from 'react';

import classNames from './App.css';
import Files from './Files';
import {loadFromFile, loadFromURL} from '../SourceMap';

type InputFile = {|
  type: 'file',
|} | {|
  type: 'url',
  url: string,
|};

type Props = {||};
type State = {|
  error: ?Error,
  files: ?Map<string, ?string>,
  id: number,
  inputFile: InputFile,
  loading: boolean,
|};

export default class App extends React.Component<Props, State> {
  state = {
    error: null,
    files: null,
    // Used to re-render <Files /> when selected sourcemap changes
    id: 0,
    inputFile: {
      type: 'file',
    },
    loading: false,
  };

  render() {
    return (
      <div>
        {!this.state.files && !this.state.loading && (
          <div className={classNames.landingNotice}>
            Select a source map file to browse the files contained inside
            it.{' '}
            <a href="#" onClick={this._showExample}>See an example</a>
          </div>
        )}
        <label>
          <input
            type="radio"
            name="input_type"
            checked={this.state.inputFile.type === 'file'}
            onChange={this._showFileInput}
          />{' '}
          File
        </label>{' '}
        <label>
          <input
            type="radio"
            name="input_type"
            checked={this.state.inputFile.type === 'url'}
            onChange={this._showURLInput}
          />{' '}
          URL
        </label><br />

        {this.state.inputFile.type === 'file' && (
          <input accept=".map" type="file" onChange={this._onSelectFile} />
        )}
        {this.state.inputFile.type === 'url' && (
          <form onSubmit={this._onSelectURL}>
            <input
              type="text"
              placeholder="https://example.com/script.map"
              size={100}
              value={this.state.inputFile.url}
              onChange={this._setInputURL}
            />
            <button type="submit">Go</button>
          </form>
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

  _showFileInput = () => this.setState({
    files: null,
    inputFile: {type: 'file'},
  });
  _showURLInput = () => this.setState({
    files: null,
    inputFile: {type: 'url', url: ''},
  });
  _setInputURL = (evt: SyntheticEvent<HTMLInputElement>) => this.setState({
    inputFile: {
      type: 'url',
      url: evt.currentTarget.value,
    },
  });

  _onSelectFile = async (evt: SyntheticEvent<HTMLInputElement>) => {
    this.setState(state => ({
      id: state.id + 1,
      loading: true,
    }));
    const file = evt.currentTarget.files[0];
    try {
      const files = await loadFromFile(file);
      this.setState({
        error: null,
        loading: false,
        files,
      });
    } catch (error) {
      this.setState({
        error,
        files: null,
        loading: false,
      });
    }
  }

  _onSelectURL = async (evt: SyntheticEvent<HTMLInputElement>) => {
    evt.preventDefault();
    this.setState(state => ({
      id: state.id + 1,
      loading: true,
    }));
    try {
      if (this.state.inputFile.type !== 'url') {
        throw new Error('Unexpected type: ' + this.state.inputFile.type);
      }
      const files = await loadFromURL(this.state.inputFile.url);
      this.setState({
        error: null,
        loading: false,
        files,
      });
    } catch (error) {
      this.setState({
        error,
        files: null,
        loading: false,
      });
    }
  }

  _showExample = (evt: SyntheticEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    // Assume the last script tag is the main script, and get its map URL
    const scripts = document.getElementsByTagName('script');
    const lastScript = scripts[scripts.length - 1];
    const mapURL = lastScript.src.replace(/\.js$/, '.map');

    this.setState({
      inputFile: {
        type: 'url',
        url: mapURL,
      },
    }, () => {
      this._onSelectURL(evt);
    });
  }
}
