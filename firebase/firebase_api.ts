import {
  auth,
  deleteFile,
  getId,
  getRealtimeValue,
  getRealtimeValueChanges,
  getRealtimeValues,
  getValue,
  getValues,
  removeValue,
  setValue,
  updateValue,
  uploadFileResumable,
} from "@/firebase";
import { POSTS_SIZE } from "@/utils/constants";
import {
  checkIfObjectKeysAndValuesMatch,
  getFileBlob,
  getUnmatchedObjects,
  listToStrings,
} from "@/utils/helpers";

export function getUId() {
  return auth.currentUser?.uid;
}
export function getUName() {
  return auth.currentUser?.displayName;
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
    paths: Array<string>;
  }>,
  progressCallback: (progress: number) => void,
  callback: (url: string) => void
) {
  const userId = getUId();
  let completedCount = 0;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const paths = item.paths;
    const type = item.type;
    const id = getId(["users", userId, type]);
    const fileNames = paths.map((path, index) => `file_${index}`);
    const mediaTypes = paths.map((path) =>
      path.startsWith("image") ? "image" : "video"
    );
    uploadMultipleFiles(
      ["posts", id],
      paths,
      fileNames,
      async (urls: Array<string>) => {
        const time = Date.now();
        const url = listToStrings(urls);
        const mediaType = listToStrings(mediaTypes);
        const fileName = listToStrings(fileNames);
        delete item["paths"];
        const newItem = {
          ...item,
          userId,
          id,
          url,
          mediaType,
          fileName,
          time,
        };
        await setValue([type, id], newItem);
        await setValue(["users", userId, type, id], {
          id: id,
          time: time,
        });
        completedCount++;
        if (completedCount === items.length) {
          callback(url);
        }
      },
      progressCallback
    );
  }
  //let completedCount = 0;
  // let completedCount = Array.from({ length: items.length }, (v, i) => 0);
  // let datas = Array.from({ length: items.length }, (v, i) => {
  //   return { urls: [], mediaTypes: [], fileNames: [] };
  // });

  // const postItems = [];
  // const userId = getUId();
  // const type = items[0].type;
  // //const node = type === "fix" ? "fixers" : "sellers";

  // for (let i = 0; i < items.length; i++) {
  //   const files = items[i].files;
  //   const id = getId(["users", userId, type]);

  //   for (let j = 0; j < files.length; j++) {
  //     const file = files[j];
  //     const mediaType = file.type.startsWith("image") ? "image" : "video";
  //     const fileName = `file_${j}`;

  //     uploadFileResumable(
  //       ["users", userId, type, id, fileName],
  //       file,
  //       async (url: string) => {
  //         const time = Date.now();
  //         datas[i].urls.push(url);
  //         datas[i].mediaTypes.push(mediaType);
  //         datas[i].fileNames.push(fileName);

  //         const newItem = {
  //           ...items[i],
  //           userId,
  //           id,
  //           url: listToStrings(datas[i].urls),
  //           mediaType: listToStrings(datas[i].mediaTypes),
  //           fileName: listToStrings(datas[i].fileNames),
  //           time,
  //           available: true,
  //         };
  //         //delete newItem["mediaTypes"];
  //         delete newItem["files"];
  //         completedCount[i]++;
  //         if (completedCount[i] === files.length) {
  //           postItems.push(newItem);
  //           await setValue([type, id], newItem);
  //           await setValue(["users", userId, type, id], { id: id, time: time });
  //         }
  //       },
  //       (progress: number) => {}
  //     );
  //   }
  // }
}
export async function deleteItem(userId: string, id: string, type: string) {
  await deleteSingleFile([type, id], "file_0");
  await removeValue(["users", userId, type, id]);
  return removeValue([type, id]);
}
export async function deletePost(userId: string, id: string) {
  await deleteSingleFile(["posts", id], "file_0");
  await removeValue(["users", userId, "posts", id]);
  return removeValue(["posts", id]);
}

