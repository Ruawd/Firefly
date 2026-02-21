import type { ProfileConfig } from "../types/config";
import profileData from "../content/settings/profile.json";

export const profileConfig: ProfileConfig = {
	// 头像
	avatar: profileData.avatar || "assets/images/avatar.avif",

	// 名字
	name: profileData.name || "Firefly",

	// 个人签名
	bio: profileData.bio || "Hello, I'm Firefly.",

	// 社交链接
	links: profileData.links || [],
};

