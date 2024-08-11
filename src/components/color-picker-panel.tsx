"use client";
import { useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";

interface ColorPickerProps {
    selectedColor: (value: string) => void;
    setHiddenControl: boolean
  }

export default function ColorPickerPanel({selectedColor, setHiddenControl}:ColorPickerProps) {
  const [color, setColor] = useState("rgba(255,255,255,1)");

  return (
    <div>
      <ColorPicker
        value={color}
        onChange={(e)=>{setColor(e); selectedColor(e)}}
        className="bg-background border shadow-md"
        hideControls = {setHiddenControl}
        hideEyeDrop
        hideAdvancedSliders
        hideColorGuide
        hideInputType
      />
    </div>
  );
}
