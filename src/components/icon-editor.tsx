"use client";
import { Cat } from "lucide-react";
import { Slider } from "./ui/slider";
import { useContext, useEffect, useState } from "react";
import ColorPickerPanel from "./color-picker-panel";
import { UpdateStorageContext } from "@/context/update-storage-context";

export default function IconEditor() {
  const [storageValue, setStorageValue] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem("value");
      setStorageValue(storedValue ? JSON.parse(storedValue) : {});
    }
  }, []);
  const [size, setSize] = useState(storageValue ? storageValue?.iconSize : 280);
  const [rotate, setRotate] = useState(
    storageValue ? storageValue?.iconRotate : 0
  );
  const [color, setColor] = useState(
    storageValue ? storageValue?.iconColor : "#fff"
  );
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);

  useEffect(() => {
    if (storageValue) {
      const updatedValue = {
        ...storageValue,
        iconSize: size,
        iconRotate: rotate,
        iconColor: color,
        icon: "Cat",
      };
      setUpdateStorage(updatedValue);
      localStorage.setItem("value", JSON.stringify(updatedValue));
    }
  }, [size, rotate, color]);
  return (
    <div>
      <label>Icon</label>
      <div className="bg-secondary cursor-pointer p-3 rounded-md w-[55px] h-[55px] my-2 flex items-center justify-center">
        <Cat />
      </div>
      <div className="py-2">
        <label className="p-2 flex items-center justify-between">
          Size <span>{size} px</span>
        </label>
        <Slider
          defaultValue={[size]}
          max={512}
          step={1}
          onValueChange={(event) => setSize(event[0])}
        />
      </div>
      <div className="py-2">
        <label className="p-2 flex items-center justify-between">
          Rotate <span>{rotate}°</span>
        </label>
        <Slider
          defaultValue={[rotate]}
          max={360}
          step={1}
          onValueChange={(event) => setRotate(event[0])}
        />
      </div>
      <div className="py-2">
        <label className="p-2">Color Picker</label>
        <ColorPickerPanel
          selectedColor={(color) => setColor(color)}
          setHiddenControl={true}
        />
      </div>
    </div>
  );
}
