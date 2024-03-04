import { useEffect, useState } from "react";
import * as postsService from "../services/posts";
import { Comment } from "../types/models";

interface CommentsProps {
  postId: number;
  open?: boolean;
  version: number;
}

export function Comments(props: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  async function fetchData() {
    const data = await postsService.comments(props.postId);
    setComments(data);
  }
  let version: any = null;
  useEffect(() => {
    if ((props.open && comments.length === 0) || props.version !== version) {
      fetchData();
      version = props.version;
    }
  }, [props.open, props.version]);
  if (!props.open) {
    return null;
  }
  return (
    <div className="flex flex-col gap-4">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-gray-100 p-4 rounded-md shadow-md">
          <div className="flex flex-row">
            <span className="text-lg font-bold">
              {comment.author.first_name} {comment.author.last_name}
            </span>
          </div>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
}
