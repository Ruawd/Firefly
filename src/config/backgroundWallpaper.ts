import type { BackgroundWallpaperConfig } from "@/types/config";
import appearanceData from "../content/settings/appearance.json";

export const backgroundWallpaper: BackgroundWallpaperConfig = {
	// 壁纸模式："banner" 横幅壁纸，"overlay" 全屏透明，"none" 纯色背景无壁纸
	mode: (appearanceData.mode as any) || "banner",
	// 是否允许用户通过导航栏切换壁纸模式
	switchable: true,

	src: {
		// 桌面背景图片（支持单张或多张随机）
		desktop: appearanceData.src?.desktop || [
			"assets/images/DesktopWallpaper/d1.avif",
			"assets/images/DesktopWallpaper/d2.avif",
			"assets/images/DesktopWallpaper/d3.avif",
			"assets/images/DesktopWallpaper/d4.avif",
			"assets/images/DesktopWallpaper/d5.avif",
			"assets/images/DesktopWallpaper/d6.avif",
		],
		// 移动背景图片（支持单张或多张随机）
		mobile: appearanceData.src?.mobile || [
			"assets/images/MobileWallpaper/m1.avif",
			"assets/images/MobileWallpaper/m2.avif",
			"assets/images/MobileWallpaper/m3.avif",
			"assets/images/MobileWallpaper/m4.avif",
			"assets/images/MobileWallpaper/m5.avif",
			"assets/images/MobileWallpaper/m6.avif",
		],
	},
	// Banner模式特有配置
	banner: {
		// 图片位置
		position: appearanceData.banner?.position || "0% 20%",

		// 主页横幅文字
		homeText: {
			// 是否启用主页横幅文字
			enable: appearanceData.banner?.homeText?.enable ?? true,
			// 是否允许用户通过控制面板切换横幅标题显示
			switchable: true,
			// 主页横幅主标题
			title: appearanceData.banner?.homeText?.title || "Lovely firefly!",
			// 主页横幅主标题字体大小
			titleSize: "3.8rem",
			// 主页横幅副标题
			subtitle: appearanceData.banner?.homeText?.subtitle || [
				"In Reddened Chrysalis, I Once Rest",
				"From Shattered Sky, I Free Fall",
				"Amidst Silenced Stars, I Deep Sleep",
				"Upon Lighted Fyrefly, I Soon Gaze",
				"From Undreamt Night, I Thence Shine",
				"In Finalized Morrow, I Full Bloom",
			],
			// 主页横幅副标题字体大小
			subtitleSize: "1.5rem",
			typewriter: {
				// 是否启用打字机效果
				enable: true,
				// 打字速度（毫秒）
				speed: 100,
				// 删除速度（毫秒）
				deleteSpeed: 50,
				// 完全显示后的暂停时间（毫秒）
				pauseTime: 2000,
			},
		},
		// 图片来源
		credit: {
			enable: {
				desktop: true,
				mobile: true,
			},
			text: {
				desktop: "Pixiv - 晚晚喵",
				mobile: "Pixiv - KiraraShss",
			},
			url: {
				desktop: "https://www.pixiv.net/users/108801776",
				mobile: "https://www.pixiv.net/users/42715864",
			},
		},
		// 横幅导航栏配置
		navbar: {
			transparentMode: "semifull",
			enableBlur: true,
			blur: 3,
		},
		// 水波纹动画效果配置
		waves: {
			enable: {
				desktop: true,
				mobile: true,
			},
			switchable: true,
		},
	},
	// 全屏透明覆盖模式特有配置
	overlay: {
		zIndex: -1,
		opacity: 0.8,
		blur: 1,
	},
};

