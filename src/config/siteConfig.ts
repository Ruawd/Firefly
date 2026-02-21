import type { SiteConfig } from "@/types/config";
import { fontConfig } from "./fontConfig";
import siteData from "../content/settings/site.json";

// 定义站点语言
const SITE_LANG = (siteData.lang as any) || "zh_CN";

export const siteConfig: SiteConfig = {
	// 站点标题
	title: siteData.title || "Firefly",

	// 站点副标题
	subtitle: siteData.subtitle || "Demo site",

	// 站点 URL
	site_url: siteData.site_url || "https://firefly.cuteleaf.cn",

	// 站点描述
	description: siteData.description || "Firefly 是一款基于 Astro 框架和 Fuwari 模板开发的清新美观且现代化个人博客主题模板...",

	// 站点关键词
	keywords: siteData.keywords || ["Firefly", "Fuwari", "Astro"],

	// 主题色
	themeColor: {
		hue: siteData.themeColor?.hue ?? 165,
		fixed: siteData.themeColor?.fixed ?? false,
		defaultMode: (siteData.themeColor?.defaultMode as any) || "system",
	},

	// 网站Card样式配置
	card: {
		border: true,
	},

	// Favicon 配置
	favicon: [
		{
			src: "/favicon/favicon.ico",
		},
	],

	// 导航栏配置
	navbar: {
		logo: {
			type: "image",
			value: "assets/images/firefly.png",
			alt: "🍀",
		},
		title: siteData.title || "Firefly",
		widthFull: false,
		followTheme: false,
	},

	// 站点开始日期
	siteStartDate: "2025-01-01",

	// 站点时区
	timezone: "Asia/Shanghai",

	// 提醒框配置
	rehypeCallouts: {
		theme: "github",
	},

	// 文章页底部的"上次编辑时间"卡片开关
	showLastModified: true,

	// 文章过期阈值
	outdatedThreshold: 30,

	// 是否开启分享海报生成功能
	sharePoster: true,

	// OpenGraph图片功能
	generateOgImages: false,

	// bangumi配置
	bangumi: {
		userId: "1143164",
	},

	// 页面开关配置
	pages: {
		sponsor: true,
		guestbook: true,
		bangumi: true,
	},

	// 分类导航栏开关
	categoryBar: true,

	// 文章列表布局配置
	postListLayout: {
		defaultMode: "list",
		allowSwitch: true,
		grid: {
			masonry: false,
			columns: 3,
		},
	},

	// 分页配置
	pagination: {
		postsPerPage: 10,
	},

	// 统计分析
	analytics: {
		googleAnalyticsId: "",
		microsoftClarityId: "",
	},

	// 图像优化及响应式配置
	imageOptimization: {
		formats: "webp",
		quality: 85,
	},

	// 字体配置
	font: fontConfig,

	// 站点语言
	lang: SITE_LANG,
};

