import React from "react";

export default function Drop2() {
  return (
    <div class="flex justify-center">
      <div>
        <div className="bg-600 dropdown relative group inline-block hover:bg-sky-500 focus:bg-sky-500 rounded">
          <button
            href="#"
            data-bs-toggle="dropdown"
            data-dropdown-toggle="dropdown2"
            className=" dropdown
            px-6
            py-2.5
            text-white
            rounded
            flex
            items-center
            whitespace-nowrap
            text-white pl-3  pr-4 py-1 px-2  focus:bg-sky-500 rounded md:p-0 flex items-center justify-between w-full md:w-auto"
          >
            Gần đây
            <svg
              className="w-6 h-6 ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div
            id="dropdown2"
            className=" dropdown-menu
            min-w-max
            absolute
            hidden
            bg-white
            py-2
            shadow

            list-none
            text-left
            rounded-lg
            mt-1
            hidden
            m-0
            border-none
             bg-white z-10 list-none divide-y-2 divide-gray-100 rounded py-2 my-1 w-44 w-64 "
            aria-labelledby="dropdownMenuButton2"
          >
            <div className="py-1">
              <a
                href="#"
                className="text-sm block text-center cursor-text text-black p-2 flex flex-row"
              >
                <span className="text-center w-11/12 text-stone-500 align-middle">
                  Gần đây
                </span>
                <button
                  className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded "
                  aria-label="close modal"
                  role="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-x"
                    width={17}
                    height={17}
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1={18} y1={6} x2={6} y2={18} />
                    <line x1={6} y1={6} x2={18} y2={18} />
                  </svg>
                </button>
              </a>
            </div>
            <div className="flex flew-col gap-3">
              <ul
                className="py-1 rounded-sm text-black "
                aria-labelledby="dropdownLargeButton"
              >
                <li>
                  <a href="#" className="text-sm block px-4 py-2">
                    ....
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
