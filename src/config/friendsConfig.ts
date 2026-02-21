import type { FriendLink, FriendsPageConfig } from "../types/config";
import friendsData from "../content/settings/friends.json";

// 友链页面配置
export const friendsPageConfig: FriendsPageConfig = {
	// 显示列数
	columns: (Number(friendsData.columns) || 2) as 2 | 3,
};

// 友链配置 - 从 JSON 读取
export const friendsConfig: FriendLink[] = (friendsData.friends || []).map((f: any) => ({
	title: f.title,
	imgurl: f.imgurl,
	desc: f.desc,
	siteurl: f.siteurl,
	tags: f.tags || [],
	weight: f.weight ?? 5,
	enabled: f.enabled ?? true,
}));

// 获取启用的友链并按权重排序
export const getEnabledFriends = (): FriendLink[] => {
	return friendsConfig
		.filter((friend) => friend.enabled)
		.sort((a, b) => b.weight - a.weight);
};

