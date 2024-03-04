import { Link } from "react-router-dom";
import { User } from "../types/models";

const connections: Array<User> = [];

for (let i = 1; i <= 20; i++) {
  connections.push({
    id: i,
    first_name: `Firstname ${i}`,
    last_name: `Lastname ${i}`,
    username: `person${i}`,
    email: `person${i}@example.com`,
    photo_url: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
  });
}
export function Menu() {
  return (
    <div className="w-full max-w-md bg-white px-2 overflow-y-auto menu">
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          {connections.map((connection) => (
            <li key={connection.id} className="py-3 sm:py-4 cursor-pointer">
              <Link
                to={`/chats/${connection.id}`}
                className="flex items-center "
              >
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={connection.photo_url}
                    alt={`${connection.first_name} ${connection.last_name}`}
                  />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {connection.first_name} {connection.last_name}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {connection.email}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
