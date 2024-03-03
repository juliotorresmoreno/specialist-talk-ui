import { Button } from "flowbite-react";
import { Layout } from "../components/Layout";
import { TextArea } from "../components/TextArea";

export function Home() {
  return (
    <Layout>
      <div className="flex flex-col px-4 py-3 gap-2">
        <TextArea className="w-full" rows={4} />
        <div className="">
          <Button className="rounded-none w-[100px]">Post</Button>
        </div>
      </div>
    </Layout>
  );
}
