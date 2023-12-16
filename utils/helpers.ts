import { getUId } from "@/firebase/firebase_api";

interface Item {
  name: string;
  desc: string;
  price: string;
  discPrice: string;
  negotiable: string;
  files: string;
}

export function getLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        callback({ latitude, longitude });
      },
      (err) => {
        callback({ error: err.message });
      }
    );
  } else {
    //console.log("Geolocation is not supported by this browser.");
  }
}
export function openGoogleMap(lat, lng) {
  window.open(
    `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
    "_blank"
  );
}
export function haversineDistance(lat1, lon1, lat2, lon2) {
  // Convert latitude and longitude from degrees to radians
  const toRadians = (angle) => (angle * Math.PI) / 180;

  // Radius of the Earth in kilometers
  const earthRadius = 6371;

  // Differences in coordinates
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  // Haversine formula
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in kilometers
  const distance = earthRadius * c;

  return distance;
}
// export function checkIfObjectKeysAndValuesMatch(firstObject, secondObject) {
//   const firstObjectKeys = Object.keys(firstObject);
//   const secondObjectKeys = Object.keys(secondObject);
//   let lowerObjectKeys = firstObjectKeys;
//   let lowerObject = firstObject;
//   let higherObject = secondObject;
//   if (firstObjectKeys.length !== secondObjectKeys.length) {
//     lowerObjectKeys =
//       firstObjectKeys.length < secondObjectKeys.length
//         ? firstObjectKeys
//         : secondObjectKeys;
//     higherObject =
//       firstObjectKeys.length < secondObjectKeys.length
//         ? secondObject
//         : firstObject;
//     lowerObject =
//       firstObjectKeys.length < secondObjectKeys.length
//         ? firstObject
//         : secondObject;
//   }
//   for (let i = 0; i < lowerObjectKeys.length; i++) {
//     const key = lowerObjectKeys[i];
//     if (lowerObject[key] !== higherObject[key]) return false;
//   }
//   return true;
// }
// export function getUnmatchedObjects(firstObject, secondObject) {
//   let newObject = {};
//   const firstObjectKeys = Object.keys(firstObject);
//   const secondObjectKeys = Object.keys(secondObject);
//   const higherObjectKeys =
//     firstObjectKeys.length > secondObjectKeys.length
//       ? firstObjectKeys
//       : secondObjectKeys;
//   const higherObject =
//     firstObjectKeys.length > secondObjectKeys.length
//       ? firstObject
//       : secondObject;
//   const lowerObject = higherObject === firstObject ? secondObject : firstObject;
//   for (let i = 0; i < higherObjectKeys.length; i++) {
//     const key = higherObjectKeys[i];
//     if (lowerObject[key] && higherObject[key] !== lowerObject[key]) {
//       //newObject = { ...newObject, [key]: higherObject[key] };
//       newObject[key] = lowerObject[key];
//     }
//   }
//   return newObject;
// }

export function checkIfObjectKeysAndValuesMatch(firstObject, secondObject) {
  const firstObjectKeys = Object.keys(firstObject);
  const secondObjectKeys = Object.keys(secondObject);
  for (let i = 0; i < secondObjectKeys.length; i++) {
    const key = secondObjectKeys[i];
    if (secondObject[key] !== firstObject[key]) return false;
  }
  return true;
}
export function getUnmatchedObjects(firstObject, secondObject) {
  let newObject = {};
  const firstObjectKeys = Object.keys(firstObject);
  const secondObjectKeys = Object.keys(secondObject);

  for (let i = 0; i < secondObjectKeys.length; i++) {
    const key = secondObjectKeys[i];
    if (secondObject[key] !== firstObject[key]) {
      newObject[key] = secondObject[key];
    }
  }
  return newObject;
}
export function convertFileToPath(file: File) {
  return URL.createObjectURL(file);
}
export function listToStrings(strings: Array<string>, sep?: string) {
  return strings.length > 0 ? strings.join(sep || ",") : "";
}
export function stringsToList(str: string, sep?: string) {
  return str ? (sep && str.includes(sep) ? str.split(sep || ",") : [str]) : [];
}
export function convertToCommaString(items: Array<any>, callback) {
  return items.map((item) => callback(item)).join(",");
}
export function convertToDate(date: string) {
  return new Date(parseInt(date)).toLocaleDateString("en-US");
}
export function convertMilisecToTime(milisec?: number) {
  if (!milisec) return "";
  const date = new Date(milisec);
  const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
  const minutes = date.getMinutes();
  const ampm = date.getHours() < 12 ? "AM" : "PM";
  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
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
      ? prev.map((value, i) => (i === index ? message : value))
      : [...prev, { ...message }];
  }, []);
  return lastMessages;
}

export function getIndividualMessages(messages: Array<any>) {
  const myId = getUId();
  const indMessages = messages.reduce((prev, message) => {
    const id = message.userId === myId ? message.receiverId : message.userId;
    const index = prev.findIndex((prevMessage) => prevMessage.userId === id);
    return index != -1
      ? prev.map((value, i) =>
          i === index
            ? { ...value, messages: [...value.messages, message] }
            : value
        )
      : [...prev, { userId: id, messages: [message] }];
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
