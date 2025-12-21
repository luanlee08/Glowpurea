import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      date: "18 Tháng 12, 2025",
      readTime: "5 phút đọc",
      title: "Ra Mắt Bộ Sưu Tập Mùa Đông - Son Dưỡng Ấm Áp",
      category: "Sự Kiện",
      excerpt:
        "Khám phá bộ sưu tập mới với hương thơm ấm áp của quế, gừng và vani. Hoàn hảo cho mùa đông lạnh giá, mang đến độ ẩm sâu và cảm giác êm dịu cho đôi môi.",
      image: "/cacao-lip-balm-natural.jpg",
      featured: true,
    },
    {
      id: 2,
      date: "5 Tháng 12, 2025",
      readTime: "8 phút đọc",
      title: "Workshop Làm Son Dưỡng Tự Nhiên Tại Hà Nội",
      category: "Workshop",
      excerpt:
        "Tham gia cùng chúng tôi trong buổi workshop đặc biệt để học cách tự làm son dưỡng từ nguyên liệu thiên nhiên. Mỗi người tham gia sẽ mang về 3 sản phẩm tự làm.",
      image: "/handmade-natural-lip-balm-making.jpg",
      featured: false,
    },
    {
      id: 3,
      date: "20 Tháng 11, 2025",
      readTime: "4 phút đọc",
      title: "Chúng Tôi Đạt 1000 Khách Hàng Hạnh Phúc",
      category: "Tin Tức",
      excerpt:
        "Một cột mốc đáng nhớ! Cảm ơn tất cả khách hàng đã tin tưởng sản phẩm tự nhiên của chúng tôi. Để tri ân, chúng tôi có chương trình ưu đãi đặc biệt.",
      image: "/natural-lip-balm-products-collection.jpg",
      featured: false,
    },
    {
      id: 4,
      date: "8 Tháng 11, 2025",
      readTime: "6 phút đọc",
      title: "Câu Chuyện Về Son Dưỡng Hoa Hồng",
      category: "Sản Phẩm",
      excerpt:
        "Hành trình tìm kiếm những cánh hoa hồng Đà Lạt tươi nhất để chiết xuất tinh dầu cho dòng son dưỡng cao cấp của chúng tôi.",
      image: "/rose-lip-balm-natural.jpg",
      featured: false,
    },
    {
      id: 5,
      date: "25 Tháng 10, 2025",
      readTime: "7 phút đọc",
      title: "Bí Quyết Chăm Sóc Môi Vào Mùa Hanh Khô",
      category: "Hướng Dẫn",
      excerpt:
        "5 tips đơn giản giúp đôi môi bạn luôn mềm mại và căng mọng ngay cả trong thời tiết khô hanh nhất. Sử dụng son dưỡng tự nhiên đúng cách.",
      image: "/honey-lip-balm-natural.jpg",
      featured: false,
    },
    {
      id: 6,
      date: "10 Tháng 10, 2025",
      readTime: "5 phút đọc",
      title: "Ra Mắt Son Dưỡng Bạc Hà Mát Lạnh",
      category: "Sự Kiện",
      excerpt:
        "Sản phẩm mới nhất trong bộ sưu tập: Son dưỡng bạc hà với tinh dầu bạc hà tự nhiên, mang lại cảm giác mát lạnh và tươi mới tức thì.",
      image: "/mint-lip-balm-natural.jpg",
      featured: false,
    },
  ]

  const categories = ["Tất Cả", "Sự Kiện", "Workshop", "Tin Tức", "Sản Phẩm", "Hướng Dẫn"]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/natural-lip-balm-products-collection.jpg"
            alt="Natural lip balm collection background"
            className="w-full h-full object-cover opacity-[0.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-8 backdrop-blur-sm bg-background/30 px-4 py-2 rounded-full border border-primary/20">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium tracking-widest uppercase text-primary">Blog & Sự Kiện</span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8 text-balance leading-[0.95] tracking-tight">
              Câu Chuyện
              <br />
              <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Tự Nhiên
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground text-pretty leading-relaxed max-w-2xl backdrop-blur-sm bg-background/50 p-6 rounded-2xl border border-border/50">
              Khám phá hành trình làm đẹp từ thiên nhiên, chia sẻ kiến thức và những câu chuyện truyền cảm hứng từ cộng
              đồng yêu sản phẩm organic.
            </p>

            <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl">
              <div className="backdrop-blur-sm bg-background/60 p-6 rounded-2xl border border-border/50 hover:border-primary/30 transition-colors">
                <div className="text-3xl font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Bài Viết</div>
              </div>
              <div className="backdrop-blur-sm bg-background/60 p-6 rounded-2xl border border-border/50 hover:border-primary/30 transition-colors">
                <div className="text-3xl font-bold text-primary mb-1">12+</div>
                <div className="text-sm text-muted-foreground">Workshop</div>
              </div>
              <div className="backdrop-blur-sm bg-background/60 p-6 rounded-2xl border border-border/50 hover:border-primary/30 transition-colors">
                <div className="text-3xl font-bold text-primary mb-1">1K+</div>
                <div className="text-sm text-muted-foreground">Độc Giả</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-6 py-2.5 rounded-full text-sm font-medium tracking-wide whitespace-nowrap transition-all ${
                  index === 0
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : "bg-transparent hover:bg-muted text-foreground/70 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {blogPosts.filter((post) => post.featured).length > 0 && (
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {blogPosts
              .filter((post) => post.featured)
              .map((post) => (
                <article key={post.id} className="group cursor-pointer">
                  <Link href={`/blog/${post.id}`}>
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                      <div className="relative aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden bg-muted">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      <div className="space-y-8">
                        <Badge className="mb-6 text-xs font-medium tracking-wider uppercase px-4 py-1.5 bg-primary/10 text-primary border-0 hover:bg-primary/20">
                          {post.category}
                        </Badge>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight tracking-tight group-hover:text-primary transition-colors duration-300">
                          {post.title}
                        </h2>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <time>{post.date}</time>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      <Button
                        size="lg"
                        className="group/btn bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-6 text-base"
                      >
                        Đọc Bài Viết
                        <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </Link>
                </article>
              ))}
          </div>
        </section>
      )}

      <section className="py-20 md:py-28 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">Bài Viết Mới Nhất</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {blogPosts
              .filter((post) => !post.featured)
              .map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <article className="group cursor-pointer flex flex-col h-full bg-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="relative aspect-[3/2] overflow-hidden bg-muted">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    <div className="flex flex-col flex-1 p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge className="text-xs font-medium tracking-wider uppercase px-3 py-1 bg-primary/10 text-primary border-0">
                          {post.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{post.readTime}</span>
                      </div>

                      <h3 className="text-2xl font-bold text-foreground mb-4 text-balance leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-muted-foreground text-pretty leading-relaxed mb-6 flex-1">{post.excerpt}</p>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <time className="text-sm text-muted-foreground">{post.date}</time>
                        <div className="flex items-center gap-2 text-foreground font-medium group-hover:text-primary transition-colors">
                          <span className="text-sm">Đọc thêm</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
          </div>

          <div className="text-center mt-16">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-10 py-6 text-base border-2 hover:bg-foreground hover:text-background transition-all bg-transparent"
            >
              Xem Thêm Bài Viết
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 p-12 md:p-16 lg:p-20">
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-8 h-[2px] bg-primary" />
                <span className="text-sm font-medium tracking-widest uppercase text-primary">Newsletter</span>
                <div className="w-8 h-[2px] bg-primary" />
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance tracking-tight">
                Đừng Bỏ Lỡ Điều Gì
              </h2>

              <p className="text-lg md:text-xl text-muted-foreground mb-10 text-pretty leading-relaxed max-w-2xl mx-auto">
                Đăng ký để nhận tin tức mới nhất về sản phẩm, sự kiện workshop và ưu đãi đặc biệt dành riêng cho bạn
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Nhập địa chỉ email của bạn"
                  className="flex-1 px-6 py-4 rounded-full border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <Button
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-10 py-4 whitespace-nowrap"
                >
                  Đăng Ký Ngay
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mt-6">
                Chúng tôi tôn trọng quyền riêng tư của bạn. Không spam, hủy đăng ký bất cứ lúc nào.
              </p>
            </div>

            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