export async function addPost(
  post: {
    type: string;
    category: string;
    subCategory: string;
    title: string;
    caption: string;
    paths: Array<string>;
  },
  progressCallback: (progress: number) => void,
  callback: (url: string) => void
) {
  const userId = getUId();
  const id = getId(["users", userId, "posts"]);
  const paths = post.paths;
  const fileNames = paths.map((path, index) => `file_${index}`);
  const mediaTypes = paths.map((path) =>
    path.startsWith("image") ? "image" : "video"
  );
  uploadMultipleFiles(
    ["posts", id],
    paths,
    fileNames,
    async (urls: Array<string>) => {
      const time = Date.now();
      const url = listToStrings(urls);
      const mediaType = listToStrings(mediaTypes);
      const fileName = listToStrings(fileNames);
      delete post["paths"];
      const newPost = {
        ...post,
        userId,
        id,
        url,
        mediaType,
        fileName,
        time,
      };
      await setValue(["posts", id], newPost);
      await setValue(["users", userId, "posts", id], {
        id: id,
        time: time,
      });
      callback(url);
    },
    progressCallback
  );
}

export async function updateBusinessCertification(
  files: Array<File>,
  callback
) {
  const userId = getUId();
  let completedCount = 0;
  let data = { urls: [], fileNames: [] };

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileName = `file_${i}`;
    uploadFileResumable(
      ["businesses", userId, "businessCertifications", fileName],
      file,
      (url: string) => {
        data.urls.push(url);
        data.fileNames.push(fileName);
        completedCount++;
        if (completedCount === files.length) {
          callback(listToStrings(data.urls));
        }
      },
      (progress: number) => {}
    );
  }
}
export async function updateBusinessLocationPhotos(
  files: Array<File>,
  callback
) {
  const userId = getUId();
  let completedCount = 0;
  let data = { urls: [], fileNames: [] };

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileName = `file_${i}`;
    uploadFileResumable(
      ["businesses", userId, "businessLocationPhotos", fileName],
      file,
      (url: string) => {
        data.urls.push(url);
        data.fileNames.push(fileName);
        completedCount++;
        if (completedCount === files.length) {
          callback(listToStrings(data.urls));
        }
      },
      (progress: number) => {}
    );
  }
}
export async function updateProfilePhoto(file: File, callback) {
  //const blob = await getFileBlob(file);
  const userId = getUId();
  uploadFileResumable(
    ["users", userId, "profilePhoto"],
    file,
    (url: string) => {
      callback(url);
    },
    (progress: number) => {}
  );
}
export async function updateBusinessLogo(file: File, callback) {
  //const blob = await getFileBlob(file);
  const userId = getUId();
  uploadFileResumable(
    ["businesses", userId, "businessLogo"],
    file,
    (url: string) => {
      callback(url);
    },
    (progress: number) => {}
  );
}
export async function deleteSingleFile(path: Array<String>, fileName: string) {
  await deleteFile([...path, fileName]);
}

export async function uploadSingleFile(
  path: Array<String>,
  file: File | string,
  fileName: string,
  callback,
  progressCallback
) {
  const userId = getUId();
  let uploadFile = null;
  if (typeof file === "string") {
    uploadFile = await getFileBlob(file);
  } else {
    uploadFile = file;
  }
  uploadFileResumable(
    [...path, fileName],
    uploadFile,
    (url: string) => {
      callback(url);
    },
    (progress: number) => {
      progressCallback?.(progress);
    }
  );
}
export async function deleteMultpleFiles(
  path: Array<String>,
  fileNames: Array<string>
) {
  for (let i = 0; i < fileNames.length; i++) {
    await deleteFile([...path, fileNames[i]]);
  }
}
export async function uploadMultipleFiles(
  path: Array<String>,
  files: Array<File> | Array<string>,
  fileNames: Array<string>,
  callback,
  progressCallback
) {
  if (files.length === 0) {
    callback([]);
    return;
  }
  let file = null;
  if (typeof files[0] === "string") {
    file = await getFileBlob(files[0]);
  } else {
    file = files[0];
  }
  uploadFileResumable(
    [...path, fileNames[0]],
    file,
    (url: string) => {
      uploadMultipleFiles(
        path,
        files.slice(1),
        fileNames.slice(1),
        (urls) => {
          callback([url, ...urls]);
        },
        progressCallback
      );
    },
    (progress: number) => {
      progressCallback?.(progress, files.length);
    }
  );
}

