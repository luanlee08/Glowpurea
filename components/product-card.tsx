import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart } from "lucide-react"

interface ProductCardProps {
  id: number
  name: string
  description: string
  price: string
  image: string
  ingredients: string
}

export default function ProductCard({ id, name, description, price, image, ingredients }: ProductCardProps) {
  return (
    <a href={`/product/${id}`} className="block">
      <Card className="hover:shadow-2xl transition-all duration-300 overflow-hidden border-0 bg-white group">
        <div className="aspect-square overflow-hidden bg-muted relative">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
          <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
            <Heart className="w-5 h-5" />
          </button>
        </div>
        <CardHeader>
          <CardTitle className="text-primary text-xl">{name}</CardTitle>
          <CardDescription className="text-foreground/70">{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-foreground/60 mb-2">Thành phần:</p>
            <p className="text-sm text-foreground/70">{ingredients}</p>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-2xl font-bold text-secondary">{price}</span>
            <Button className="bg-primary hover:bg-primary/90 text-white font-semibold">Thêm vào giỏ</Button>
          </div>
        </CardContent>
      </Card>
    </a>
  )
}
