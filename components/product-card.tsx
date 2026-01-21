import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { addToCart } from "@/services/cart.service"
import { toast } from "react-hot-toast"

/* ================= TYPES ================= */

interface ProductCardProps {
  id: number
  name: string
  description?: string
  price: string
  image?: string
  ingredients?: string
}

/* ================= UTILS ================= */

// ❗ Loại bỏ HTML tag để tránh tràn layout
function stripHtml(html?: string) {
  if (!html) return ""
  return html.replace(/<[^>]+>/g, "")
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

  const imageUrl =
    image && image.startsWith("http")
      ? image
      : image
        ? `${API_BASE}${image}`
        : "/placeholder.svg"

  return (
    <Link href={`/product/${id}`} className="block h-full">
      <Card
        className="
          group bg-white
          border border-border
          rounded-2xl
          p-3
          h-full
          transition-all
          hover:shadow-lg
        "
      >
        {/* IMAGE */}
        <div
          className="
            relative aspect-[4/3]
            rounded-xl
            overflow-hidden
            bg-muted
          "
        >
          <img
            src={imageUrl}
            alt={name}
            onError={(e) => {
              ; (e.currentTarget as HTMLImageElement).src =
                "/placeholder.svg"
            }}
            className="
              h-full w-full
              object-cover
              transition-transform duration-300
              group-hover:scale-[1.03]
            "
          />
        </div>

        {/* HEADER */}
        <CardHeader className="px-1 pt-4 pb-2">
          <CardTitle className="text-base font-semibold text-primary line-clamp-2">
            {name}
          </CardTitle>

          {description && (
            <p className="text-sm text-foreground/70 line-clamp-3">
              {stripHtml(description)}
            </p>
          )}
        </CardHeader>

        {/* CONTENT */}
        <CardContent className="px-1 pt-0 space-y-3">
          {ingredients && (
            <p className="text-xs text-foreground/60 line-clamp-2">
              <span className="font-medium">Thành phần:</span>{" "}
              {ingredients}
            </p>
          )}

          <div className="flex items-center justify-between border-t pt-3">
            <span className="text-lg font-bold text-secondary">
              {price}
            </span>

            <Button
              size="sm"
              className="bg-primary px-4 text-white hover:bg-primary/90"
              onClick={async (e) => {
                e.preventDefault()
                e.stopPropagation()

                try {
                  await addToCart(id, 1)
                  toast.success("Đã thêm vào giỏ hàng")
                } catch (err: any) {
                  toast.error("Vui lòng đăng nhập")
                }
              }}
            >
              Thêm vào giỏ
            </Button>

          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
