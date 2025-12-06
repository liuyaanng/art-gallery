import { useState, useEffect } from "react";
import { CHINESE_FONT, FONT_CONFIGS } from "../constants/fonts";

/**
 * 字体加载 Hook
 * 用于管理字体加载状态，确保字体加载完成后再使用
 * 
 * @param {string} fontUrl - 字体 URL，默认为手写体字体
 * @param {string} fontFamily - 字体族名称，如果未提供则从配置中获取
 * @returns {Object} { isLoaded, error }
 */
export const useFontLoader = (fontUrl = CHINESE_FONT, fontFamily = null) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!fontUrl) {
      setIsLoaded(true);
      return;
    }

    // 获取字体族名称
    let familyName = fontFamily;
    if (!familyName) {
      // 尝试从字体配置中查找匹配的配置
      const configs = Object.values(FONT_CONFIGS);
      const config = configs.find((c) => c.url === fontUrl);
      familyName = config?.name || "English";
    }

    // 检查字体是否已经加载
    if (document.fonts && document.fonts.check) {
      if (document.fonts.check(`1em ${familyName}`)) {
        setIsLoaded(true);
        return;
      }
    }

    // 使用 FontFace API 加载字体
    if (window.FontFace) {
      const font = new FontFace(familyName, `url(${fontUrl})`);
      
      font
        .load()
        .then((loadedFont) => {
          document.fonts.add(loadedFont);
          setIsLoaded(true);
        })
        .catch((err) => {
          console.warn("字体加载失败:", err);
          setError(err);
          // 即使加载失败，也设置为已加载，使用回退字体
          setIsLoaded(true);
        });
    } else {
      // 不支持 FontFace API 的浏览器，直接设置为已加载
      setIsLoaded(true);
    }
  }, [fontUrl, fontFamily]);

  return { isLoaded, error };
};

