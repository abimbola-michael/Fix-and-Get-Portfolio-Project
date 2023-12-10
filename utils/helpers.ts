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
  const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
  const minutes = date.getMinutes();
  const ampm = date.getHours() < 12 ? "AM" : "PM";
  return `${hours}:${minutes} ${ampm}`;
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
export function getUserCategories(
  items: Array<{
    id: string;
    type: string;
    category: string;
    subCategory: string;
    title: string;
    name: string;
    desc: string;
    price: string;
    discPrice: string;
    negotiable: boolean;
    url: string;
    mediaType: string;
    fileName: string;
    time: string;
    available: boolean;
  }>
) {
  let finalCategories = [];
  const categories = items.reduce((prev, item) => {
    const index = prev.find((catItem) => catItem.name === item.category);
    return index
      ? prev.filter((value, i) =>
          i === index ? { ...value, items: [...value.items, item] } : value
        )
      : [...prev, { name: item.category, items: [item] }];
  }, []);
  categories.forEach((category) => {
    const subCategories = category.items.reduce((prev, item) => {
      const index = prev.find((catItem) => catItem.name === item.subCategory);
      return index
        ? prev.filter((value, i) =>
            i === index
              ? { ...value, items: [...value.items, item.title] }
              : value
          )
        : [...prev, { name: item.subCategory, items: [item.title] }];
    }, []);
    finalCategories.push({ name: category.name, subcategories: subCategories });
  });

  return finalCategories;
}
