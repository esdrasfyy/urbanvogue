import React from "react";
import { VscSurroundWith } from "react-icons/vsc";

function EmptyUi({ title, message }: { title: string; message: string }) {
  return (
    <div className="flex flex-col w-full p-4 bg-custom-grayTwo text-custom-textColor justify-center rounded-md shadow-snipped items-center">
      <div className="text-7xl my-5 text-custom-pink">
        <VscSurroundWith />
      </div>
      <div className="flex flex-col gap-5 mb-5 items-center">
        <h1 className="uppercase text-xl font-semibold text-custom-textColor">
          {title}
        </h1>
        <p className="text-custom-textColor/50 text-center">{message}</p>
      </div>
    </div>
  );
}

export { EmptyUi };
