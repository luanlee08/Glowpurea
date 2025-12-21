import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Heart, Zap, Award } from "lucide-react"

export default function About() {
  const values = [
    {
      icon: Leaf,
      title: "100% Tự Nhiên",
      description: "Tất cả sản phẩm được làm từ nguyên liệu tự nhiên, không chứa hóa chất độc hại hay paraben",
    },
    {
      icon: Heart,
      title: "Chăm Sóc Tình Yêu",
      description: "Mỗi sản phẩm được làm thủ công với tình yêu và sự chăm sóc từ đội ngũ của chúng tôi",
    },
    {
      icon: Zap,
      title: "Hiệu Quả Cao",
      description: "Công thức được phát triển để mang lại kết quả tốt nhất cho sức khỏe và vẻ đẹp của bạn",
    },
    {
      icon: Award,
      title: "Chất Lượng Đảm Bảo",
      description: "Tất cả sản phẩm đều được kiểm tra chất lượng kỹ lưỡng trước khi gửi đến khách hàng",
    },
  ]

  const team = [
    {
      name: "Nguyễn Thị Hương",
      role: "Sáng lập viên & CEO",
      image: "/woman-founder.jpg",
    },
    {
      name: "Trần Văn Minh",
      role: "Trưởng phòng Sản xuất",
      image: "/man-production.jpg",
    },
    {
      name: "Phạm Thị Linh",
      role: "Chuyên gia Công thức",
      image: "/woman-expert.jpg",
    },
    {
      name: "Lê Văn Hùng",
      role: "Quản lý Kinh doanh",
      image: "/man-business.jpg",
    },
  ]

  const timeline = [
    {
      year: "2020",
      title: "Khởi đầu",
      description: "Natural Lip Balm được thành lập với mục tiêu tạo ra những sản phẩm chăm sóc môi tự nhiên",
    },
    {
      year: "2021",
      title: "Phát triển",
      description: "Phát triển 6 loại son dưỡng khác nhau với các hương vị tự nhiên độc đáo",
    },
    {
      year: "2022",
      title: "Mở rộng",
      description: "Mở rộng thị trường, bắt đầu bán online và tại các cửa hàng bán lẻ",
    },
    {
      year: "2024",
      title: "Hiện tại",
      description: "Phục vụ hơn 500 khách hàng hài lòng và tiếp tục phát triển các sản phẩm mới",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 py-20 md:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
              Về{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Natural Lip Balm
              </span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto text-pretty">
              Chúng tôi tin rằng chăm sóc da phải bắt đầu từ những nguyên liệu tự nhiên và an toàn. Hành trình của chúng
              tôi bắt đầu từ một đam mê đơn giản: tạo ra những sản phẩm tốt cho sức khỏe của bạn.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/handmade-natural-lip-balm-making.jpg"
                alt="Quá trình làm son dưỡng thủ công"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <div>
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                  Câu chuyện của chúng tôi
                </span>
                <h2 className="text-4xl font-bold text-foreground mb-4">Từ Đam Mê Đến Sản Phẩm</h2>
              </div>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Natural Lip Balm được thành lập bởi Nguyễn Thị Hương, một người yêu thích thiên nhiên và chăm sóc sức
                khỏe. Cô ấy nhận thấy rằng hầu hết các sản phẩm chăm sóc môi trên thị trường đều chứa hóa chất độc hại
                và quyết định tạo ra một giải pháp tự nhiên.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Sau nhiều tháng nghiên cứu và thử nghiệm, chúng tôi đã phát triển công thức độc đáo kết hợp các nguyên
                liệu tự nhiên tốt nhất. Mỗi sản phẩm được làm thủ công với sự chăm sóc và tình yêu, đảm bảo chất lượng
                cao nhất.
              </p>
              <div className="flex gap-4 pt-4">
                <Button className="bg-primary hover:bg-primary/90">Mua Ngay</Button>
                <Button variant="outline" className="bg-transparent">
                  Liên Hệ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 md:py-32 bg-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              Giá trị cốt lõi
            </span>
            <h2 className="text-4xl font-bold text-foreground mb-6">Những Giá Trị Của Chúng Tôi</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Những nguyên tắc này hướng dẫn mọi quyết định và hành động của chúng tôi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                    <p className="text-foreground/70">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              Hành trình
            </span>
            <h2 className="text-4xl font-bold text-foreground mb-6">Lịch Sử Phát Triển</h2>
          </div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-6 md:gap-12">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {item.year.slice(-2)}
                  </div>
                  {index !== timeline.length - 1 && <div className="w-1 h-24 bg-primary/20 mt-4"></div>}
                </div>
                <div className="pb-8">
                  <p className="text-sm font-semibold text-primary mb-2">{item.year}</p>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-foreground/70">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-32 bg-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              Đội ngũ
            </span>
            <h2 className="text-4xl font-bold text-foreground mb-6">Gặp Gỡ Đội Ngũ Của Chúng Tôi</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Những người tài năng và đam mê đứng sau Natural Lip Balm
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-sm text-primary font-semibold">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Hãy Tham Gia Cộng Đồng Của Chúng Tôi</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-8">
            Khám phá những sản phẩm tự nhiên tốt cho sức khỏe của bạn và trở thành một phần của hành trình chăm sóc tự
            nhiên
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Mua Sản Phẩm
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent">
              Liên Hệ Chúng Tôi
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-primary mb-4">Natural Lip Balm</h3>
              <p className="text-sm text-foreground/70">Son dưỡng tự làm từ nguyên liệu thiên nhiên 100% organic</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Sản Phẩm</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Tất cả sản phẩm
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Bộ sưu tập mới
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Khuyến mãi
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Công Ty</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>
                  <a href="/about" className="hover:text-primary transition-colors">
                    Về chúng tôi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Liên hệ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Hỗ Trợ</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Câu hỏi thường gặp
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Chính sách bảo mật
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Điều khoản sử dụng
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-foreground/70">
            <p>&copy; 2025 Natural Lip Balm. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
