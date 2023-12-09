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

export async function addPost(post: {
  type: string;
  category: string;
  subCategory: string;
  title: string;
  items: Array<{
    name: string;
    desc: string;
    price: string;
    discPrice: string;
    negotiable: boolean;
    files: Array<File>;
    // mediaTypes: string;
  }>;
}) {
  //let completedCount = 0;
  let completedCount = Array.from({ length: post.items.length }, (v, i) => 0);
  let datas = Array.from({ length: post.items.length }, (v, i) => {
    return { urls: [], mediaTypes: [], fileNames: [] };
  });

  const postItems = [];
  const userId = getUId();
  const node = post.type === "fix" ? "fixers" : "sellers";

  for (let i = 0; i < post.items.length; i++) {
    const files = post.items[i].files;
    const id = getId([node, userId, "items"]);

    for (let j = 0; j < files.length; j++) {
      const file = files[j];
      const mediaType = file.type.startsWith("image") ? "image" : "video";
      // const urls = [];
      // const mediaTypes = [];
      // const fileNames = [];
      const fileName = Date.now();

      uploadFileResumable(
        [node, userId, "items", id, fileName],
        file,
        (url: string) => {
          const time = Date.now();
          datas[i].urls.push(url);
          datas[i].mediaTypes.push(mediaType);
          datas[i].fileNames.push(fileName);

          const newItem = {
            ...post.items[i],
            userId,
            id,
            url: listToStrings(datas[i].urls),
            mediaType: listToStrings(datas[i].mediaTypes),
            fileName: listToStrings(datas[i].fileNames),
            time,
          };
          //delete newItem["mediaTypes"];
          delete newItem["files"];
          completedCount[i]++;
          if (completedCount[i] === files.length) {
            postItems.push(newItem);
            setValue([node, userId, "items", id], newItem);
          }
        },
        (progress: number) => {}
      );
    }
    // const mediaTypes = post.items[i].mediaTypes;
    // const blob = await getFileBlob(files);
  }
}
// export async function addPost(post: {
//   type: string;
//   category: string;
//   subCategory: string;
//   title: string;
//   caption: string;
//   items: Array<{
//     name: string;
//     desc: string;
//     price: string;
//     discPrice: string;
//     negotiable: boolean;
//     files: Array<File>;
//     // mediaTypes: string;
//   }>;
// }) {
//   let completedCount = 0;
//   const postItems = [];
//   const postId = getId(["posts"]);
//   const userId = auth.currentUser.uid;

//   for (let i = 0; i < post.items.length; i++) {
//     const files = post.items[i].files;
//     const mediaTypes = post.items[i].mediaTypes;
//     const blob = await getFileBlob(files);
//     uploadFileResumable(
//       ["posts", postId, `file_${i}`],
//       blob,
//       (url: string) => {
//         const newItem = {
//           ...post.items[i],
//           url: url,
//           mediaType: mediaTypes,
//         };
//         delete newItem["files"];
//         delete newItem["mediaTypes"];
//         postItems.push(newItem);
//         completedCount++;

//         if (completedCount === post.items.length) {
//           const newPost = {
//             ...post,
//             userId,
//             time: Date.now(),
//             currency: "NGN",
//             items: postItems,
//           };
//           setValue(["posts", postId], newPost);
//         }
//       },
//       (progress: number) => {}
//     );
//   }
// }
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
