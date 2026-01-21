import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#f5f3ec] border-t border-border">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-5 gap-8 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                🌿
              </div>
              <h3 className="font-bold text-lg text-primary">Glowpurea</h3>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Son dưỡng tự làm từ nguyên liệu thiên nhiên 100% organic, không hóa chất.
            </p>
            {/* 
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div> */}
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">Sản Phẩm</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a className="hover:text-primary" href="#">Tất cả sản phẩm</a></li>
              <li><a className="hover:text-primary" href="#">Bộ sưu tập mới</a></li>
              <li><a className="hover:text-primary" href="#">Khuyến mãi</a></li>
              <li><a className="hover:text-primary" href="#">Bán chạy nhất</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Công Ty</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a className="hover:text-primary" href="/about">Về chúng tôi</a></li>
              <li><a className="hover:text-primary" href="#">Blog</a></li>
              <li><a className="hover:text-primary" href="#">Liên hệ</a></li>
              <li><a className="hover:text-primary" href="#">Tuyển dụng</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Hỗ Trợ</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a className="hover:text-primary" href="#">Câu hỏi thường gặp</a></li>
              <li><a className="hover:text-primary" href="#">Chính sách bảo mật</a></li>
              <li><a className="hover:text-primary" href="#">Điều khoản sử dụng</a></li>
              <li><a className="hover:text-primary" href="#">Chính sách hoàn trả</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Liên Hệ</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <Mail className="w-4 h-4 text-primary mt-0.5" />
                glowpurea0210@gmail.com
              </li>
              <li className="flex gap-2">
                <Phone className="w-4 h-4 text-primary mt-0.5" />
                0344 305 954
              </li>
              <li className="flex gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                600 Nguyễn Văn Cừ Nối Dài,
                An Bình, Bình Thủy, Cần Thơ.
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-[#e6efe0] rounded-xl p-6 md:p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-lg font-bold mb-1">Đăng ký nhận tin tức</h3>
              <p className="text-sm text-muted-foreground">
                Nhận thông tin sản phẩm mới & khuyến mãi
              </p>
            </div>
            <div className="flex gap-2">
              <input
                className="flex-1 px-4 py-2 rounded-lg border"
                placeholder="Nhập email của bạn"
              />
              <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                Đăng ký
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between text-sm text-muted-foreground gap-4">
          <span>© {currentYear} Natural Lip Balm. All rights reserved.</span>
          <div className="flex gap-6">
            <a className="hover:text-primary" href="#">Chính sách bảo mật</a>
            <a className="hover:text-primary" href="#">Điều khoản</a>
            <a className="hover:text-primary" href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
