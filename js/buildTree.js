// @flow

export type TreeNode = $ReadOnly<{|
  name: string,
  path: string,
  type: 'dir' | 'file',
  children: Map<string, TreeNode>,
|}>;

export default function buildTree(files: Array<string>): TreeNode {
  const tree: TreeNode = {
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
            path: `${curr.path}/${piece}`,
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
    const node = firstKey && root.children.get(firstKey);
    if (!node) {
      break;
    }
    root = node;
  }

  return root;
}
