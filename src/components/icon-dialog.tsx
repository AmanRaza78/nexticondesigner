import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { iconList } from "@/constants/icon-list";
import { useEffect, useState } from "react";
import { icons, LucideIcon } from "lucide-react";

interface IconDialogProps {
  selectedIcon: (value: string) => void;
}

interface CustomIconProps {
  name: keyof typeof icons; // Ensure name corresponds to a valid icon key
  color?: string;
  size?: string | number;
}

const CustomIcon: React.FC<CustomIconProps> = ({ name, color, size }) => {
  const LucidIcon: LucideIcon | undefined = icons[name];
  if (!LucidIcon) {
    return null;
  }
  return <LucidIcon color={color} size={size} />;
};

export function IconDialog({ selectedIcon }: IconDialogProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [storageValue, setStorageValue] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem("value");
      setStorageValue(storedValue ? JSON.parse(storedValue) : {});
    }
  }, []);

  const [icon, setIcon] = useState(storageValue ? storageValue?.icon : "Cat");

  return (
    <div>
      <div>
        <label>Icon</label>
        <div
          className="bg-secondary cursor-pointer p-3 rounded-md w-[55px] h-[55px] my-2 flex items-center justify-center"
          onClick={() => setOpenDialog(true)}
        >
          <CustomIcon
            name={icon as keyof typeof icons}
            color="#000"
            size={20}
          />
        </div>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pic Your Favorite Icon</DialogTitle>
            <DialogDescription>
              <div className="grid gird-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-auto h-[400px] p-6">
                {iconList.map((icon, index) => (
                  <div
                    className="border p-4 flex rounded-sm items-center justify-center cursor-pointer"
                    onClick={() => {
                      selectedIcon(icon);
                      setOpenDialog(false);
                      setIcon(icon);
                    }}
                    key={index}
                  >
                    <CustomIcon
                      name={icon as keyof typeof icons}
                      color="#000"
                      size={20}
                    />
                  </div>
                ))}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
