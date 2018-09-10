// @flow

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

export default async function corsFetch(url: string): Promise<string> {
  let rawFile;
  try {
    rawFile = await fetch(url);
  } catch (ex) {
    // Try CORS proxy, in case URL does not allow CORS
    rawFile = await fetch(CORS_PROXY + url);
  }
  return await rawFile.text();
}
