import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Heart } from "lucide-react"

/* ================= TYPES ================= */

interface ProductCardProps {
  id: number
  name: string
  description?: string
  price: string
  image?: string
  ingredients?: string
}

/* ================= COMPONENT ================= */

export default function ProductCard({
  id,
  name,
  description,
  price,
  image,
  ingredients,
}: ProductCardProps) {
  const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://localhost:63731"

  // ✅ Resolve image URL an toàn
  const imageUrl =
    image && image.startsWith("http")
      ? image
      : image
        ? `${API_BASE}${image}`
        : "/placeholder.svg"

  return (
    <a href={`/product/${id}`} className="block">
      <Card className="group overflow-hidden border-0 bg-white transition-all duration-300 hover:shadow-2xl">
        {/* IMAGE */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={name}
            onError={(e) => {
              ; (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"
            }}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />

          {/* Wishlist */}
          <button
            type="button"
            className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white shadow-lg opacity-0 transition-all hover:bg-primary hover:text-white group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Heart className="h-5 w-5" />
          </button>
        </div>

        {/* HEADER */}
        <CardHeader>
          <CardTitle className="text-xl text-primary">{name}</CardTitle>
          {description && (
            <CardDescription className="text-foreground/70">
              {description}
            </CardDescription>
          )}
        </CardHeader>

        {/* CONTENT */}
        <CardContent className="space-y-4">
          {ingredients && (
            <div>
              <p className="mb-2 text-sm font-semibold text-foreground/60">
                Thành phần:
              </p>
              <p className="text-sm text-foreground/70">{ingredients}</p>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-border pt-4">
            <span className="text-2xl font-bold text-secondary">
              {price}
            </span>
            <Button className="bg-primary font-semibold text-white hover:bg-primary/90">
              Thêm vào giỏ
            </Button>
          </div>
        </CardContent>
      </Card>
    </a>
  )
}
