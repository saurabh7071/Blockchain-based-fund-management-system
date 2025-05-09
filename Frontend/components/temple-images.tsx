import Image from "next/image"

export const templeImages = [
  {
    id: 1,
    name: "ISKCON Temple",
    location: "Delhi",
    image: "/placeholder.svg?height=300&width=400&text=ISKCON+Temple",
  },
  {
    id: 2,
    name: "Shri Siddhivinayak Temple",
    location: "Mumbai",
    image: "/placeholder.svg?height=300&width=400&text=Siddhivinayak+Temple",
  },
  {
    id: 3,
    name: "Meenakshi Amman Temple",
    location: "Madurai",
    image: "/placeholder.svg?height=300&width=400&text=Meenakshi+Temple",
  },
  {
    id: 4,
    name: "Kashi Vishwanath Temple",
    location: "Varanasi",
    image: "/placeholder.svg?height=300&width=400&text=Kashi+Vishwanath",
  },
  {
    id: 5,
    name: "Golden Temple",
    location: "Amritsar",
    image: "/placeholder.svg?height=300&width=400&text=Golden+Temple",
  },
  {
    id: 6,
    name: "Tirupati Balaji Temple",
    location: "Tirupati",
    image: "/placeholder.svg?height=300&width=400&text=Tirupati+Balaji",
  },
  {
    id: 7,
    name: "Jagannath Temple",
    location: "Puri",
    image: "/placeholder.svg?height=300&width=400&text=Jagannath+Temple",
  },
  {
    id: 8,
    name: "Somnath Temple",
    location: "Gujarat",
    image: "/placeholder.svg?height=300&width=400&text=Somnath+Temple",
  },
]

export function TempleImage({ id, className = "", width = 400, height = 300 }) {
  const temple = templeImages.find((t) => t.id === id) || templeImages[0]

  return (
    <Image
      src={temple.image || "/placeholder.svg"}
      alt={temple.name}
      width={width}
      height={height}
      className={className}
    />
  )
}
