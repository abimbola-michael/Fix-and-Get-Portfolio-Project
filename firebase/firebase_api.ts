import {
  auth,
  getId,
  getRealtimeValue,
  getRealtimeValues,
  getValue,
  getValues,
  removeValue,
  setValue,
  uploadFileResumable,
} from "@/firebase";
import { getFileBlob, listToStrings } from "@/utils/helpers";

export function getUId() {
  return auth.currentUser?.uid;
}
export function getUName() {
  return auth.currentUser?.displayName;
}
export async function changeProfilePic(file: string, isCover: boolean) {
  const blob = await getFileBlob(file);
  const userId = getUId();
  uploadFileResumable(
    ["users", userId, isCover ? "coverPhoto" : "profilePhoto"],
    blob,
    (url: string) => {
      setValue(["users", userId, isCover ? "coverPhoto" : "profilePhoto"], url);
    },
    (progress: number) => {}
  );
}
export async function getUser(userId: string) {
  return getValue(["users", userId]);
}
export async function readUserStats(userId: string) {
  const user = await getValue(["users", userId]);
  const posts = await getValues(["users", userId, "posts"]);
  const get = await getValues(["users", userId, "get"]);
  const fix = await getValues(["users", userId, "fix"]);
  const followers = await getValues(["users", userId, "followers"]);
  const following = await getValues(["users", userId, "following"]);
  user.posts = posts;
  user.get = get;
  user.fix = fix;
  user.followers = followers;
  user.following = following;
  // const likes = getValues(["users", userId, "likes"]);
  // const comments = getValues(["users", userId, "comments"]);
  // const shares = getValues(["users", userId, "shares"]);
  // const views = getValues(["users", userId, "views"]);
  // const saved = getValues(["users", userId, "saved"]);
  // const messages = getValues(["users", userId, "messages"]);
  // const notifications = getValues(["users", userId, "notifications"]);
  // const reviews = getValues(["users", userId, "reviews"]);
  // const ratings = getValues(["users", userId, "ratings"]);
  // const orders = getValues(["users", userId, "orders"]);
  // const payments = getValues(["users", userId, "payments"]);
  // const services = getValues(["users", userId, "services"]);
  // const products = getValues(["users", userId, "products"]);
  // const fixers = getValues(["users", userId, "fixers"]);
  return user;
}
export async function updateCompanyProfile(company: {
  companyName: string;
  companyAddress: string;
  companyLogo: string;
  companyDescription: string;
  companyWebsite: string;
  companyEmail: string;
  companyPhone: string;
  currentlocation: string;
}) {
  const userId = getUId();
  const id = getId(["companies"]);
  setValue(["companies", id], company);
  setValue(["users", userId, "company"], id);
}
export async function addItems(
  items: Array<{
    type: string;
    category: string;
    subCategory: string;
    title: string;
    name: string;
    desc: string;
    price: string;
    discPrice: string;
    negotiable: boolean;
    files: Array<File>;
  }>
) {
  //let completedCount = 0;
  let completedCount = Array.from({ length: items.length }, (v, i) => 0);
  let datas = Array.from({ length: items.length }, (v, i) => {
    return { urls: [], mediaTypes: [], fileNames: [] };
  });

  const postItems = [];
  const userId = getUId();
  const type = items[0].type;
  //const node = type === "fix" ? "fixers" : "sellers";

  for (let i = 0; i < items.length; i++) {
    const files = items[i].files;
    const id = getId(["users", userId, type]);

    for (let j = 0; j < files.length; j++) {
      const file = files[j];
      const mediaType = file.type.startsWith("image") ? "image" : "video";
      const fileName = `file_${j}`;

      uploadFileResumable(
        ["users", userId, type, id, fileName],
        file,
        (url: string) => {
          const time = Date.now();
          datas[i].urls.push(url);
          datas[i].mediaTypes.push(mediaType);
          datas[i].fileNames.push(fileName);

          const newItem = {
            ...items[i],
            userId,
            id,
            url: listToStrings(datas[i].urls),
            mediaType: listToStrings(datas[i].mediaTypes),
            fileName: listToStrings(datas[i].fileNames),
            time,
            available: true,
          };
          //delete newItem["mediaTypes"];
          delete newItem["files"];
          completedCount[i]++;
          if (completedCount[i] === files.length) {
            postItems.push(newItem);
            setValue(["users", userId, type, id], newItem);
          }
        },
        (progress: number) => {}
      );
    }
  }
}
export async function addPost(post: {
  type: string;
  category: string;
  subCategory: string;
  title: string;
  caption: string;
  files: Array<File>;
}) {
  let completedCount = 0;
  let data = { urls: [], mediaTypes: [], fileNames: [] };

  const userId = getUId();
  const id = getId(["users", userId, "posts"]);
  const files = post.files;
  for (let j = 0; j < files.length; j++) {
    const file = files[j];
    const mediaType = file.type.startsWith("image") ? "image" : "video";
    const fileName = `file_${j}`;

    uploadFileResumable(
      ["users", userId, "posts", id, fileName],
      file,
      (url: string) => {
        const time = Date.now();
        data.urls.push(url);
        data.mediaTypes.push(mediaType);
        data.fileNames.push(fileName);

        const newPost = {
          ...post,
          userId,
          id,
          url: listToStrings(data.urls),
          mediaType: listToStrings(data.mediaTypes),
          fileName: listToStrings(data.fileNames),
          time,
        };
        //delete newItem["mediaTypes"];
        delete post["files"];
        completedCount++;
        if (completedCount === files.length) {
          setValue(["users", userId, "posts", id], newPost);
        }
      },
      (progress: number) => {}
    );
  }
}

export async function deletePost(id: string) {
  return removeValue(["posts", id]);
}

export async function readPosts() {
  return getValues(["posts"]);
}
export function readRealtimePosts(callback) {
  return getRealtimeValues(["posts"], callback);
}

export function readPost(id: string) {
  return getValue(["posts", id]);
}
export function readUser(userId: string) {
  return getValue(["users", userId]);
}
