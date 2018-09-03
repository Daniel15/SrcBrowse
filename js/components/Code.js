import classNames from './Files.css';

function runPrism(code) {
  return {__html: Prism.highlight(code, Prism.languages.javascript)};
}

export default class Code extends React.PureComponent {
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
