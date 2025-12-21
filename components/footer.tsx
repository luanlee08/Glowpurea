import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-foreground/5 to-foreground/10 border-t border-border">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                🌿
              </div>
              <h3 className="font-bold text-lg text-primary">Natural Lip Balm</h3>
            </div>
            <p className="text-sm text-foreground/70 mb-6">
              Son dưỡng tự làm từ nguyên liệu thiên nhiên 100% organic, không hóa chất.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Sản Phẩm</h4>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li>
                <a href="#" className="hover:text-primary transition-colors font-medium">
                  Tất cả sản phẩm
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors font-medium">
                  Bộ sưu tập mới
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors font-medium">
                  Khuyến mãi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors font-medium">
                  Bán chạy nhất
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Công Ty</h4>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li>
                <a href="/about" className="hover:text-primary transition-colors font-medium">
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors font-medium">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors font-medium">
                  Liên hệ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors font-medium">
                  Tuyển dụng
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Hỗ Trợ</h4>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li>
                <a href="#" className="hover:text-primary transition-colors font-medium">
                  Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors font-medium">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors font-medium">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors font-medium">
                  Chính sách hoàn trả
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Liên Hệ</h4>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <a href="mailto:info@naturallipbalm.com" className="hover:text-primary transition-colors">
                  info@naturallipbalm.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <a href="tel:+84123456789" className="hover:text-primary transition-colors">
                  +84 (123) 456-789
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>123 Đường ABC, Quận 1, TP.HCM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-primary/10 rounded-xl p-6 md:p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Đăng ký nhận tin tức</h3>
              <p className="text-foreground/70">Nhận thông tin về sản phẩm mới, khuyến mãi và mẹo chăm sóc da</p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="px-6 py-2 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors">
                Đăng ký
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border"></div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/70">
            &copy; {currentYear} Natural Lip Balm. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex gap-6 text-sm text-foreground/70">
            <a href="#" className="hover:text-primary transition-colors">
              Chính sách bảo mật
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Điều khoản sử dụng
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
