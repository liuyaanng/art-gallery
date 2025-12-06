import { useMemo } from "react"
import { useThree } from "@react-three/fiber"

function useGalleryPages({ count, imageWidth = 3, gap = 4, extra = 1, margin = 0.8 }) {
  const { width: vw } = useThree((s) => s.viewport)

  return useMemo(() => {
    const step = imageWidth + gap + extra
    const lastCenterX = count * step
    const lastRightX = lastCenterX + imageWidth / 2

    // 让最后一幅画右边缘落在屏幕右侧附近（留一点 margin）
    const shift = Math.max(0, lastRightX - (vw / 2 - margin))

    // 滚动范围 = (pages - 1) * vw  的直觉匹配
    const pages = 1 + shift / vw

    return Math.max(1, pages)
  }, [count, imageWidth, gap, extra, margin, vw])
}

export default useGalleryPages;