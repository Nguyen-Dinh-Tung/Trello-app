import React from "react";

export default function UserInfo() {
  return (

    <div className="h-full md:w-2/3 md:mx-auto md:my-10 ">

        <div className=" block md:flex ">
        <div className="w-full md:w-2/5 p-8 bg-white border rounded shadow ">
            
            <div className="flex">
              <span className="text-xl font-semibold block mx-auto">User Info</span>
            </div>
    
            <div className="w-full p-8 flex justify-center object-cover">
              <img
                id="showImage"
                className=" rounded-lg object-cover block mx-auto "
                src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
                alt=""
              />
            </div>

            <div className="flex justify-between">
              <button className="block mx-auto px-2 border rounded border-slate-700">Update Avatar</button>
            </div>

          </div>

          <div className="w-full md:w-3/5 p-8 lg:ml-4 border rounded  ">
            <div className="border rounded p-6">

              <div className="pb-6">
                <label
                  htmlFor="name"
                  className="font-semibold text-gray-700 block pb-1"
                >
                  User Name
                </label>
                <div className="flex">
                  <input
                    disabled
                    id="username"
                    className="border-1  rounded-r px-4 py-2 w-full"
                    type="text"
                    defaultValue="Jane Name"
                  />
                </div>
              </div>

              <div className="pb-6">
                <label
                  htmlFor="name"
                  className="font-semibold text-gray-700 block pb-1"
                >
                  Email
                </label>
                <div className="flex">
                  <input
                    disabled
                    id="username"
                    className="border-1  rounded-r px-4 py-2 w-full"
                    type="text"
                    defaultValue="Jane Name"
                  />
                </div>
              </div>

              <div className="flex justify-between">
              <button className="block mx-auto px-2 border rounded border-slate-700">Update PassWord</button>
            </div>

              </div>
            </div>
          </div>
        </div>

  );
}
