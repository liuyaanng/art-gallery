/**
 * 字体配置管理
 * 统一管理项目中使用的所有字体
 */

// 在 Create React App 中，字体文件需要放在 public 文件夹才能直接使用 URL
// 或者使用 require 导入并转换为字符串
// 这里使用 public 路径方式（需要将字体文件复制到 public/fonts 目录）
const getPublicFontUrl = (fontName) => {
  return `${process.env.PUBLIC_URL || ""}/fonts/${fontName}`;
};

// 字体文件路径（需要将字体文件放在 public/fonts 目录）
const englishFont = getPublicFontUrl("english.woff");
const chineseFont = getPublicFontUrl("chinese.ttf");

/**
 * 字体配置对象
 * @typedef {Object} FontConfig
 * @property {string} name - 字体名称
 * @property {string} url - 字体文件 URL
 * @property {string} family - CSS 字体族名称
 * @property {string} [weight] - 字体权重
 * @property {string} [style] - 字体样式
 */

/**
 * 字体配置映射
 */
export const FONT_CONFIGS = {
  ENGLISH: {
    name: "English",
    url: englishFont,
    family: "English, sans-serif",
    weight: "400",
    style: "normal",
  },
  CHINESE: {
    name: "Chinese",
    url: chineseFont,
    family: "Chinese, cursive",
    weight: "400",
    style: "normal",
  },
};

/**
 * 获取字体 URL
 * @param {keyof typeof FONT_CONFIGS} fontKey - 字体键名
 * @returns {string} 字体 URL
 */
export const getFontUrl = (fontKey = "ENGLISH") => {
  return FONT_CONFIGS[fontKey]?.url || FONT_CONFIGS.ENGLISH.url;
};

/**
 * 获取字体配置
 * @param {keyof typeof FONT_CONFIGS} fontKey - 字体键名
 * @returns {FontConfig} 字体配置对象
 */
export const getFontConfig = (fontKey = "ENGLISH") => {
  return FONT_CONFIGS[fontKey] || FONT_CONFIGS.ENGLISH;
};

/**
 * 默认字体 URL（用于 Three.js Text 组件）
 */
export const ENGLISH_FONT = getFontUrl("ENGLISH");

/**
 * 手写体字体 URL（用于 Three.js Text 组件）
 */
export const CHINESE_FONT = getFontUrl("CHINESE");

/**
 * 默认字体配置
 */
export const DEFAULT_FONT_CONFIG = getFontConfig("ENGLISH");

/**
 * 所有字体的 URL 数组（用于预加载）
 */
export const FONT_URLS = Object.values(FONT_CONFIGS).map((config) => config.url);
