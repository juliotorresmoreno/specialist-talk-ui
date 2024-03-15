import { useSelector } from "react-redux";
import * as models from "../types/models";
import { RootState } from "../store";

export interface MessageProps extends models.Message {}

export function Message({ content, user }: MessageProps) {
  const session = useSelector((state: RootState) => state.auth.session);

  if (session?.id !== user.id) {
    return (
      <div className="flex gap-2">
        <div className="flex flex-[.7] bg-blue-100 p-2 text-justify border border-red-200">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 justify-end">
      <div className="flex flex-[.7] p-2 justify-end text-justify border border-blue-200">
        {content}
      </div>
    </div>
  );
}
