// @flow

// TODO: Flow type this
import Prism from 'prismjs';
import React from 'react';

import classNames from './Files.css';

function runPrism(code: string): {|__html: string|} {
  return {__html: Prism.highlight(code, Prism.languages.javascript)};
}

type Props = {|
  code: ?string,
|};

export default class Code extends React.PureComponent<Props> {
  render() {
    const code = this.props.code || '// File is empty';
    return (
      <pre className={classNames.code + ' language-javascript'}>
        <code
          className="language-javascript"
          dangerouslySetInnerHTML={runPrism(code)}
        />
      </pre>
    );
  }
}
