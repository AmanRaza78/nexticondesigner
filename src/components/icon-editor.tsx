"use client";

import { useContext, useEffect, useState } from "react";
import { Slider } from "./ui/slider";
import ColorPickerPanel from "./color-picker-panel";
import { UpdateStorageContext } from "@/context/update-storage-context";
import { IconDialog } from "./icon-dialog";

export default function IconEditor() {
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);
  const [storageValue, setStorageValue] = useState<any>(updateStorage || {});
  const [size, setSize] = useState(storageValue?.iconSize || 280);
  const [rotate, setRotate] = useState(storageValue?.iconRotate || 0);
  const [color, setColor] = useState(storageValue?.iconColor || "#fff");
  const [icon, setIcon] = useState(storageValue?.icon || "Cat");

  // Sync storageValue with the latest updateStorage whenever it changes
  useEffect(() => {
    if (updateStorage) {
      setStorageValue(updateStorage);
      setSize(updateStorage.iconSize || 280);
      setRotate(updateStorage.iconRotate || 0);
      setColor(updateStorage.iconColor || "#fff");
      setIcon(updateStorage.icon || "Cat");
    }
  }, [updateStorage]);

  // Update the context and localStorage whenever a state changes
  useEffect(() => {
    const updatedValue = {
      ...storageValue,
      iconSize: size,
      iconRotate: rotate,
      iconColor: color,
      icon: icon,
    };
    setUpdateStorage(updatedValue);
    localStorage.setItem("value", JSON.stringify(updatedValue));
  }, [size, rotate, color, icon]);

  return (
    <div>
      <IconDialog selectedIcon={(icon) => setIcon(icon)} />
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
