import {
	LinkPreset,
	type NavBarConfig,
	type NavBarLink,
	type NavBarSearchConfig,
	NavBarSearchMethod,
} from "../types/config";
import { siteConfig } from "./siteConfig";
import navData from "../content/settings/navigation.json";

// 将字符串名称映射到 LinkPreset 枚举值
const presetMap: Record<string, LinkPreset> = {
	Home: LinkPreset.Home,
	Archive: LinkPreset.Archive,
	About: LinkPreset.About,
	Friends: LinkPreset.Friends,
	Sponsor: LinkPreset.Sponsor,
	Guestbook: LinkPreset.Guestbook,
	Bangumi: LinkPreset.Bangumi,
};

function parseLink(item: any): NavBarLink | LinkPreset | null {
	// 支持 Keystatic blocks 格式 (discriminant/value) 和旧格式 (type)
	const linkType = item.discriminant || item.type;
	const data = item.value || item;

	if (linkType === "preset") {
		const preset = presetMap[data.preset];
		if (preset === undefined) return null;

		// 遵循 siteConfig 的页面开关逻辑
		if (data.preset === "Guestbook" && !siteConfig.pages.guestbook) return null;
		if (data.preset === "Sponsor" && !siteConfig.pages.sponsor) return null;
		if (data.preset === "Bangumi" && !siteConfig.pages.bangumi) return null;

		return preset;
	}
	// 自定义链接
	return {
		name: data.name,
		url: data.url,
		icon: data.icon,
		external: data.external,
		children: data.children
			?.map((child: any) => parseLink(child))
			.filter((c: any) => c !== null),
	} as NavBarLink;
}

// 根据 JSON 动态生成导航栏配置
const getDynamicNavBarConfig = (): NavBarConfig => {
	const links = navData.links
		.map((item: any) => parseLink(item))
		.filter((c: any) => c !== null) as (NavBarLink | LinkPreset)[];
	return { links };
};

// 导航搜索配置
export const navBarSearchConfig: NavBarSearchConfig = {
	method: NavBarSearchMethod.PageFind,
};

export const navBarConfig: NavBarConfig = getDynamicNavBarConfig();

