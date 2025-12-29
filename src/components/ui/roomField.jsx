import { useState, useEffect } from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import checkPeminjamanHours from "../../utils/checkPeminjamanHours"

const timeSlots = [
    { jam_mulai: "08:00:00", jam_selesai: "09:00:00" },
    { jam_mulai: "09:00:00", jam_selesai: "10:00:00" },
    { jam_mulai: "10:00:00", jam_selesai: "11:00:00" },
    { jam_mulai: "11:00:00", jam_selesai: "12:00:00" },
    { jam_mulai: "12:00:00", jam_selesai: "13:00:00" },
    { jam_mulai: "13:00:00", jam_selesai: "14:00:00" },
    { jam_mulai: "14:00:00", jam_selesai: "15:00:00" },
    { jam_mulai: "15:00:00", jam_selesai: "16:00:00" },
]

export default function RoomField({ roomName }) {

    
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState()
    const [selectedSlots, setSelectedSlots] = useState([])
    const [occupiedSlots, setOccupiedSlots] = useState([])

    useEffect(() => {
        setOccupiedSlots([])
        setSelectedSlots([])

        const fetchOccupied = async () => {
            if (date && roomName) {
                const year = date.getFullYear()
                const month = String(date.getMonth() + 1).padStart(2, '0')
                const day = String(date.getDate()).padStart(2, '0')
                const formattedDate = `${year}-${month}-${day}`

                const occupiedRanges = await checkPeminjamanHours(roomName, formattedDate)
                if (occupiedRanges) {
                    const occupied = timeSlots.filter(slot => {
                        return occupiedRanges.some(range => 
                            slot.jam_mulai < range.jam_selesai && slot.jam_selesai > range.jam_mulai
                        )
                    }).map(slot => slot.jam_mulai)
                    setOccupiedSlots(occupied)
                }
            }
        }
        fetchOccupied()
    }, [date, roomName])

  return (
    <FieldGroup className="w-full max-w-md">
        <FieldSet>
        <FieldLegend>Pengajuan Peminjaman</FieldLegend>
        <FieldDescription>
            Ruang {roomName}
        </FieldDescription>
        <FieldGroup>    
            <Field>
            <FieldLabel htmlFor="date-pmjrngn">
                Pilih Tanggal Penggunaan
            </FieldLabel>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    id="date-pmjrngn"
                    className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-grey-0"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? date.toLocaleDateString() : "Pilih tanggal"}
                </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                    required
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    disabled={(date) => date < new Date().setHours(0, 0, 0, 0)}
                    onSelect={(date) => {
                    setDate(date)
                    setOpen(false)
                    }}
                />
                </PopoverContent>
                </Popover>
            </Field>
            {date && (
            <Field>
            <FieldLabel htmlFor="time-pmjrngn">
                Waktu Peminjaman
            </FieldLabel>
            <div id="time-pmjrngn" className="grid grid-cols-4  gap-2">
                {timeSlots.map((slot, index) => (
                    <div key={index} className="relative min-w-fit">
                        <input
                            required
                            type="checkbox"
                            id={`slot-${index}`}
                            className="peer sr-only"
                            disabled={occupiedSlots.includes(slot.jam_mulai)}
                            checked={selectedSlots.some((s) => s.jam_mulai === slot.jam_mulai)}
                            onChange={() => {
                                if (selectedSlots.length === 1 && selectedSlots[0].jam_mulai === slot.jam_mulai) {
                                    setSelectedSlots([])
                                } else if (selectedSlots.length === 1) {
                                    const firstIndex = timeSlots.findIndex((s) => s.jam_mulai === selectedSlots[0].jam_mulai)
                                    const start = Math.min(firstIndex, index)
                                    const end = Math.max(firstIndex, index)
                                    const range = timeSlots.slice(start, end + 1)
                                    
                                    const hasOccupied = range.some((s) => occupiedSlots.includes(s.jam_mulai))
                                    setSelectedSlots(hasOccupied ? [slot] : range)
                                } else {
                                    setSelectedSlots([slot])
                                }
                            }}
                        />
                        <label
                            htmlFor={`slot-${index}`}
                            className="flex h-9 w-full cursor-pointer items-center justify-center rounded-md border border-grey-0 bg-neutral-0 text-sm font-medium transition-colors hover:bg-neutral-2 peer-checked:border-orange-2 peer-checked:bg-orange-2 peer-checked:text-fixed-white peer-focus-visible:ring-2 peer-focus-visible:ring-orange-2/50 peer-disabled:cursor-not-allowed peer-disabled:bg-neutral-2 peer-disabled:text-grey-0 peer-disabled:opacity-50"
                        >
                            {slot.jam_mulai.slice(0, 5)} - {slot.jam_selesai.slice(0, 5)}
                        </label>
                    </div>
                ))}
            </div>
            </Field>
            )}
            {selectedSlots.length > 0 && (
                <Field>
                <FieldLabel htmlFor="file-pmjrngn">
                  Surat Permohonan
                </FieldLabel>
                <Input
                  id="file-pmjrngn"
                  type="file"
                  accept=".pdf, .jpg, .png"
                  placeholder=".pdf, .jpg, .png"
                  required
                  onChange={(e) => {
                    const file = e.target.files[0]
                    if (file) {
                        if (file.size > 10 * 1024 * 1024) {
                            alert("File size exceeds 10MB")
                            e.target.value = ""
                            return
                        }
                        if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
                            alert("Only .pdf, .jpg, .png files are allowed")
                            e.target.value = ""
                        }
                    }
                  }}
                />
            </Field>
    )}
        <Field>
                <FieldLabel htmlFor="perm-pmjrngn">
                  Keperluan
                </FieldLabel>
                <Input
                  id="perm-pmjrngn"
                  placeholder="Mata Kuliah Statistika"
                  required
                />
            </Field>
        </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <Field orientation="horizontal">
        <Button type="submit" variant="secondary">Submit</Button>
        </Field>
    </FieldGroup>
  )
}
