interface Item {
  name: string;
  desc: string;
  price: string;
  discPrice: string;
  negotiable: string;
  files: string;
}

export function convertFileToPath(file: File) {
  return URL.createObjectURL(file);
}
export function listToStrings(strings: Array<string>) {
  return strings.join(",");
}
export function stringsToList(string: string) {
  return string.split(",");
}
export function convertToCommaString(items: Array<any>, callback) {
  return items.map((item) => callback(item)).join(",");
}
export function convertToDate(date: string) {
  return new Date(parseInt(date)).toLocaleDateString("en-US");
}
export function convertMilisecToTime(milisec: number) {
  const date = new Date(milisec);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes}`;
}

export async function getFile(path: string) {
  const fileName = path.split("/").pop();
  const response = await fetch(path);
  const blob = await response.blob();
  const file = new File([blob], fileName, { type: blob.type });
  return file;
}

export async function getFileBlob(path: string) {
  const response = await fetch(path);
  const blob = await response.blob();
  return blob;
}

export async function convertBlobToFile(blob: Blob, fileName: string) {
  const file = new File([blob], fileName, { type: blob.type });
  return file;
}
