"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, LinkIcon, Heart, Bookmark } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function BlogDetailPage() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrolled = window.scrollY
      const progress = (scrolled / documentHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const post = {
    id: 1,
    slug: "ra-mat-bo-suu-tap-mua-dong",
    date: "18 Tháng 12, 2025",
    readTime: "5 phút đọc",
    title: "Ra Mắt Bộ Sưu Tập Mùa Đông - Son Dưỡng Ấm Áp",
    category: "Sự Kiện",
    author: "Nguyễn Minh Anh",
    authorRole: "Founder & Creator",
    authorImage: "/placeholder.svg?height=80&width=80",
    excerpt:
      "Khám phá bộ sưu tập mới với hương thơm ấm áp của quế, gừng và vani. Hoàn hảo cho mùa đông lạnh giá, mang đến độ ẩm sâu và cảm giác êm dịu cho đôi môi.",
    image: "/cacao-lip-balm-natural.jpg",
    galleryImages: [
      {
        src: "/honey-lip-balm-natural.jpg",
        caption: "Son dưỡng quế ấm áp với thiết kế bao bì mùa đông",
      },
      {
        src: "/mint-lip-balm-natural.jpg",
        caption: "Nguyên liệu tự nhiên 100% được lựa chọn kỹ càng",
      },
      {
        src: "/rose-lip-balm-natural.jpg",
        caption: "Quy trình sản xuất thủ công tỉ mỉ",
      },
    ],
    contentImages: {
      midArticle: "/natural-lip-balm-products-collection.jpg",
      ingredients: "/handmade-natural-lip-balm-making.jpg",
    },
    content: `
      <p>Mùa đông đã về, và cùng với đó là thời điểm hoàn hảo để chúng tôi giới thiệu bộ sưu tập son dưỡng mùa đông đặc biệt của mình. Sau nhiều tháng nghiên cứu và phát triển, chúng tôi tự hào mang đến cho bạn ba sản phẩm độc đáo với hương thơm ấm áp, được lấy cảm hứng từ những nguyên liệu thiên nhiên quý giá.</p>

      <h2>Nguồn Cảm Hứng</h2>
      <p>Bộ sưu tập này được lấy cảm hứng từ những buổi sáng mùa đông ấm áp bên tách trà nóng, khi không khí lạnh bên ngoài tương phản với sự ấm cúng trong nhà. Chúng tôi muốn đóng gói cảm giác đó vào những thỏi son dưỡng, mang lại sự chăm sóc và thoải mái cho đôi môi của bạn.</p>

      <h2>Ba Hương Thơm Đặc Biệt</h2>
      
      <h3>1. Son Dưỡng Quế Ấm Áp</h3>
      <p>Với tinh dầu quế Ceylon cao cấp, sản phẩm này không chỉ mang lại hương thơm ấm áp mà còn có tác dụng kích thích tuần hoàn máu, giúp đôi môi hồng hào tự nhiên. Quế được biết đến với đặc tính kháng khuẩn và chống viêm, giúp bảo vệ đôi môi khỏi các tác động của môi trường lạnh giá.</p>

      <h3>2. Son Dưỡng Gừng Tươi Mát</h3>
      <p>Chiết xuất từ gừng tươi organic, sản phẩm này mang lại cảm giác ấm áp dễ chịu và giúp nuôi dưỡng đôi môi từ sâu bên trong. Gừng giàu chất chống oxi hóa, giúp chống lão hóa và tái tạo tế bào da môi hiệu quả.</p>

      <h3>3. Son Dưỡng Vani Ngọt Ngào</h3>
      <p>Với tinh chất vani Madagascar nguyên chất, đây là sản phẩm hoàn hảo cho những ai yêu thích hương thơm ngọt ngào, nhẹ nhàng. Vani không chỉ có mùi hương dễ chịu mà còn chứa nhiều dưỡng chất giúp làm mềm và bảo vệ đôi môi.</p>

      <h2>Thành Phần Tự Nhiên 100%</h2>
      <p>Như mọi khi, chúng tôi cam kết sử dụng 100% nguyên liệu tự nhiên, không có chất bảo quản tổng hợp, không paraben, và không thử nghiệm trên động vật. Mỗi thỏi son được làm thủ công với tình yêu và sự tận tâm.</p>

      <p><strong>Thành phần chính:</strong></p>
      <ul>
        <li>Sáp ong organic từ các trang trại địa phương</li>
        <li>Dầu dừa virgin nguyên chất</li>
        <li>Bơ hạt mỡ (Shea butter) từ châu Phi</li>
        <li>Vitamin E tự nhiên</li>
        <li>Tinh dầu thiên nhiên (quế/gừng/vani)</li>
      </ul>

      <h2>Sự Kiện Ra Mắt</h2>
      <p>Để chào mừng bộ sưu tập mới, chúng tôi sẽ tổ chức sự kiện ra mắt vào ngày 25/12/2025 tại cửa hàng chính ở Hà Nội. Tại đây, bạn sẽ có cơ hội trải nghiệm trực tiếp các sản phẩm, gặp gỡ đội ngũ sáng tạo của chúng tôi, và nhận được những ưu đãi đặc biệt dành riêng cho khách hàng có mặt.</p>

      <p>Ngoài ra, với mỗi bộ sưu tập mùa đông được mua, chúng tôi sẽ quyên góp 10% lợi nhuận cho quỹ chăm sóc trẻ em vùng cao, giúp các em có được một mùa đông ấm áp hơn.</p>

      <h2>Cách Sử Dụng</h2>
      <p>Để đạt hiệu quả tốt nhất, hãy thoa son dưỡng nhiều lần trong ngày, đặc biệt là trước khi ra ngoài trời lạnh và trước khi đi ngủ. Bạn cũng có thể thoa một lớp dày vào ban đêm để tạo hiệu ứng mặt nạ dưỡng ẩm sâu cho đôi môi.</p>

      <p>Hãy để bộ sưu tập mùa đông của chúng tôi đồng hành cùng bạn qua những ngày lạnh giá sắp tới!</p>
    `,
  }

  const relatedPosts = [
    {
      id: 2,
      title: "Workshop Làm Son Dưỡng Tự Nhiên",
      category: "Workshop",
      image: "/handmade-natural-lip-balm-making.jpg",
      slug: "workshop-lam-son-duong",
    },
    {
      id: 3,
      title: "Bí Quyết Chăm Sóc Môi Mùa Hanh Khô",
      category: "Hướng Dẫn",
      image: "/honey-lip-balm-natural.jpg",
      slug: "bi-quyet-cham-soc-moi",
    },
    {
      id: 4,
      title: "Câu Chuyện Về Son Dưỡng Hoa Hồng",
      category: "Sản Phẩm",
      image: "/rose-lip-balm-natural.jpg",
      slug: "cau-chuyen-hoa-hong",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
        <div
          className="h-full bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Header />

      <section className="relative min-h-[85vh] flex items-end">
        <div className="absolute inset-0 z-0">
          <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
          <div className="max-w-5xl mx-auto">
            <Link href="/blog">
              <Button
                variant="ghost"
                className="group mb-8 hover:bg-white/10 text-white border border-white/20 backdrop-blur-sm rounded-full px-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Quay lại Blog
              </Button>
            </Link>

            <div className="space-y-6 max-w-3xl">
              <Badge className="text-xs font-medium tracking-wider uppercase px-4 py-1.5 bg-white/20 text-white border border-white/30 backdrop-blur-md">
                {post.category}
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white text-balance leading-[1.1] tracking-tight">
                {post.title}
              </h1>

              <p className="text-lg md:text-xl text-white/90 text-pretty leading-relaxed max-w-2xl">{post.excerpt}</p>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 overflow-hidden">
                    <img
                      src={post.authorImage || "/placeholder.svg"}
                      alt={post.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-white">{post.author}</div>
                    <div className="text-xs text-white/70">{post.authorRole}</div>
                  </div>
                </div>

                <div className="h-8 w-px bg-white/20" />

                <div className="flex items-center gap-2 text-white/80">
                  <Calendar className="w-4 h-4" />
                  <time className="text-sm">{post.date}</time>
                </div>

                <div className="flex items-center gap-2 text-white/80">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_340px] gap-12 lg:gap-20">
            {/* Main Content */}
            <div className="space-y-12">
              <article
                className="prose prose-lg md:prose-xl max-w-none
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
              prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-6
              prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:mt-10 prose-h3:mb-4
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-lg prose-p:mb-6
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:my-8 prose-ul:space-y-2 prose-li:text-muted-foreground prose-li:text-lg
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
              first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-1 first-letter:float-left"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Featured Image Section */}
              <div className="relative rounded-3xl overflow-hidden my-16 group">
                <div className="aspect-[16/9] bg-muted">
                  <img
                    src={post.contentImages.midArticle || "/placeholder.svg"}
                    alt="Bộ sưu tập sản phẩm"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-white text-lg font-medium text-balance">
                    Bộ sưu tập mùa đông với ba hương thơm đặc biệt: Quế, Gừng và Vani
                  </p>
                </div>
              </div>

              {/* Image Gallery Section */}
              <div className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-3xl p-8 md:p-12 my-16 border border-border">
                <div className="text-center mb-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Quy Trình Sản Xuất</h3>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
                    Mỗi thỏi son được làm thủ công với tình yêu và sự tận tâm từ đội ngũ của chúng tôi
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {post.galleryImages.map((image, index) => (
                    <div key={index} className="group cursor-pointer">
                      <div className="relative rounded-2xl overflow-hidden mb-4 bg-muted">
                        <div className="aspect-[4/3]">
                          <img
                            src={image.src || "/placeholder.svg"}
                            alt={image.caption}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </div>
                      <p className="text-sm text-muted-foreground text-center text-balance leading-relaxed px-2">
                        {image.caption}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full-width Image Section for Ingredients Showcase */}
              <div className="relative rounded-3xl overflow-hidden my-16 -mx-4 sm:mx-0">
                <div className="aspect-[21/9] bg-muted">
                  <img
                    src={post.contentImages.ingredients || "/placeholder.svg"}
                    alt="Nguyên liệu tự nhiên"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                  <div className="px-8 md:px-16 max-w-2xl">
                    <Badge className="mb-4 text-xs font-medium tracking-wider uppercase px-4 py-1.5 bg-white/20 text-white border border-white/30 backdrop-blur-sm">
                      100% Tự Nhiên
                    </Badge>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance leading-tight">
                      Nguyên Liệu Organic Cao Cấp
                    </h3>
                    <p className="text-white/90 text-lg leading-relaxed text-pretty">
                      Chúng tôi chỉ sử dụng nguyên liệu organic cao cấp nhất, được lựa chọn kỹ lưỡng từ các nhà cung cấp
                      uy tín trên toàn thế giới.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Aside Section */}
            <aside className="space-y-6">
              <div className="lg:sticky lg:top-28 space-y-6">
                <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-3xl p-8 border border-border">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 overflow-hidden flex-shrink-0">
                      <img
                        src={post.authorImage || "/placeholder.svg"}
                        alt={post.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-lg mb-1">{post.author}</h3>
                      <p className="text-sm text-muted-foreground">{post.authorRole}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Người sáng lập thương hiệu son dưỡng tự nhiên với niềm đam mê chăm sóc làn môi bằng nguyên liệu
                    organic.
                  </p>
                  <Button variant="outline" className="w-full rounded-xl hover:bg-background bg-transparent">
                    Xem thêm bài viết
                  </Button>
                </div>

                <div className="bg-card rounded-3xl p-6 border border-border">
                  <div className="flex gap-3 mb-6">
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1 rounded-xl gap-2 hover:bg-muted bg-transparent"
                    >
                      <Heart className="w-5 h-5" />
                      <span className="text-sm font-medium">245</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1 rounded-xl gap-2 hover:bg-muted bg-transparent"
                    >
                      <Bookmark className="w-5 h-5" />
                      <span className="text-sm font-medium">Lưu</span>
                    </Button>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Chia Sẻ
                    </h3>
                    <div className="flex flex-col gap-2">
                      <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl hover:bg-muted">
                        <div className="w-8 h-8 rounded-full bg-[#1877F2]/10 flex items-center justify-center">
                          <Facebook className="w-4 h-4 text-[#1877F2]" />
                        </div>
                        Facebook
                      </Button>
                      <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl hover:bg-muted">
                        <div className="w-8 h-8 rounded-full bg-[#1DA1F2]/10 flex items-center justify-center">
                          <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                        </div>
                        Twitter
                      </Button>
                      <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl hover:bg-muted">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <LinkIcon className="w-4 h-4" />
                        </div>
                        Copy Link
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 rounded-3xl p-8 border border-primary/20">
                  <h3 className="text-xl font-bold text-foreground mb-3">Nhận Tin Mới Nhất</h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    Đăng ký để nhận bài viết mới và ưu đãi độc quyền
                  </p>
                  <input
                    type="email"
                    placeholder="Email của bạn"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <Button className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-xl h-11">
                    Đăng Ký Ngay
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 text-xs font-medium tracking-wider uppercase px-4 py-1.5 bg-primary/10 text-primary border-0">
              Khám Phá Thêm
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight text-balance">
              Bài Viết Liên Quan
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="group">
                <article className="h-full bg-card rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-border">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-6">
                    <Badge className="text-xs font-medium tracking-wider uppercase px-3 py-1 bg-primary/10 text-primary border-0 mb-4">
                      {relatedPost.category}
                    </Badge>

                    <h3 className="text-xl font-bold text-foreground text-balance leading-tight group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h3>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
