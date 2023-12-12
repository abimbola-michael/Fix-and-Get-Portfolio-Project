import { getUId } from "@/firebase/firebase_api";

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

export function getCategoriesAndItems(
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
  }>,
  type: string,
  name: string
) {
  let finalCategories = [];
  if (!items) return finalCategories;
  const categories = items.reduce((prev, item) => {
    const index = prev.find((catItem) =>
      type === "category"
        ? catItem.name === item.category
        : type === "subCategory"
        ? catItem.name === item.subCategory
        : catItem.name === item.title
    );
    return index
      ? prev.filter((value, i) =>
          i === index ? { ...value, items: [...value.items, item] } : value
        )
      : [
          ...prev,
          {
            name:
              type === "category"
                ? item.category
                : type === "subCategory"
                ? item.subCategory
                : item.title,
            items: [item],
          },
        ];
  }, []);
  if (name) {
    const category = categories.find((cat) => cat.name === name);
    if (category) {
      return [category];
    } else {
      return categories;
    }
  } else {
    return categories;
  }
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
  if (!items) return finalCategories;
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

export function getCategoryItems(
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
  if (!items) return finalCategories;
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
            i === index ? { ...value, items: [...value.items, item] } : value
          )
        : [...prev, { name: item.subCategory, items: [item] }];
    }, []);
    finalCategories.push({ name: category.name, subcategories: subCategories });
  });
  return finalCategories;
}

export function getUserCategoriesItems(
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
  }>,
  category: string,
  subCategory: string,
  title: string
) {
  let finalCategories = [];
  if (!items) return finalCategories;

  if (!category) return items;
  const categoryItems = items.filter((item) => item.category === category);
  if (!subCategory) return categoryItems;
  const subCategoryItems = categoryItems.filter(
    (item) => item.subCategory === subCategory
  );
  if (!title) return subCategoryItems;
  return subCategoryItems.filter((item) => item.title === title);
}

export function getLastMessages(messages: Array<any>) {
  const myId = getUId();

  const lastMessages = messages.reduce((prev, message) => {
    const id = message.userId === myId ? message.receiverId : message.userId;

    const index = prev.findIndex(
      (prevMessage) =>
        (prevMessage.receiverId === id || prevMessage.userId === id) &&
        prevMessage.time < message.time
    );
    return index !== -1
      ? prev.map((value, i) => (i === index ? { ...message } : value))
      : [...prev, { ...message }];
  }, []);
  return lastMessages;
}

export function getIndividualMessages(messages: Array<any>) {
  const myId = getUId();
  const indMessages = messages.reduce((prev, message) => {
    const id = message.userId === myId ? message.receiverId : message.userId;
    const index = prev.findIndex((prevMessage) => prevMessage.userId === id);
    return index
      ? prev.map((value, i) =>
          i === index
            ? { ...value, messages: [...value.messages, ...message] }
            : value
        )
      : [...prev, { userId: id, messages: [...message] }];
  }, []);
  return indMessages;
}

export function getUserMessages(messages: Array<any>, userId: string) {
  const myId = getUId();
  return messages.filter(
    (value) =>
      (value.userId === myId && value.receiverId === userId) ||
      (value.userId === userId && value.receiverId === myId)
  );
}