export async function getUser(userId: string) {
  return getValue(["users", userId]);
}
export async function readPostStats(userId: string, postId: string) {
  const likes = await getValues(["posts", postId, "likes"]);
  const comments = await getValues(["posts", postId, "comments"]);
  const reposts = await getValues(["posts", postId, "reposts"]);
  return { likes, comments, reposts };
}
export async function readUserStats(userId: string) {
  const postIds = await getValues(["users", userId, "posts"]);
  const getIds = await getValues(["users", userId, "get"]);
  const fixIds = await getValues(["users", userId, "fix"]);
  const posts = await readPostsFromIds(postIds);
  const get = await readFixOrGetFromIds(getIds, "get");
  const fix = await readFixOrGetFromIds(fixIds, "fix");
  const followers = await getValues(["users", userId, "followers"]);
  const following = await getValues(["users", userId, "following"]);
  return { posts, get, fix, followers, following };
}

export async function sendChatMessage(message: {
  userId: string;
  receiverId: string;
  messageId: string;
  message: string;
  messageType: string;
  url: string;
  mediaType: string;
  for: string;
  forId: string;
  time: number;
  read: boolean;
}) {
  const userId = getUId();
  const receiverId = message.receiverId;
  const id = getId(["users", userId, "messages"]);
  const newMessage = { ...message, messageId: id };
  setValue(["users", userId, "messages", id], newMessage);
  setValue(["users", receiverId, "messages", id], newMessage);
}
export async function readMessages() {
  const userId = getUId();
  return getValues(["users", userId, "messages"]);
}
export function readRealtimeMessages(userId, callback) {
  return getRealtimeValues(["users", userId, "messages"], callback);
}
export function readMessageChanges(userId, callback) {
  return getRealtimeValueChanges(["users", userId, "messages"], [], callback);
}

export async function getBusiness(userId: string) {
  return getValue(["businesses", userId]);
}
export async function updateUserProfile(user, newUser) {
  if (!user) return setValue(["users", newUser.userId], newUser);
  const match = checkIfObjectKeysAndValuesMatch(user, newUser);
  const updated = getUnmatchedObjects(user, newUser);
  console.log(
    `match ${match}, updated ${Object.keys(updated)} ${Object.values(updated)}`
  );
  if (match) return;
  if (updated) {
    return updateValue(["users", newUser.userId], updated);
  }
}
export async function updateBusinessProfile(business, newBusiness) {
  const userId = getUId();
  if (!business) {
    return setValue(["businesses", newBusiness.userId], {
      ...newBusiness,
      userId,
    });
  }
  if (!business.userId) {
    newBusiness.userId = userId;
  }
  const match = checkIfObjectKeysAndValuesMatch(business, newBusiness);
  const updated = getUnmatchedObjects(business, newBusiness);
  if (match) return;
  if (updated) {
    return updateValue(["businesses", newBusiness.userId], updated);
  }
}

export async function addUser(user: {
  userId: string;
  name: string;
  email: string;
  phone: string;
  username: string;
}) {
  const time = Date.now();
  return setValue(["users", user.userId], {
    ...user,
    profilePhoto: "",
    timeJoined: time,
    lastSeen: time,
    online: true,
  });
}
export async function readPostsFromIds(ids) {
  const posts = [];
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i].id;
    const post = await getValue(["posts", id]);
    if (post !== null) {
      posts.push(post);
    }
  }
  return posts;
}

