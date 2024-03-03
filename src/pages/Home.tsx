import { Button } from "flowbite-react";
import { Layout } from "../components/Layout";
import { TextArea } from "../components/TextArea";
import { useEffect, useState } from "react";
import * as postsService from "../services/posts";
import { Post } from "../types/models";

export function Home() {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  async function getData() {
    const data = await postsService.findAll();
    setPosts(data);
  }
  useEffect(() => {
    getData();
  }, []);
  const handlePost = async () => {
    await postsService.create({ content: post });
    setPost("");
    getData();
  };
  return (
    <Layout>
      <div className="w-full overflow-y-auto menu">
        <div className="flex flex-row px-4 py-3 gap-2">
          <TextArea
            className="w-full"
            rows={1}
            value={post}
            onChange={(evt) => setPost(evt.target.value)}
          />
          <div className="">
            <Button
              disabled={post.length < 10}
              onClick={handlePost}
              className="rounded-none w-[100px]"
            >
              Post
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 px-4 py-3">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-4 rounded-md shadow-md">
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
