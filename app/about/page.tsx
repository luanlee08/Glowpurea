import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Heart, Zap, Award } from "lucide-react"
export const dynamic = "force-dynamic"

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
      year: "2025",
      title: "Khởi đầu",
      description:
        "Glowpurea chính thức được thành lập bởi một nhóm bạn trẻ có chung niềm đam mê với thiên nhiên và lối sống lành mạnh. Dự án ra đời với mong muốn phát triển các dòng son dưỡng môi từ nguyên liệu thiên nhiên, an toàn, lành tính và phù hợp cho việc sử dụng hằng ngày.",
    },
    {
      year: "2026",
      title: "Hoàn thiện sản phẩm",
      description:
        "Nhóm tập trung nghiên cứu và thử nghiệm nhiều công thức khác nhau để hoàn thiện sản phẩm. Những thỏi son dưỡng đầu tiên của Glowpurea được ra mắt với thành phần thiên nhiên chọn lọc, kết cấu dịu nhẹ và thiết kế tối giản, thân thiện với người dùng.",
    },
    {
      year: "2027",
      title: "Mở rộng kênh bán",
      description:
        "Glowpurea bắt đầu phân phối sản phẩm thông qua các kênh bán hàng trực tuyến, từng bước tiếp cận khách hàng trên nhiều nền tảng và mở rộng độ nhận diện thương hiệu trên toàn quốc.",
    },
    {
      year: "Hiện tại",
      title: "Phát triển bền vững",
      description:
        "Glowpurea không ngừng cải tiến chất lượng sản phẩm, đa dạng hóa dòng son dưỡng và hướng đến xây dựng một thương hiệu mỹ phẩm thiên nhiên uy tín, gắn liền với giá trị bền vững và sự an tâm cho người sử dụng.",
    },
  ];

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
              Câu chuyện của{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Glowpurea
              </span>
            </h1>

            <p className="text-xl text-foreground/70 max-w-2xl mx-auto text-pretty">
              Chúng tôi tin rằng vẻ đẹp bền vững bắt đầu từ sự an toàn và tinh khiết.
              Glowpurea ra đời với mong muốn mang đến những sản phẩm chăm sóc môi
              được tạo nên từ nguyên liệu thiên nhiên, nhẹ nhàng cho làn da và an tâm cho sức khỏe.
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
                src="/son-duong-thien-nhien.png"
                alt="Quá trình làm son dưỡng thủ công"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <div>
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                  Câu chuyện của chúng tôi
                </span>
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Từ Đam Mê Đến Glowpurea
                </h2>
              </div>

              <p className="text-lg text-foreground/70 leading-relaxed">
                Glowpurea là một dự án được khởi xướng bởi một nhóm bạn trẻ có chung niềm yêu thích
                với thiên nhiên và lối sống lành mạnh. Chúng tôi tin rằng việc chăm sóc bản thân
                không nhất thiết phải phức tạp, mà nên bắt đầu từ những điều đơn giản, an toàn và
                gần gũi với tự nhiên.
              </p>

              <p className="text-lg text-foreground/70 leading-relaxed">
                Xuất phát từ mong muốn tạo ra một sản phẩm dưỡng môi có nguồn gốc thiên nhiên,
                nhóm đã cùng nhau nghiên cứu, thử nghiệm và hoàn thiện công thức son dưỡng đầu
                tiên của Glowpurea. Mỗi sản phẩm đều được chăm chút tỉ mỉ, cân bằng giữa hiệu quả
                dưỡng ẩm, cảm giác dễ chịu và sự an tâm cho người sử dụng.
              </p>
             
              <div className="flex gap-4 pt-4">
                <Button className="bg-primary hover:bg-primary/90">
                  Khám Phá Sản Phẩm
                </Button>
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
      {/* <section className="py-20 md:py-32 bg-accent/5">
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
      </section> */}

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
