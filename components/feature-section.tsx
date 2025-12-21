import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Sparkles, Truck, Shield } from "lucide-react"

export default function FeatureSection() {
  const features = [
    {
      icon: Leaf,
      title: "100% Tự Nhiên",
      description: "Không chứa hóa chất độc hại",
    },
    {
      icon: Sparkles,
      title: "Làm Thủ Công",
      description: "Chế tác với tình yêu và chăm sóc",
    },
    {
      icon: Truck,
      title: "Giao Hàng Nhanh",
      description: "Miễn phí cho đơn hàng trên 200k",
    },
    {
      icon: Shield,
      title: "Đảm Bảo Chất Lượng",
      description: "Kiểm tra kỹ lưỡng trước gửi",
    },
  ]

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-foreground/60">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
