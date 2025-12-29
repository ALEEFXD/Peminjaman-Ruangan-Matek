import Badge from "@/components/ui/badge.jsx";
import Button from "@/components/ui/button.jsx";
import { Users, Layers, ClockPlus } from 'lucide-react';

export default function RoomCard({ imgDir, roomName, floor, capacity, facilities }) {
    const parseFacilities = (text) => {
        if (typeof text !== 'string') return [];
        return text.split(',').map((item) => item.trim());
    };

    const facilitiesList = parseFacilities(facilities);

    return(
        <div className="bg-neutral-1 stroke-grey-0 rounded-[20px] p-[10px] gap-[10px] flex flex-col h-fit w-full">
            <img src={imgDir} alt={`Ruang ${roomName}`} className="w-full h-40 object-cover rounded-[10px]" />
            <div className="gap-[5px] flex flex-col">
                <h3 className="text-xl font-bold">Ruang {roomName}</h3>
                <Badge><Layers /> Lantai {floor}</Badge>
                <Badge><Users /> Maks. {capacity} orang</Badge>
                <div className="flex flex-wrap gap-[5px] mb-[5px]">
                    {facilitiesList.map((facility, index) => (

                        <Badge key={index} variant="outline">{facility}</Badge>

                    ))}
                </div>
                <Button className="w-fit" size="icon" variant="destructive"><ClockPlus /></Button>
            </div>
        </div>
    )
}