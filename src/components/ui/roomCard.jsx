import Badge from "@/components/ui/badge.jsx";
import Button from "@/components/ui/button.jsx";
import { Users, Layers, ClockPlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import RoomField from "@/components/ui/roomField";

export default function RoomCard({ imgDir, roomName, floor, capacity, facilities }) {
    const parseFacilities = (text) => {
        if (typeof text !== 'string') return [];
        return text.split(',').map((item) => item.trim());
    };

    const facilitiesList = parseFacilities(facilities);

    return(
        <div className="bg-neutral-1 border border-grey-0 rounded-[20px] p-[10px] gap-[10px] flex justify-between flex-col h-[70vh] min-h-fit w-full">
            <img src={imgDir} alt={`Ruang ${roomName}`} className="w-full h-1/2 object-cover rounded-[10px]" />
            <div className="gap-[5px] flex flex-col">
                <h3 className="text-xl font-bold">Ruang {roomName}</h3>
                <Badge><Layers /> Lantai {floor}</Badge>
                <Badge><Users /> Maks. {capacity} orang</Badge>
                <div className="flex flex-wrap gap-[5px] mb-[5px]">
                    {facilitiesList.map((facility, index) => (

                        <Badge key={index} variant="outline">{facility}</Badge>

                    ))}
                </div>

                <Dialog className="w-[100vw]">
                    <DialogTrigger>
                        <Button className="w-full" variant="secondary"><ClockPlus/></Button>
                    </DialogTrigger>
                    <DialogContent className="">
                        <RoomField roomName={roomName} />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}