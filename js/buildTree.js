export default function buildTree(files) {
  const tree = {
    name: '/',
    path: '',
    type: 'dir',
    children: new Map(),
  };
  files
    .sort()
    .forEach(fullPath => {
      const namePieces = fullPath.replace(/\\/g, '/').split('/');
      const fileName = namePieces.pop();
      let curr = tree;
      namePieces.forEach(piece => {
        let next = curr.children.get(piece);
        if (!next) {
          next = {
            name: piece,
            type: 'dir',
            children: new Map(),
          };
          curr.children.set(piece, next);
        }
        curr = next;
      });
      curr.children.set(fileName, {
        name: fileName,
        path: fullPath,
        type: 'file',
        children: new Map(),
      });
    });

  // Remove common directories (only one child)
  let root = tree;
  while (root && root.children.size === 1) {
    const firstKey = root.children.keys().next().value;
    root = root.children.get(firstKey);
  }

  return root;
}
