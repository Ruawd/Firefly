import type { CommentConfig } from "../types/config";
import commentData from "../content/settings/comment.json";

export const commentConfig: CommentConfig = {
	// 评论系统类型 - 从 CMS 读取
	type: (commentData.type as any) || "none",

	// twikoo 评论系统配置
	twikoo: {
		envId: "https://twikoo.vercel.app",
		lang: "zh-CN",
		visitorCount: true,
	},

	// waline 评论系统配置
	waline: {
		serverURL: "https://waline.vercel.app",
		lang: "zh-CN",
		login: "enable",
		visitorCount: true,
	},

	// artalk 评论系统配置
	artalk: {
		server: "https://artalk.example.com/",
		locale: "zh-CN",
		visitorCount: true,
	},

	// giscus 评论系统配置 - 从 CMS 读取
	giscus: {
		repo: commentData.giscus?.repo || "",
		repoId: commentData.giscus?.repoId || "",
		category: commentData.giscus?.category || "General",
		categoryId: commentData.giscus?.categoryId || "",
		mapping: commentData.giscus?.mapping || "title",
		strict: commentData.giscus?.strict || "0",
		reactionsEnabled: commentData.giscus?.reactionsEnabled || "1",
		emitMetadata: commentData.giscus?.emitMetadata || "1",
		inputPosition: commentData.giscus?.inputPosition || "top",
		lang: commentData.giscus?.lang || "zh-CN",
		loading: commentData.giscus?.loading || "lazy",
	},

	// disqus 评论系统配置
	disqus: {
		shortname: "firefly",
	},
};

