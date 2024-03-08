import { Link,  useParams } from "react-router-dom";
import { Layout } from "../components/Layout";
import { useEffect, useState } from "react";
import * as usersService from "../services/users";
import { User } from "../types/models";
import { Avatar, Button } from "flowbite-react";

export function Search() {
  const [users, setUsers] = useState<User[]>([]);
  const { q } = useParams();
  async function getData(q: string) {
    try {
      const data = await usersService.findAll(q);
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getData(q || "");
  }, [q || ""]);
  return (
    <Layout>
      <div className="flex flex-1 flex-col w-full overflow-y-auto menu">
        <div className="flex flex-1 flex-col px-4 pt-3 pb-1 gap-2">
          <div className="grid grid-cols-2">
            {users.map((user) => (
              <div key={user.id} className="w-full">
                <div className="flex flex-1 flex-row">
                  <div className="flex flex-1 flex-row gap-4 border-2">
                    <div className="flex flex-col items-center p-2">
                      {!user.photo_url ? (
                        <img
                          alt="Bonnie image"
                          height="80"
                          src="https://www.flowbite-react.com/images/people/profile-picture-3.jpg"
                          width="80"
                          className="rounded-full shadow-lg"
                        />
                      ) : (
                        <Avatar size={"lg"} />
                      )}
                    </div>
                    <div className="flex-1 p-2">
                      <h5 className="mb-1 text-xl font-medium text-gray-900">
                        {user.first_name} {user.last_name}
                      </h5>
                      <div>
                        <span className="text-sm text-gray-500">
                          {user.business || "Business not found"}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">
                          {user.position_name || "Position not found"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <Button
                      as={Link}
                      className="flex-1 rounded-none"
                      to={`/chats/${user.username}`}
                    >
                      Write
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
