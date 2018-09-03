export default function getFilesFromSourceMap(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      try {
        const mapPromise = new sourceMap.SourceMapConsumer(fileReader.result);
        mapPromise.then(map => {
          const files = new Map();
          map.sources.forEach(url => {
            files.set(url, map.sourceContentFor(url));
          });
          map.destroy();
          resolve(files);
        }, reject);
      } catch (ex) {
        reject(ex);
      }
    };
    fileReader.readAsText(file);
  });
}
