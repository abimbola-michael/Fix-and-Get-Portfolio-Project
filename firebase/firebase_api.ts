import { getId, removeValue, setValue, uploadFileResumable } from "@/firebase";
import { getFileBlob } from "@/utils/helpers";

export async function addPost(
  post: {
    type: string;
    category: string;
    caption: string;
    url: string;
    mediaType: string;
    name: string;
    desc: string;
    price: string;
    discPrice: string;
    negotiable: string;
  },
  files: String,
  mediaTypes: string
) {
  console.log(
    `post=${post.toString()}, files=${files}, mediaTypes=${mediaTypes}`
  );
  const postId = getId(["posts"]);

  const blob = await getFileBlob(files);
  uploadFileResumable(
    ["posts", postId],
    blob,
    (url) => {
      post.url = url;
      post.mediaType = mediaTypes;
      setValue(["posts", postId], post);
    },
    (progress) => {}
  );

  //return setValue(["posts", postId], post);
}

export async function deletePost(id: string) {
  return removeValue(["posts", id]);
}
