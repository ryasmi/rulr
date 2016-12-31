const fs = require('fs');
const docTokens = require('./ts.json');

const renderToken = token => {
  const functionKind = 64;

  switch (token.kind) {
    case functionKind: {
      const source = token.sources && renderSources(token.sources);
      const sig = renderSignatures(token.signatures);
      const kind = renderKind(token.kindString);
      return `${kind}[${token.name}](${source}) = ${sig}`;
    } default: {
      const source = token.sources && renderSources(token.sources);
      const sig = renderType(token.type);
      const kind = renderKind(token.kindString);
      return `${kind}[${token.name}](${source}) = ${sig}`;
    }
  }
};

const renderKind = kindString => {
  if (kindString === 'Type alias') return `${kindString} `;
  return '';
};

const renderParameter = param => {
  const sig = renderType(param.type);
  return `${param.name}: ${sig}`;
};

const renderSources = sources => {
  const source = sources[0];
  return `../${source.fileName}#L${source.line}`;
};

const renderType = type => {
  switch (type.type) {
    case 'instrinct':
      return `**${type.name}${type.isArray ? '[]' : ''}**`;
    case 'reflection':
      return renderDeclaration(type.declaration);
    case 'reference':
      return `**${type.name}**`;
  }
};

const renderSignatures = signatures => {
  const signature = signatures[0];
  const callKind = 4096;
  const indexSignature = 8192;

  switch (signature.kind) {
    case callKind:
      const params = signature.parameters.map(renderParameter);
      const returnType = renderType(signature.type);
      return `(${params.join(', ')}) => ${returnType}`;
    case indexSignature:
      const keyToken = renderParameter(signature.parameters[0]);
      const valueType = renderType(signature.type);
      return `{[${keyToken}]: ${valueType}}`;
    default:
      return signature;
  }
};

const renderDeclaration = declaration => {
  const literalKind = 65536;

  switch (declaration.kind) {
    case literalKind:
      if (declaration.signatures !== undefined) {
        return renderSignatures(declaration.signatures);
      } else {
        return renderSignatures(declaration.indexSignature);
      }
    default:
      return declaration;
  }
};

const renderTokens = tokens => {
  return tokens.map(t =>
    `- ${renderToken(t)}`
  ).join('\r\n');
};

const renderedTokens = renderTokens(docTokens.children[0].children);
const readme = `# API\r\n${renderedTokens}\r\n`;

fs.writeFile('docs/readme.md', readme, function(err) {
    if (err) return console.error(err);
    console.log('The file was saved!');
});
