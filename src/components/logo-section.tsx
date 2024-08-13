"use client"

import { UpdateStorageContext } from "@/context/update-storage-context";
import html2canvas from "html2canvas";
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

export default function IconSection({downloadIcon}:any){
    const [storageValue, setStorageValue] = useState<any>(null);
    const {updateStorage, setUpdateStorage} = useContext(UpdateStorageContext)


    useEffect(() => {
      if (typeof window !== "undefined") {
        const storedValue = localStorage.getItem("value");
        setStorageValue(storedValue ? JSON.parse(storedValue) : {});
      }
    }, [updateStorage]);

    useEffect(()=>{
        if(downloadIcon){
            downloadIconPng()
        }
    }, [downloadIcon])

    const downloadIconPng = () => {
        const downloadIconDiv = document.getElementById('downloadIconDiv');
    
        if (!downloadIconDiv) {
            console.error("Element with id 'downloadIconDiv' not found.");
            return;
        }
    
        html2canvas(downloadIconDiv, {
            backgroundColor: null
        }).then(canvas => {
            const pngImage = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = pngImage;
            downloadLink.download = 'Next_Icon_Maker.png';
            downloadLink.click();
        }).catch(error => {
            console.error("Error generating canvas:", error);
        });
    };

    return(
        <div className="flex items-center justify-center h-screen">
            <div className="h-[400px] w-[400px] bg-secondary outline-slate-500 outline-double" style={{
                padding:storageValue?.bgPadding
            }}>
                <div id="downloadIconDiv" className="h-full w-full flex items-center justify-center" style={{
                    borderRadius: storageValue?.bgRounded,
                    background: storageValue?.bgColor
                }}>
                    <CustomIcon name={storageValue?.icon} color={storageValue?.iconColor} size={storageValue?.iconSize} rotate={storageValue?.iconRotate}/>
                </div>
            </div>

        </div>
    )
}