export async function readFixOrGetFromIds(ids, type: string) {
  const items = [];
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i].id;
    const item = await getValue([type, id]);
    if (item !== null) {
      items.push(item);
    }
  }
  return items;
}
export async function readAll(node: string) {
  const userId = getUId();
  // {
  //   orderBy: ["time", "desc"],
  // }
  return getValues([node]);
}
export async function readPosts(type: string, index: number = 0) {
  const userId = getUId();
  return getValues(["posts"], {
    orderBy: ["time", "desc"],
  });
}
export async function readSearchedUsers(value) {
  return getValues(["users"], { where: ["name", "==", value] });
}
export async function readUsers() {
  return getValues(["users"]);
}
export async function readNotifications() {
  const userId = getUId();
  return getValues(["users", userId, "notifications"]);
}
export async function sendNotification({ title, message, toId }) {
  const userId = getUId();
  const id = getId(["users", userId, "notifications"]);
  const notification = {
    id,
    userId,
    toId,
    title,
    message,
    time: Date.now(),
    read: false,
  };
  setValue(["users", userId, "notifications", id], notification);
}
export function readRealtimePosts(callback) {
  return getRealtimeValues(["posts"], callback);
}

export function readPost(userId: string, id: string) {
  return getValue(["users", userId, "posts", id]);
}
export function readFixGetItem(type: string, userId: string, id: string) {
  return getValue([type, id]);
}
export function readUser(userId: string) {
  return getValue(["users", userId]);
}
export async function deleteComment(
  userId: string,
  postId: string,
  id: string
) {
  return removeValue(["posts", postId, "comments", id]);
}
export async function addComment(
  userId: string,
  postId: string,
  comment: string,
  comments: Array<{
    userId: string;
    id: string;
    comment: string;
    time: number;
  }>,
  setComments: any
) {
  const myId = getUId();
  const id = getId(["users", userId, "posts", postId, "comments"]);
  const time = Date.now();

  const newComment = { userId: myId, id, comment, time };
  setValue(["posts", postId, "comments", id], newComment);
  setComments([...comments, newComment]);
}

export async function toggleRepost(
  userId: string,
  postId: string,
  reposts?: Array<{ id: string; time: number }>,
  setReposts?: any
) {
  if (reposts === null) return;
  const myId = getUId();
  const time = Date.now();
  const reposted = reposts.map((like) => like.id).includes(myId);

  if (reposted) {
    await removeValue(["posts", postId, "repost", myId]);
    if (setReposts) {
      setReposts((repost) => {
        return repost.filter((like) => like.id !== myId);
      });
    }
  } else {
    await setValue(["posts", postId, "repost", myId], {
      id: myId,
      time,
    });
    if (setReposts) {
      setReposts((repost) => {
        return [...repost, { id: myId, time }];
      });
    }
  }
}
export async function toggleLike(
  userId: string,
  postId: string,
  likes?: Array<{ id: string; time: number }>,
  setLikes?: any
) {
  if (likes === null) return;
  const myId = getUId();
  const time = Date.now();
  const liked = likes.map((like) => like.id).includes(myId);

  if (liked) {
    await removeValue(["posts", postId, "likes", myId]);
    if (setLikes) {
      setLikes((likes) => {
        return likes.filter((like) => like.id !== myId);
      });
    }
  } else {
    await setValue(["posts", postId, "likes", myId], {
      id: myId,
      time,
    });
    if (setLikes) {
      setLikes((likes) => {
        return [...likes, { id: myId, time }];
      });
    }
  }
}
export async function toggleFollowUser(
  userId: string,
  following?: boolean,
  setFollowing?: any,
  setUser?: any
) {
  if (following === null) return;
  const myId = getUId();
  const time = Date.now();
  if (following) {
    await removeValue(["users", userId, "followers", myId]);
    await removeValue(["users", myId, "following", userId]);
    if (setFollowing) setFollowing(false);
    if (setUser) {
      setUser((user) => {
        return {
          ...user,
          followers: user.followers.filter((follower) => follower.id !== myId),
        };
      });
    }
  } else {
    await setValue(["users", userId, "followers", myId], {
      id: myId,
      time,
    });
    await setValue(["users", myId, "following", userId], {
      id: userId,
      time,
    });
    if (setFollowing) setFollowing(true);
    if (setUser) {
      setUser((user) => {
        return {
          ...user,
          followers: [...user.followers, { id: myId, time }],
        };
      });
    }
  }
}
