import type { AnnouncementConfig } from "../types/config";
import announcementData from "../content/settings/announcement.json";

export const announcementConfig: AnnouncementConfig = {
	title: announcementData.title || "公告",
	content: announcementData.content || "",
	closable: announcementData.closable ?? true,
	link: {
		enable: announcementData.link?.enable ?? false,
		text: announcementData.link?.text || "",
		url: announcementData.link?.url || "",
		external: announcementData.link?.external ?? false,
	},
};

