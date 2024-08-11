"use client";
import { useState } from "react";
import { Pencil } from 'lucide-react';
import { Images } from 'lucide-react';

interface SideNavProps {
  selectedItem: (value: number) => void;
}

export default function SideNav({selectedItem}:SideNavProps) {
  const menuItems = [
    {
      id: 1,
      name: "Icon",
      icon: Pencil
    },
    {
      id: 2,
      name: "Background",
      icon: Images
    },
  ];
  const [activeItem, setActiveItem] = useState(0);
  return (
    <div className="border shadow-sm h-screen">
      <div>
        {menuItems.map((item, index) => (
          <h2
            className={`p-4 text-base px-8 my-2 cursor-pointer flex items-center gap-2 hover:bg-primary hover:text-white ${
              activeItem == index && "bg-primary text-white"
            }`}
            onClick={()=>{setActiveItem(index); selectedItem(index)}}
            key={index}

          >
            <item.icon/>
            {item.name}
          </h2>
        ))}
      </div>
    </div>
  );
}
