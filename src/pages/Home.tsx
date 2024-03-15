import { Button } from "flowbite-react";
import { Layout } from "../components/Layout";
import { TextArea } from "../components/TextArea";
import { useEffect, useState } from "react";
import * as postsService from "../services/posts";
import { Post } from "../components/Post";
import * as models from "../types/models";
import { TfiWrite } from "react-icons/tfi";

export function Home() {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState<models.Post[]>([]);
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
            className="w-full h-[10rem] resize-none"
            rows={2}
            value={post}
            onChange={(evt) => setPost(evt.target.value)}
          />
          <div className="flex">
            <Button
              disabled={post.length < 10}
              onClick={handlePost}
              className="rounded-none flex-1 w-[10rem] enabled:hover:bg-blue-800 focus:ring-blue-300 focus:ring-2 bg-blue-500"
            >
              <TfiWrite className="w-16 h-16" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 px-4 py-3">
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
