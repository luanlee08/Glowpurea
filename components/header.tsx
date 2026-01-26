import { Suspense } from "react"
import HeaderClient from "./HeaderClient"

export default function Header(props: any) {
  return (
    <Suspense fallback={<div className="h-20" />}>
      <HeaderClient {...props} />
    </Suspense>
  )
}
