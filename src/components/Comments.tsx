import { useEffect, useState } from "react";
import * as postsService from "../services/posts";
import { Comment } from "../types/models";

interface CommentsProps {
  postId: number;
  open?: boolean;
  version: number;
}

export function Comments(props: CommentsProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [version, setVersion] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  async function fetchData() {
    const data = await postsService.comments(props.postId);
    setComments(data);
    setIsLoaded(true);
  }
  useEffect(() => {
    if ((props.open && !isLoaded) || props.version !== version) {
      fetchData();
      setVersion(props.version);
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
