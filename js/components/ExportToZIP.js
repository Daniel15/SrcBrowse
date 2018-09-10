// @flow

import type {TreeNode} from '../buildTree';

import React from 'react';

type Props = {|
  files: Map<string, ?string>,
  tree: TreeNode,
|};

type State = {|
  error: ?Error,
  isLoading: boolean,
|};

export default class ExportToZIP extends React.PureComponent<Props, State> {
  state = {
    error: null,
    isLoading: false,
  };

  render() {
    return (
      <span>
        <button disabled={this.state.isLoading} onClick={this._runExport}>
          {this.state.isLoading ? 'Loading...': 'Save as ZIP'}
        </button>
        {this.state.error && <span>ERROR: {this.state.error.message}</span>}
      </span>
    );
  }

  _runExport = async () => {
    this.setState({error: null, isLoading: true});
    try {
      const {default: saveAsZIP} = await import('../saveAsZIP');
      await saveAsZIP(this.props.tree, this.props.files);
    } catch (error) {
      this.setState({error});
    } finally {
      this.setState({isLoading: false});
    }
  }
}
