import { useParams } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Input } from "../components/Input";
import { Button } from "flowbite-react";

export function Chat() {
  const { username } = useParams();
  return (
    <Layout>
      <div className="flex flex-1 flex-col w-full overflow-y-auto menu">
        <div className="flex flex-1 flex-col px-4 pt-3 pb-1 gap-2">
          <div className="flex flex-1 border">asdasdas {username}</div>

          <div className="flex flex-row gap-2">
            <Input type="text" />
            <Button className="rounded-none bg-green-500">Send</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
