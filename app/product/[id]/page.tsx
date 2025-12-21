"use client"

import { notFound } from "next/navigation"
import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Leaf, Shield, Award, CheckCircle2 } from "lucide-react"

// Product data
const products = [
  {
    id: 1,
    name: "Son Dưỡng Mật Ong",
    description: "Kết hợp mật ong nguyên chất và dầu dừa, mang lại độ ẩm tự nhiên",
    price: "45.000đ",
    image: "/honey-lip-balm-natural.jpg",
    ingredients: "Mật ong, dầu dừa, sáp ong",
    fullDescription:
      "Son dưỡng mật ong của chúng tôi là sự kết hợp hoàn hảo giữa mật ong nguyên chất và dầu dừa hữu cơ, mang lại độ ẩm sâu và nuôi dưỡng đôi môi mềm mại, căng mọng. Mật ong có tính kháng khuẩn tự nhiên, giúp bảo vệ và phục hồi làn môi khô nứt.",
    benefits: [
      "Dưỡng ẩm sâu suốt 8 giờ",
      "Giàu vitamin và khoáng chất từ mật ong",
      "Phục hồi môi khô nứt nhanh chóng",
      "Tạo lớp bảo vệ tự nhiên cho môi",
    ],
    howToUse:
      "Thoa đều lên môi khi cần thiết. Có thể sử dụng nhiều lần trong ngày, đặc biệt trước khi đi ngủ để dưỡng môi qua đêm.",
    weight: "5g",
    madeIn: "Việt Nam",
  },
  {
    id: 2,
    name: "Son Dưỡng Dâu Tây",
    description: "Chiết xuất dâu tây tự nhiên, màu hồng nhạt, mùi thơm dễ chịu",
    price: "50.000đ",
    image: "/strawberry-lip-balm-natural.jpg",
    ingredients: "Dâu tây, dầu jojoba, sáp ong",
    fullDescription:
      "Son dưỡng dâu tây với chiết xuất dâu tây tươi tự nhiên, mang đến một chút màu hồng tự nhiên cho đôi môi cùng hương thơm dễ chịu. Dầu jojoba giúp làm mềm và nuôi dưỡng môi, giữ ẩm lâu dài.",
    benefits: [
      "Màu hồng tự nhiên cho đôi môi",
      "Hương dâu tây tươi mát",
      "Giàu vitamin C làm sáng môi",
      "Kết cấu mềm mịn, không bết dính",
    ],
    howToUse:
      "Thoa nhẹ lên môi khi cần độ ẩm hoặc muốn thêm một chút màu sắc tự nhiên. Có thể dùng làm lớp nền trước khi trang điểm.",
    weight: "5g",
    madeIn: "Việt Nam",
  },
  {
    id: 3,
    name: "Son Dưỡng Chanh Tươi",
    description: "Vitamin C từ chanh tươi, giúp làm sáng và mềm mại môi",
    price: "48.000đ",
    image: "/lemon-lip-balm-natural.jpg",
    ingredients: "Chanh, dầu hạnh nhân, sáp ong",
    fullDescription:
      "Son dưỡng chanh tươi với hàm lượng vitamin C cao từ chanh tự nhiên, giúp làm sáng môi và chống oxy hóa. Dầu hạnh nhân ngọt ngào nuôi dưỡng và làm mềm môi hiệu quả.",
    benefits: [
      "Làm sáng môi tự nhiên với vitamin C",
      "Chống oxy hóa, chống lão hóa",
      "Hương chanh tươi mát, sảng khoái",
      "Dưỡng ẩm nhẹ nhàng, không gây nhờn",
    ],
    howToUse: "Thoa đều lên môi 2-3 lần mỗi ngày. Sử dụng thường xuyên để có hiệu quả làm sáng môi tốt nhất.",
    weight: "5g",
    madeIn: "Việt Nam",
  },
  {
    id: 4,
    name: "Son Dưỡng Bạc Hà",
    description: "Mát lạnh từ bạc hà tự nhiên, cảm giác tươi mới suốt ngày",
    price: "48.000đ",
    image: "/mint-lip-balm-natural.jpg",
    ingredients: "Bạc hà, dầu dừa, sáp ong",
    fullDescription:
      "Son dưỡng bạc hà mang đến cảm giác mát lạnh, tươi mới ngay lập tức. Tinh dầu bạc hà tự nhiên có tác dụng làm dịu và tạo cảm giác sảng khoái cho môi, đặc biệt phù hợp cho mùa hè.",
    benefits: [
      "Cảm giác mát lạnh tức thì",
      "Làm dịu môi bị kích ứng",
      "Hương bạc hà tươi mát",
      "Tăng lưu thông máu ở môi",
    ],
    howToUse:
      "Thoa lên môi khi cần cảm giác mát mẻ và sảng khoái. Lý tưởng sử dụng sau bữa ăn hoặc khi ra ngoài trời nắng.",
    weight: "5g",
    madeIn: "Việt Nam",
  },
  {
    id: 5,
    name: "Son Dưỡng Hoa Hồng",
    description: "Hương hoa hồng nhẹ nhàng, dưỡng ẩm sâu cho môi mềm mại",
    price: "52.000đ",
    image: "/rose-lip-balm-natural.jpg",
    ingredients: "Hoa hồng, dầu jojoba, sáp ong",
    fullDescription:
      "Son dưỡng hoa hồng với chiết xuất cánh hoa hồng tươi, mang đến hương thơm nhẹ nhàng và khả năng dưỡng ẩm sâu. Dầu jojoba giúp phục hồi và tái tạo làn môi khô nứt, mang lại sự mềm mại tự nhiên.",
    benefits: [
      "Hương hoa hồng thanh lịch, quyến rũ",
      "Dưỡng ẩm sâu và lâu dài",
      "Phục hồi môi nứt nẻ hiệu quả",
      "Chống lão hóa với chất chống oxy hóa",
    ],
    howToUse: "Thoa lên môi vào buổi sáng và tối. Đặc biệt hiệu quả khi sử dụng trước khi đi ngủ để dưỡng môi qua đêm.",
    weight: "5g",
    madeIn: "Việt Nam",
  },
  {
    id: 6,
    name: "Son Dưỡng Cacao",
    description: "Hương cacao thơm ngon, kết hợp với dầu cacao nguyên chất",
    price: "50.000đ",
    image: "/cacao-lip-balm-natural.jpg",
    ingredients: "Cacao, dầu dừa, sáp ong",
    fullDescription:
      "Son dưỡng cacao với bơ cacao nguyên chất, giàu chất chống oxy hóa và vitamin E, giúp nuôi dưỡng và bảo vệ môi khỏi tác động môi trường. Hương cacao thơm ngon tự nhiên mang lại trải nghiệm dưỡng môi thú vị.",
    benefits: [
      "Giàu chất chống oxy hóa và vitamin E",
      "Hương cacao thơm ngon tự nhiên",
      "Bảo vệ môi khỏi tia UV nhẹ",
      "Kết cấu mịn màng, thẩm thấu nhanh",
    ],
    howToUse: "Thoa lên môi bất cứ khi nào cần dưỡng ẩm. Có thể sử dụng trước khi ra ngoài để bảo vệ môi.",
    weight: "5g",
    madeIn: "Việt Nam",
  },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === Number.parseInt(params.id))
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  if (!product) {
    notFound()
  }

  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
    product.image,
    product.image,
    product.image,
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Product Detail Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-foreground/60 mb-8">
            <a href="/" className="hover:text-primary transition-colors">
              Trang chủ
            </a>
            <span>/</span>
            <a href="/#products" className="hover:text-primary transition-colors">
              Sản phẩm
            </a>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          {/* Product Main Info */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            {/* Thumbnail Gallery - 6 images in horizontal row below */}
            <div className="flex flex-col gap-4">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white">
                <div className="relative aspect-square">
                  <img
                    src={productImages[selectedImageIndex] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Image counter */}
                  <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                    {selectedImageIndex + 1}/{productImages.length}
                  </div>
                </div>
              </div>

              {/* Thumbnail Gallery - 6 images in horizontal row */}
              <div className="grid grid-cols-6 gap-2">
                {productImages.slice(1).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index + 1)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all bg-white ${
                      selectedImageIndex === index + 1
                        ? "border-secondary ring-2 ring-secondary/20"
                        : "border-border hover:border-secondary/50"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                  100% Tự Nhiên
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{product.name}</h1>
                <p className="text-xl text-foreground/70 leading-relaxed">{product.fullDescription}</p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 py-4 border-y border-border">
                <span className="text-4xl font-bold text-secondary">{product.price}</span>
                <span className="text-sm text-foreground/60">/ {product.weight}</span>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button className="px-4 py-3 hover:bg-muted transition-colors">-</button>
                  <span className="px-6 py-3 border-x border-border">1</span>
                  <button className="px-4 py-3 hover:bg-muted transition-colors">+</button>
                </div>
                <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Thêm vào giỏ hàng
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              {/* Product Info */}
              <div className="space-y-4 pt-6">
                <div className="flex items-center gap-3">
                  <Leaf className="w-5 h-5 text-primary" />
                  <span className="text-foreground/80">
                    <strong>Thành phần:</strong> {product.ingredients}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-foreground/80">
                    <strong>Trọng lượng:</strong> {product.weight}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="text-foreground/80">
                    <strong>Xuất xứ:</strong> {product.madeIn}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Features Tabs */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Benefits */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-primary mb-6">Lợi Ích</h2>
              <ul className="space-y-4">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How to Use */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-primary mb-6">Cách Sử Dụng</h2>
              <p className="text-foreground/80 leading-relaxed">{product.howToUse}</p>

              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="font-semibold text-foreground mb-4">Cam Kết Của Chúng Tôi</h3>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>✓ 100% nguyên liệu tự nhiên</li>
                  <li>✓ Không chứa paraben, sulfate</li>
                  <li>✓ Không thử nghiệm trên động vật</li>
                  <li>✓ Làm thủ công tại Việt Nam</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Sản Phẩm Liên Quan</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {products
                .filter((p) => p.id !== product.id)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <a
                    key={relatedProduct.id}
                    href={`/product/${relatedProduct.id}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg text-primary mb-2">{relatedProduct.name}</h3>
                      <p className="text-sm text-foreground/70 mb-4">{relatedProduct.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-secondary">{relatedProduct.price}</span>
                        <span className="text-primary text-sm font-semibold group-hover:underline">Xem chi tiết →</span>
                      </div>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
