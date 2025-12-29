import { Button } from "./ui/button";
import RoomCard from "./ui/roomCard.jsx";

export default function Rooms(){
    const rooms = [
        {
            nama_ruangan: '501',
            lantai: 5,
            kapasitas: 30,
            fasilitas: 'Meja, Bangku, Komputer, Papan Tulis, TV, AC'
        },
        {
            nama_ruangan: '502',
            lantai: 5,
            kapasitas: 30,
            fasilitas: 'Meja, Bangku, Komputer, Papan Tulis, TV, AC'
        },
        {
            nama_ruangan: '503',
            lantai: 5,
            kapasitas: 30,
            fasilitas: 'Meja, Bangku, Komputer, Papan Tulis, TV, AC'
        },
        {
            nama_ruangan: '504',
            lantai: 5,
            kapasitas: 30,
            fasilitas: 'Meja, Bangku, Komputer, Papan Tulis, TV, AC'
        },
        {
            nama_ruangan: '505',
            lantai: 5,
            kapasitas: 30,
            fasilitas: 'Meja, Bangku, Komputer, Papan Tulis, TV, AC'
        },
        {
            nama_ruangan: '506',
            lantai: 5,
            kapasitas: 30,
            fasilitas: 'Meja, Bangku, Komputer, Papan Tulis, TV, AC'
        },
        {
            nama_ruangan: '507',
            lantai: 5,
            kapasitas: 30,
            fasilitas: 'Meja, Bangku, Komputer, Papan Tulis, TV, AC'
        },
        {
            nama_ruangan: '508',
            lantai: 5,
            kapasitas: 30,
            fasilitas: 'Meja, Bangku, Komputer, Papan Tulis, TV, AC'
        },
        {
            nama_ruangan: '509',
            lantai: 5,
            kapasitas: 30,
            fasilitas: 'Meja, Bangku, Komputer, Papan Tulis, TV, AC'
        },
        {
            nama_ruangan: '510',
            lantai: 5,
            kapasitas: 30,
            fasilitas: 'Meja, Bangku, Komputer, Papan Tulis, TV, AC'
        },
        {
            nama_ruangan: '601',
            lantai: 6,
            kapasitas: 40,
            fasilitas: 'Meja, Bangku, Papan Tulis, TV, AC'
        },
        {
            nama_ruangan: '602',
            lantai: 6,
            kapasitas: 40,
            fasilitas: 'Meja, Bangku, Papan Tulis, TV, AC'
        },
        {
            nama_ruangan: '603',
            lantai: 6,
            kapasitas: 40,
            fasilitas: 'Meja, Bangku, Papan Tulis, TV, AC'
        },
        {
            nama_ruangan: '604',
            lantai: 6,
            kapasitas: 40,
            fasilitas: 'Meja, Bangku, Papan Tulis, TV, AC'
        },
        {
            nama_ruangan: '605',
            lantai: 6,
            kapasitas: 40,
            fasilitas: 'Meja, Bangku, Papan Tulis, TV, AC'
        },
        {
            nama_ruangan: '606',
            lantai: 6,
            kapasitas: 40,
            fasilitas: 'Meja, Bangku, Papan Tulis, TV, AC'
        },
        {
            nama_ruangan: '607',
            lantai: 6,
            kapasitas: 40,
            fasilitas: 'Meja, Bangku, Papan Tulis, TV, AC'
        },
        {
            nama_ruangan: '608',
            lantai: 6,
            kapasitas: 40,
            fasilitas: 'Meja, Bangku, Papan Tulis, TV, AC'
        },
        {
            nama_ruangan: '609',
            lantai: 6,
            kapasitas: 40,
            fasilitas: 'Meja, Bangku, Papan Tulis, TV, AC'
        },
        {
            nama_ruangan: '610',
            lantai: 6,
            kapasitas: 40,
            fasilitas: 'Meja, Bangku, Papan Tulis, TV, AC'
        }
    ];

    return(
        <div className="w-full h-fit p-20 flex flex-col text-main bg-neutral-0">
            <h2 className="text-3xl font-bold mb-8">Daftar Ruangan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-fit w-full">
                {/* Using the JavaScript .map() function inside JSX */}
                {rooms.map((room, index) => (
                    <RoomCard
                    key={index}
                    roomName={room.nama_ruangan}
                    floor={room.lantai}
                    capacity={room.kapasitas}
                    facilities={room.fasilitas}
                    imgDir={`/lantai-${room.lantai}.jpg`} />
                ))}
            </div>
        </div>
    )
}