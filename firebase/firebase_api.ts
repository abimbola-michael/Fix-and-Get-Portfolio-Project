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
import { getFileBlob } from "@/utils/helpers";

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
  caption: string;
  items: Array<{
    name: string;
    desc: string;
    price: string;
    discPrice: string;
    negotiable: boolean;
    files: string;
    mediaTypes: string;
  }>;
}) {
  let completedCount = 0;
  const postItems = [];
  const postId = getId(["posts"]);
  const userId = auth.currentUser.uid;

  for (let i = 0; i < post.items.length; i++) {
    const files = post.items[i].files;
    const mediaTypes = post.items[i].mediaTypes;
    const blob = await getFileBlob(files);
    uploadFileResumable(
      ["posts", postId, `file_${i}`],
      blob,
      (url: string) => {
        const newItem = {
          ...post.items[i],
          url: url,
          mediaType: mediaTypes,
        };
        delete newItem["files"];
        delete newItem["mediaTypes"];
        postItems.push(newItem);
        completedCount++;

        if (completedCount === post.items.length) {
          const newPost = {
            ...post,
            userId,
            time: Date.now(),
            currency: "NGN",
            items: postItems,
          };
          setValue(["posts", postId], newPost);
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
  //return (await getValue(["posts"])) || [];
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
