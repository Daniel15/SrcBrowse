// @flow

import sourceMap from 'source-map';

import corsFetch from './corsFetch';

export async function loadFromString(
  input: string,
): Promise<Map<string, ?string>> {
  const map = await new sourceMap.SourceMapConsumer(input);
  const files = new Map();
  map.sources.forEach(url => {
    files.set(url, map.sourceContentFor(url));
  });
  map.destroy();
  return files;
}

export function loadFromFile(
  file: File
): Promise<Map<string, ?string>> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      try {
        if (typeof fileReader.result !== 'string') {
          throw new Error('Unexpected result type: ' + typeof fileReader.result);
        }
        const files = await loadFromString(fileReader.result);
        resolve(files);
      } catch (ex) {
        reject(ex);
      }
    };
    fileReader.readAsText(file);
  });
}

export async function loadFromURL(
  url: string,
): Promise<Map<string, ?string>> {
  const rawFile = await corsFetch(url);
  return await loadFromString(rawFile);
}
