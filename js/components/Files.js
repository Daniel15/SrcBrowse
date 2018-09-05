// @flow

import React from 'react';

import classNames from './Files.css';
import Code from './Code';
import FileTree from './FileTree';

import buildTree from '../buildTree';

type Props = {|
  files: Map<string, ?string>,
|};

type State = {|
  selectedFile: ?string,
  selectedDir: $ReadOnlyArray<string>,
|};

export default class Files extends React.Component<Props, State> {
  state = {
    selectedDir: [],
    selectedFile: null,
  };

  render() {
    return (
      <div className={classNames.filesContainer}>
        <h2>{this._renderTitle()}</h2>
        <div className={classNames.files}>
          <FileTree
            selectedDir={this.state.selectedDir}
            selectedFile={this.state.selectedFile}
            tree={buildTree(Array.from(this.props.files.keys()))}
            onSelectDir={this._onSelectDir}
            onSelectFile={this._onSelectFile}
          />
          {this.state.selectedFile && (
            <Code
              code={this.props.files.get(this.state.selectedFile)}
            />
          )}
        </div>
      </div>
    );
  }

  _renderTitle() {
    return this.state.selectedDir.length === 0
      ? '/'
      : '/' + this.state.selectedDir.join('/') + '/';
  }

  _onSelectDir = (path: $ReadOnlyArray<string>) => {
    this.setState({selectedDir: path});
  }

  _onSelectFile = (path: string) => {
    this.setState({selectedFile: path});
  }
}
