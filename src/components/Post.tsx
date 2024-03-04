import { Timeline } from "flowbite-react";
import * as models from "../types/models";
import dayjs from "dayjs";
import { Input } from "./Input";
import { Comments } from "./Comments";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { MouseEventHandler, useEffect, useState } from "react";
import * as postsService from "../services/posts";
import { KeyboardEventHandler } from "react";

interface PostProps extends models.Post {}

export function Post(props: PostProps) {
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState<models.Post | null>(null);
  const [version, setVersion] = useState(0);
  useEffect(() => {
    setPost(props);
  }, []);
  const handleComment: MouseEventHandler<HTMLAnchorElement> = (evt) => {
    evt.preventDefault();
    setOpen(!open);
  };
  const handleLike: MouseEventHandler<HTMLAnchorElement> = async (evt) => {
    evt.preventDefault();
    if (!post) return;

    if (post.liked === false) {
      await postsService.like(post.id);
      setPost({ ...post, liked: true, likes: post.likes + 1 });
    } else {
      await postsService.unlike(post.id);
      setPost({ ...post, liked: false, likes: post.likes - 1 });
    }
  };
  const handleInputKeyUp: KeyboardEventHandler<HTMLInputElement> = async (
    evt
  ) => {
    if (evt.key !== "Enter") return;
    if (!post) return;
    await postsService.comment(post.id, { content: comment });
    setComment("");
    setVersion(version + 1);
    setPost({ ...post, comments: post.comments + 1 });
  };
  if (!post) return null;
  return (
    <div key={post.id} className="bg-green-50 p-4 rounded-md shadow-md">
      <div className="flex flex-row">
        <span className="text-lg font-bold">
          {post.author.first_name} {post.author.last_name}
        </span>
        &nbsp;(
        <Timeline className="text-gray-400 text-sm pt-1">
          {dayjs(post.creation_at).format("YYYY-MM-DD HH:mm:ss")}
        </Timeline>
        )
      </div>
      <p>{post.content}</p>
      <div className="flex flex-row gap-4 mt-4">
        <a className="flex flex-row gap-2" href="" onClick={handleComment}>
          <span className="pt-1">
            <FaCommentAlt />
          </span>
          <span>Comments ({post.comments})</span>
        </a>
        <a className="flex flex-row gap-2" href="" onClick={handleLike}>
          <span className="pt-1">
            <AiFillLike />
          </span>
          {post.liked ? (
            <span className="text-red-500">Like ({post.likes})</span>
          ) : (
            <span>Like ({post.likes})</span>
          )}
        </a>
      </div>
      <Comments postId={post.id} open={open} version={version} />
      <div className="flex flex-row gap-2 mt-4">
        <Input
          placeholder="Comment"
          value={comment}
          onChange={(evt) => setComment(evt.target.value)}
          onKeyUp={handleInputKeyUp}
        />
      </div>
    </div>
  );
}
