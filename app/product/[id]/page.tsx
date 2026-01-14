// "use client"

// import { useParams, notFound } from "next/navigation"
// import { useEffect, useState } from "react"
// import Header from "@/components/header"
// import Footer from "@/components/footer"
// import { Button } from "@/components/ui/button"
// import {
//   Heart,
//   ShoppingCart,
//   Leaf,
//   Shield,
//   Award,
//   CheckCircle2,
// } from "lucide-react"
// import axios from "axios"
// import { API_ENDPOINTS } from "@/configs/api-configs"

// const API_BASE =
//   process.env.NEXT_PUBLIC_API_URL || "https://localhost:63731"

// /* ================= TYPES ================= */

// interface ProductDetail {
//   productId: number
//   productName: string
//   description?: string
//   price: number
//   mainImageUrl?: string
//   subImageUrls: string[]
// }

// /* ================= PAGE ================= */

// export default function ProductPage() {
//   const params = useParams<{ id: string }>()
//   const id = Number(params.id)

//   const [product, setProduct] = useState<ProductDetail | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [selectedImage, setSelectedImage] = useState(0)

//   useEffect(() => {
//     if (!id) return

//     const loadProduct = async () => {
//       try {
//         const res = await axios.get(
//           API_ENDPOINTS.USER_PRODUCT_DETAIL(id)
//         )
//         setProduct(res.data)
//       } catch (err: any) {
//         if (err.response?.status === 404) {
//           notFound()
//         } else {
//           console.error(err)
//         }
//       }
//       finally {
//         setLoading(false)
//       }
//     }

//     loadProduct()
//   }, [id])


//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Đang tải sản phẩm...
//       </div>
//     )
//   }

//   if (!product) notFound()

//   const images = [
//     product.mainImageUrl,
//     ...product.subImageUrls,
//   ]
//     .filter(Boolean)
//     .map((img) =>
//       img!.startsWith("http") ? img! : `${API_BASE}${img}`
//     )

//   return (
//     <main className="min-h-screen bg-background">
//       <Header />

//       <section className="py-16">
//         <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-14">

//           {/* ================= IMAGE ================= */}
//           <div>
//             <div className="rounded-2xl overflow-hidden bg-white shadow-lg">
//               <div className="aspect-square">
//                 <img
//                   src={images[selectedImage] || "/placeholder.svg"}
//                   alt={product.productName}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>

//             {/* THUMBNAILS */}
//             <div className="grid grid-cols-5 gap-3 mt-4">
//               {images.map((img, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedImage(index)}
//                   className={`rounded-lg overflow-hidden border-2 transition
//                     ${selectedImage === index
//                       ? "border-primary"
//                       : "border-border"
//                     }`}
//                 >
//                   <img
//                     src={img}
//                     className="aspect-square object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* ================= INFO ================= */}
//           <div className="space-y-6">
//             <h1 className="text-4xl font-bold">
//               {product.productName}
//             </h1>

//             <p className="text-lg text-foreground/70">
//               {product.description || "Mô tả sản phẩm đang được cập nhật."}
//             </p>

//             <div className="py-4 border-y flex items-center gap-6">
//               <span className="text-4xl font-bold text-secondary">
//                 {product.price.toLocaleString()}₫
//               </span>
//               <span className="text-sm text-green-600 font-medium">
//                 Còn hàng
//               </span>
//             </div>

//             <div className="flex gap-4">
//               <Button size="lg" className="flex-1">
//                 <ShoppingCart className="w-5 h-5 mr-2" />
//                 Thêm vào giỏ
//               </Button>

//               <Button size="lg" variant="outline">
//                 <Heart />
//               </Button>
//             </div>

//             {/* INFO ICONS */}
//             <div className="space-y-3 pt-6">
//               <InfoItem icon={<Leaf />} text="100% thành phần thiên nhiên" />
//               <InfoItem icon={<Shield />} text="An toàn cho môi nhạy cảm" />
//               <InfoItem icon={<Award />} text="Sản xuất tại Việt Nam" />
//             </div>
//           </div>
//         </div>

//         {/* ================= COMMITMENTS ================= */}
//         <div className="max-w-5xl mx-auto mt-20 bg-white p-10 rounded-2xl shadow-md">
//           <h2 className="text-2xl font-bold text-primary mb-6">
//             Cam kết từ Glowpurea
//           </h2>
//           <ul className="grid md:grid-cols-2 gap-4">
//             {[
//               "Không paraben – không chì",
//               "Không thử nghiệm trên động vật",
//               "Nguyên liệu rõ nguồn gốc",
//               "Sản xuất thủ công từng mẻ nhỏ",
//             ].map((item, i) => (
//               <li key={i} className="flex gap-3">
//                 <CheckCircle2 className="text-primary" />
//                 <span>{item}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </section>

//       <Footer />
//     </main>
//   )
// }

// /* ================= SUB COMPONENT ================= */

// function InfoItem({
//   icon,
//   text,
// }: {
//   icon: React.ReactNode
//   text: string
// }) {
//   return (
//     <div className="flex items-center gap-3">
//       <span className="text-primary">{icon}</span>
//       <span>{text}</span>
//     </div>
//   )
// }
