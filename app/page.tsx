"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import FeatureSection from "@/components/feature-section";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    console.log("API URL =", process.env.NEXT_PUBLIC_API_URL);
  }, []);

  const products = [
    {
      id: 1,
      name: "Son Dưỡng Mật Ong",
      description: "Kết hợp mật ong nguyên chất và dầu dừa, mang lại độ ẩm tự nhiên",
      price: "45.000đ",
      image: "/honey-lip-balm-natural.jpg",
      ingredients: "Mật ong, dầu dừa, sáp ong",
    },
    {
      id: 2,
      name: "Son Dưỡng Dâu Tây",
      description: "Chiết xuất dâu tây tự nhiên, màu hồng nhạt, mùi thơm dễ chịu",
      price: "50.000đ",
      image: "/strawberry-lip-balm-natural.jpg",
      ingredients: "Dâu tây, dầu jojoba, sáp ong",
    },
    {
      id: 3,
      name: "Son Dưỡng Chanh Tươi",
      description: "Vitamin C từ chanh tươi, giúp làm sáng và mềm mại môi",
      price: "48.000đ",
      image: "/lemon-lip-balm-natural.jpg",
      ingredients: "Chanh, dầu hạnh nhân, sáp ong",
    },
    {
      id: 4,
      name: "Son Dưỡng Bạc Hà",
      description: "Mát lạnh từ bạc hà tự nhiên, cảm giác tươi mới suốt ngày",
      price: "48.000đ",
      image: "/mint-lip-balm-natural.jpg",
      ingredients: "Bạc hà, dầu dừa, sáp ong",
    },
    {
      id: 5,
      name: "Son Dưỡng Hoa Hồng",
      description: "Hương hoa hồng nhẹ nhàng, dưỡng ẩm sâu cho môi mềm mại",
      price: "52.000đ",
      image: "/rose-lip-balm-natural.jpg",
      ingredients: "Hoa hồng, dầu jojoba, sáp ong",
    },
    {
      id: 6,
      name: "Son Dưỡng Cacao",
      description: "Hương cacao thơm ngon, kết hợp với dầu cacao nguyên chất",
      price: "50.000đ",
      image: "/cacao-lip-balm-natural.jpg",
      ingredients: "Cacao, dầu dừa, sáp ong",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />
      console.log(process.env.NEXT_PUBLIC_API_URL);

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 py-20 md:py-32 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                  ✨ 100% Tự Nhiên & Hữu Cơ
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">
                Son Dưỡng{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Tự Làm</span>{" "}
                Từ Thiên Nhiên
              </h2>
              <p className="text-xl text-foreground/70 text-pretty leading-relaxed">
                Chúng tôi tạo ra những sản phẩm chăm sóc môi 100% tự nhiên, không chứa hóa chất độc hại. Mỗi sản phẩm
                được làm thủ công với tình yêu và sự chăm sóc.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold">
                  Mua Ngay
                </Button>
                <Button size="lg" variant="outline" className="font-semibold bg-transparent">
                  Tìm Hiểu Thêm
                </Button>
              </div>
              <div className="flex gap-8 pt-8">
                <div>
                  <p className="text-2xl font-bold text-primary">500+</p>
                  <p className="text-sm text-foreground/60">Khách hàng hài lòng</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">6</p>
                  <p className="text-sm text-foreground/60">Loại sản phẩm</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">100%</p>
                  <p className="text-sm text-foreground/60">Nguyên liệu tự nhiên</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl"></div>
                <img
                  src="/natural-lip-balm-products-collection.jpg"
                  alt="Bộ sưu tập son dưỡng tự nhiên"
                  className="relative rounded-3xl shadow-2xl w-full max-w-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeatureSection />

      {/* Products Section */}
      <section id="products" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              Bộ Sưu Tập
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Khám Phá Các Loại Son Dưỡng Tự Nhiên
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Mỗi sản phẩm được chế tác thủ công với những nguyên liệu tốt nhất từ thiên nhiên, không chứa hóa chất độc
              hại
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold">
              Xem Tất Cả Sản Phẩm
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-accent/10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/handmade-natural-lip-balm-making.jpg"
                alt="Quá trình làm son dưỡng thủ công"
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Về Glowpurea
              </h2>
              <p className="text-lg text-foreground/80 mb-4">
                Glowpurea là một dự án được xây dựng bởi một nhóm bạn trẻ có chung niềm yêu thích
                với thiên nhiên và lối sống lành mạnh. Chúng tôi mong muốn tạo ra những sản phẩm
                chăm sóc môi an toàn, lành tính và dễ sử dụng trong cuộc sống hằng ngày.
              </p>

              <p className="text-lg text-foreground/80 mb-6">
                Mỗi sản phẩm của Glowpurea được phát triển từ các nguyên liệu thiên nhiên được chọn lọc,
                không chứa thành phần gây hại và hướng đến sự cân bằng giữa hiệu quả sử dụng, cảm giác
                dễ chịu và trách nhiệm với môi trường.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm">
                    ✓
                  </div>
                  <span className="text-foreground">100% Nguyên liệu tự nhiên</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm">
                    ✓
                  </div>
                  <span className="text-foreground">Làm thủ công tại Việt Nam</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm">
                    ✓
                  </div>
                  <span className="text-foreground">Không thử nghiệm trên động vật</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm">
                    ✓
                  </div>
                  <span className="text-foreground">Bao bì thân thiện với môi trường</span>
                </div>
              </div>
              <Button className="mt-6 bg-primary hover:bg-primary/90">Tìm Hiểu Thêm</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/10 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Liên Hệ Với Chúng Tôi</h2>
            <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
              Có câu hỏi về sản phẩm? Muốn đặt hàng số lượng lớn? Hãy liên hệ với chúng tôi ngay hôm nay!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Gửi Email
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent">
                Gọi Điện Thoại
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
