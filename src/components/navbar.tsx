"use client"
import { DownloadIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar({downloadCustomIcon}:any) {
  return (
    <header className="bg-background flex justify-between items-center p-2 border-b-2">
      <div>
        <p className="font-semibold text-2xl tracking-tighter text-primary">Icon Maker</p>
      </div>
      <div>
        <Button onClick={()=>downloadCustomIcon(Date.now())}>
          <DownloadIcon className="w-4 h-4" />
          Download
        </Button>
      </div>
    </header>
  );
}
