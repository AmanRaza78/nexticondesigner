"use client"

import { UpdateStorageContext } from "@/context/update-storage-context";
import { icons, LucideIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";

interface CustomIconProps {
    name: keyof typeof icons; // Ensure name corresponds to a valid icon key
    color?: string;
    size?: string | number;
    rotate?:string | number
}

const CustomIcon: React.FC<CustomIconProps> = ({ name, color, size,rotate }) => {
    const LucidIcon: LucideIcon | undefined = icons[name];
    if (!LucidIcon) {
        return null;
    }
    return <LucidIcon color={color} size={size} style={{
        transform:`rotate(${rotate}deg)`
    }}/>;
};

export default function IconSection(){
    const [storageValue, setStorageValue] = useState<any>(null);
    const {updateStorage, setUpdateStorage} = useContext(UpdateStorageContext)


    useEffect(() => {
      if (typeof window !== "undefined") {
        const storedValue = localStorage.getItem("value");
        setStorageValue(storedValue ? JSON.parse(storedValue) : {});
      }
    }, [updateStorage]);

    return(
        <div className="flex items-center justify-center h-screen">
            <div className="h-[400px] w-[400px] bg-secondary outline-slate-500 outline-double" style={{
                padding:storageValue?.bgPadding
            }}>
                <div className="h-full w-full flex items-center justify-center" style={{
                    borderRadius: storageValue?.bgRounded,
                    background: storageValue?.bgColor
                }}>
                    <CustomIcon name={storageValue?.icon} color={storageValue?.iconColor} size={storageValue?.iconSize} rotate={storageValue?.iconRotate}/>
                </div>
            </div>

        </div>
    )
}