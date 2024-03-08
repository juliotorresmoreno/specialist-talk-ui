import { useSelector } from "react-redux";
import * as models from "../types/models";
import { RootState } from "../store";

export interface MessageProps extends models.Message {}

export function Message({ id, content, user }: MessageProps) {
  //const session = useSelector((state: RootState) => state.auth.session);

  if (id % 2 === 0) {
    return (
      <div className="flex gap-2">
        <div className="flex flex-[.7] bg-white p-2 text-justify">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 justify-end">
      <div className="flex flex-[.7] bg-white p-2 justify-end text-justify">
        {content}
      </div>
    </div>
  );
}
