// @flow

import type {TreeNode} from './buildTree';

import {saveAs} from 'file-saver/FileSaver';
import JSZip from 'jszip/dist/jszip';

export default async function saveAsZIP(
  tree: TreeNode,
  files: Map<string, ?string>,
): Promise<void> {
  const zip = new JSZip();

  function processDir(dirPath: string, dir: TreeNode) {
    dir.children.forEach(node => {
      if (node.type === 'file') {
        zip.file(`${dirPath}${node.name}`, files.get(node.path) || '');
      } else if (node.type === 'dir') {
        processDir(`${dirPath}${node.name}/`, node);
      }
    });
  }

  processDir('', tree);
  const zipFileBlob = await zip.generateAsync({type: 'blob'});
  saveAs(zipFileBlob, 'files.zip');
}
