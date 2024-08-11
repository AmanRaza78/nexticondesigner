"use client";
import BackgroundEditor from "@/components/background-editor";
import IconEditor from "@/components/icon-editor";
import IconSection from "@/components/logo-section";
import SideNav from "@/components/sidenav";
import { UpdateStorageContext } from "@/context/update-storage-context";
import { useState } from "react";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState(0);
  const [updateStorage, setUpdateStorage] = useState({})
  return (
    <UpdateStorageContext.Provider value={{updateStorage, setUpdateStorage}}>
          <>
      <div className="w-64 fixed">
        <SideNav selectedItem={(value) => setSelectedItem(value)} />
      </div>
      <div className="ml-64 grid grid-cols-1 md:grid-cols-6">
        <div className="md:col-span-3 h-screen border shadow-sm p-5 overflow-auto">
          {selectedItem === 0 ? <IconEditor /> : <BackgroundEditor />}
        </div>
        <div className="md:col-span-3 h-screen">
          <IconSection/>
        </div>
      </div>
    </>
    </UpdateStorageContext.Provider>

  );
}
