// @flow

import sourceMap from 'source-map';

export default function getFilesFromSourceMap(
  file: File
): Promise<Map<string, ?string>> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      try {
        const map = await new sourceMap.SourceMapConsumer(fileReader.result);
        const files = new Map();
        map.sources.forEach(url => {
          files.set(url, map.sourceContentFor(url));
        });
        map.destroy();
        resolve(files);
      } catch (ex) {
        reject(ex);
      }
    };
    fileReader.readAsText(file);
  });
}
