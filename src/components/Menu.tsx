const connections: Array<any> = [];

for (let i = 1; i <= 20; i++) {
  connections.push({
    id: i,
    name: `Person ${i}`,
    email: `person${i}@example.com`,
    image: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
  });
}
export function Menu() {
  return (
    <div className="w-full max-w-md bg-white px-2 overflow-y-auto menu">
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          {connections.map((connection) => (
            <li key={connection.id} className="py-3 sm:py-4 cursor-pointer">
              <div className="flex items-center ">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={connection.image}
                    alt={`${connection.name} image`}
                  />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {connection.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {connection.email}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
