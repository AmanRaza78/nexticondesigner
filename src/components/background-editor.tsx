"use client";

import { useContext, useEffect, useState } from "react";
import { Slider } from "./ui/slider";
import ColorPickerPanel from "./color-picker-panel";
import { UpdateStorageContext } from "@/context/update-storage-context";

export default function BackgroundEditor() {
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);
  const [storageValue, setStorageValue] = useState<any>(updateStorage || {});
  const [rounded, setRounded] = useState(storageValue?.bgRounded || 0);
  const [padding, setPadding] = useState(storageValue?.bgPadding || 0);
  const [color, setColor] = useState(storageValue?.bgColor || "#000");

  // Sync storageValue with the latest updateStorage whenever it changes
  useEffect(() => {
    if (updateStorage) {
      setStorageValue(updateStorage);
      setRounded(updateStorage.bgRounded || 0);
      setPadding(updateStorage.bgPadding || 0);
      setColor(updateStorage.bgColor || "#000");
    }
  }, [updateStorage]);

  // Update the context and localStorage whenever a state changes
  useEffect(() => {
    const updatedValue = {
      ...storageValue,
      bgRounded: rounded,
      bgPadding: padding,
      bgColor: color,
    };
    setUpdateStorage(updatedValue);
    localStorage.setItem("value", JSON.stringify(updatedValue));
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
        <ColorPickerPanel
          selectedColor={(color) => setColor(color)}
          setHiddenControl={false}
        />
      </div>
    </div>
  );
}
