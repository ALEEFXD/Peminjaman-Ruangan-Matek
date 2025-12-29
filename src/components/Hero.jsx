export default function Hero() {
  return (
    <div className="h-[100vh] relative shrink-0 w-full flex">
      <div id="heroText" className="z-[3] p-20 gap-0  w-full h-full flex flex-col justify-end text-white">
        <h1 className="">
          Peminjaman Ruangan Rumpun Matematika
        </h1>
        <p className="">
          Peminjaman ruangan lantai 5 dan 6, Gedung Dewi Sartika, Kampus A,Universitas Negeri Jakarta.
        </p>
      </div>
      <div className="absolute bg-gradient-to-t from-orange-0 h-full w-full top-0 left-0 z-[2]"></div>
      <div className="w-full h-full absolute z-[1] top-0 left-0">
        <img
          alt="Gedung Dewi Sartika"
          className="absolute h-full w-full top-0 left-0 object-cover"
          src="public/dewi-sartika.jpg"
        />
      </div>
    </div>
  )
}