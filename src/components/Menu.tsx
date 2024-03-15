import { Link } from "react-router-dom";
import { Chat, User } from "../types/models";
import * as chatsService from "../services/chats";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import chatsSlice from "../features/chats";

const defaultPhotoURL =
  "https://www.flowbite-react.com/images/people/profile-picture-3.jpg";

function parseData(session: User, data: Chat) {
  if (data.chat_users.length === 1) {
    return {
      id: data.id,
      code: data.chat_users[0].user.username,
      fullname: `${data.chat_users[0].user.first_name} ${data.chat_users[0].user.last_name}`,
      photoURL: data.chat_users[0].user.photo_url,
      active: data.active,
      description: data.chat_users[0].user.business,
      creation_at: data.creation_at,
      updated_at: data.updated_at,
    };
  }
  if (data.chat_users.length === 2) {
    const user = data.chat_users.find(
      (chatUser) => chatUser.user.id !== session.id
    );
    return {
      id: data.id,
      code: user?.user.username,
      fullname: `${user?.user.first_name} ${user?.user.last_name}`,
      photoURL: user?.user.photo_url,
      active: data.active,
      description: user?.user.business,
      creation_at: data.creation_at,
      updated_at: data.updated_at,
    };
  }
  return {
    id: data.id,
    code: data.code,
    fullname: data.name,
    photoURL: data.owner.photo_url,
    active: data.active,
    description: data.name,
    creation_at: data.creation_at,
    updated_at: data.updated_at,
  };
}

function _Menu() {
  const session = useSelector((state: RootState) => state.auth.session);
  const chats = useSelector((state: RootState) => state.chats.items);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  async function getData() {
    if (isLoaded) return;
    const data = await chatsService.getChats();
    dispatch(chatsSlice.actions.set(data));
    setIsLoaded(true);
  }
  useEffect(() => {
    getData();
  }, [session]);

  return (
    <div className="w-full max-w-md bg-white px-2 overflow-y-auto menu">
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          {chats.map((chat) => {
            const data = parseData(session as User, chat);
            return (
              <li key={data.id} className="py-3 sm:py-4">
                <Link
                  to={`/chats/${data.code}`}
                  className="flex items-center cursor-pointer"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={data.photoURL || defaultPhotoURL}
                      alt={`Avatar of ${data.fullname}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      <span key={data.id}>{data.fullname}</span>
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {data.description}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export const Menu = memo(_Menu);
