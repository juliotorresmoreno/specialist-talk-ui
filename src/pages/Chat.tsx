import { useParams } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Input } from "../components/Input";
import { Button } from "flowbite-react";
import * as usersService from "../services/users";
import * as chatsService from "../services/chats";
import { useEffect, useRef, useState } from "react";
import * as models from "../types/models";
import { Message } from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import messagesSlice from "../features/messages";
import { RootState } from "../store";
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

export function Chat() {
  const { username } = useParams();
  const dispatch = useDispatch();
  const conversationRef = useRef<HTMLDivElement>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [user, setUser] = useState<models.User | null>(null);
  const [chat, setChat] = useState<models.Chat | null>(null);
  const chatId = chat?.id ?? 0;
  const messages = useSelector((state: RootState) => state.messages);
  async function getData() {
    if (!username) return;
    const data = await usersService.findOne(username);
    setUser(data);
    const chat = await chatsService.create(data.id);
    setChat(chat);
    const messages = await chatsService.getMessages(chat.id);
    dispatch(messagesSlice.actions.addMessages({ chat_id: chat.id, messages }));
  }
  useEffect(() => {
    getData();
  }, [username]);

  useEffect(() => {
    if (!conversationRef.current) return;

    conversationRef.current?.scrollTo({
      top: conversationRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = async () => {
    if (!chat) return;
    await chatsService.createMessage(chat.id, prompt);
    setPrompt("");
  };

  const handlePropmtKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  if (!chat) return null;

  return (
    <Layout>
      <div className="flex flex-1 flex-col w-full">
        <div className="flex flex-1 flex-col px-4 pt-3 pb-1 gap-2">
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex gap-2">
              <div className="flex-1 p-2 font-bold">
                {user?.first_name} {user?.last_name}
              </div>
              <div className="flex flex-row gap-2">
                <Button
                  disabled={chat.chat_users.length === 1}
                  className="rounded-none bg-green-500"
                >
                  <IoCall className="w-6 h-6" />
                </Button>
                <Button
                  disabled={chat.chat_users.length === 1}
                  className="rounded-none bg-blue-500"
                >
                  <FaVideo className="w-6 h-6" />
                </Button>
              </div>
            </div>
            <div
              ref={conversationRef}
              className="flex flex-1 flex-col gap-2 overflow-y-auto conversation"
            >
              {(messages[chatId] || []).map((message) => (
                <Message key={message.id} {...message} />
              ))}
            </div>
          </div>

          <div className="flex flex-row gap-2">
            <Input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyUp={handlePropmtKeyUp}
              placeholder="Type a message"
              className="rounded-none flex-1"
            />
            <Button className="rounded-none bg-blue-500" onClick={handleSend}>
              <IoSend />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
