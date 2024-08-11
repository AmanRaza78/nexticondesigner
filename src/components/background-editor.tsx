"use client";

import { useContext, useEffect, useState } from "react";
import { Slider } from "./ui/slider";
import ColorPickerPanel from "./color-picker-panel";
import { UpdateStorageContext } from "@/context/update-storage-context";

export default function BackgroundEditor() {
    const [storageValue, setStorageValue] = useState<any>(null);
    useEffect(() => {
        if (typeof window !== "undefined") {
          const storedValue = localStorage.getItem("value");
          setStorageValue(storedValue ? JSON.parse(storedValue) : {});
        }
      }, []);

    const [rounded, setRounded] = useState(storageValue?storageValue?.bgRounded:0)
    const [padding, setPadding] = useState(storageValue?storageValue?.bgPadding:0)
    const [color, setColor] = useState(storageValue?storageValue?.bgColor:"#000");
  
    const {updateStorage, setUpdateStorage} = useContext(UpdateStorageContext)



    
      useEffect(() => {
        if (storageValue) {
          const updatedValue = {
            ...storageValue,
            bgRounded: rounded,
            bgPadding: padding,
            bgColor: color,
          };
          setUpdateStorage(updatedValue)
          localStorage.setItem("value", JSON.stringify(updatedValue));
        }
      }, [rounded, padding, color]);
    


  return (
    <div>
      <div className="py-2">
        <label className="p-2 flex items-center justify-between">
          Rounded <span>{rounded}</span>
        </label>
        <Slider
          defaultValue={[rounded]}
          max={512}
          step={1}
          onValueChange={(event) => setRounded(event[0])}
        />
      </div>
      <div className="py-2">
        <label className="p-2 flex items-center justify-between">
          Padding <span>{padding}</span>
        </label>
        <Slider
          defaultValue={[padding]}
          max={512}
          step={1}
          onValueChange={(event) => setPadding(event[0])}
        />
      </div>
      <div className="py-2">
        <label className="p-2">Color Picker</label>
        <ColorPickerPanel selectedColor={(color) => setColor(color)} setHiddenControl={false}/>
      </div>
    </div>
  );
}
