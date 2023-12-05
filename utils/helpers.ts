interface Item {
  name: string;
  desc: string;
  price: string;
  discPrice: string;
  negotiable: string;
  files: string;
}
export function convertToCommaString(items: Array<any>, callback) {
  return items.map((item) => callback(item)).join(",");
}

export async function getFileBlob(path) {
  const fileName = path.split("/").pop(); // Extract file name from the path
  const response = await fetch(path);
  const blob = await response.blob();
  const file = new File([blob], fileName, { type: blob.type });
  return file;
}

export async function getFile(path) {
  const response = await fetch(path);
  const blob = await response.blob();
  return blob;
}
