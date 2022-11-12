import React from "react";

export const Loading = () => {
  return (
    <div className="h-screen bg-opacity-50">
      <div className="flex justify-center items-center h-full">
        <i class="fa-brands fa-trello fa-fade fa-2xl">
          {" "}
          <a className="text-cyan-700">Trello</a>
        </i>
      </div>
    </div>
  );
};
