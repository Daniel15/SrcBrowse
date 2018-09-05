// @flow

import React from 'react';
import nullthrows from 'nullthrows';

import type {TreeNode} from '../buildTree';
import classNames from './Files.css';

type Props = {|
  selectedDir: $ReadOnlyArray<string>,
  selectedFile: ?string,
  tree: TreeNode,

  onSelectDir: (path: $ReadOnlyArray<string>) => void,
  onSelectFile: (path: string) => void,
|};

export default class FileTree extends React.PureComponent<Props> {
  render() {
    const selectedPath = this.props.selectedDir;

    let selectedNode = this.props.tree;
    selectedPath.forEach(piece => {
      selectedNode = nullthrows(selectedNode.children.get(piece));
    });

    const nodes = [];
    if (selectedPath.length !== 0) {
      nodes.push(
        <DirNode
          key=".."
          name=".."
          path={selectedPath.slice(0, selectedPath.length - 1)}
          onSelect={this.props.onSelectDir}
        />
      );
    }
    selectedNode.children.forEach((node, name) => {
      if (node.type === 'dir') {
        nodes.push(
          <DirNode
            key={name}
            name={name}
            path={selectedPath.concat(name)}
            onSelect={this.props.onSelectDir}
          />
        );
      } else {
        nodes.push(
          <FileNode
            key={name}
            name={name}
            node={node}
            selectedFile={this.props.selectedFile}
            onSelect={this.props.onSelectFile}
          />);
      }
    });

    return (
      <ul className={classNames.tree}>
        {nodes}
      </ul>
    );
  }
}

type DirNodeProps = {|
  name: string,
  path: $ReadOnlyArray<string>,

  onSelect: (path: $ReadOnlyArray<string>) => void,
|}

class DirNode extends React.Component<DirNodeProps> {
  render() {
    return (
      <li><a href="#" onClick={this._onSelect}>{this.props.name}/</a></li>
    );
  }

  _onSelect = (evt) => {
    evt.preventDefault();
    this.props.onSelect(this.props.path);
  }
}

type FileNodeProps = {|
  name: string,
  node: TreeNode,
  selectedFile: ?string,

  onSelect: (path: string) => void,
|};

class FileNode extends React.Component<FileNodeProps> {
  render() {
    let name = this.props.name;
    if (this.props.selectedFile === this.props.node.path) {
      name = <strong>{name}</strong>;
    }
    return (
      <li><a href="#" onClick={this._onSelect}>{name}</a></li>
    );
  }

  _onSelect = (evt) => {
    evt.preventDefault();
    this.props.onSelect(this.props.node.path);
  }
}
