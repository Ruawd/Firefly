// Keystatic CMS 配置文件
// 用于管理博客文章内容，匹配现有 content.config.ts 的 schema
import { config, fields, collection, singleton } from "@keystatic/core";

// 判断运行环境，开发时使用 local 模式，生产环境使用 github 模式
const isProd = (import.meta as any).env?.PROD ?? false;

export default config({
    storage: isProd
        ? {
            kind: "github" as const,
            repo: "Ruawd/Firefly",
        }
        : {
            kind: "local" as const,
        },

    // 管理后台 UI 配置
    ui: {
        brand: {
            name: "Firefly CMS",
        },
        navigation: {
            // 导航分组
            内容管理: ["posts"],
            系统配置: ["site", "appearance", "navigation"],
            个人与社交: ["profile", "friends", "announcement"],
            功能配置: ["sponsor", "license", "comment"],
        },
    },

    singletons: {
        // 站点基础配置
        site: singleton({
            label: "站点信息",
            path: "src/content/settings/site",
            format: { data: "json" },
            schema: {
                title: fields.text({ label: "站点标题" }),
                subtitle: fields.text({ label: "站点副标题" }),
                description: fields.text({ label: "站点描述", multiline: true }),
                site_url: fields.text({ label: "站点 URL" }),
                keywords: fields.array(fields.text({ label: "关键词" }), {
                    label: "站点关键词",
                    itemLabel: (props) => props.value || "新关键词",
                }),
                themeColor: fields.object({
                    hue: fields.integer({
                        label: "主题色相 (0-360)",
                        defaultValue: 165,
                        validation: { min: 0, max: 360 },
                    }),
                    fixed: fields.checkbox({ label: "固定主题色", defaultValue: false }),
                    defaultMode: fields.select({
                        label: "默认模式",
                        options: [
                            { label: "跟随系统", value: "system" },
                            { label: "亮色", value: "light" },
                            { label: "暗色", value: "dark" },
                        ],
                        defaultValue: "system",
                    }),
                }, { label: "主题颜色" }),
                lang: fields.select({
                    label: "站点语言",
                    options: [
                        { label: "简体中文", value: "zh_CN" },
                        { label: "繁体中文", value: "zh_TW" },
                        { label: "English", value: "en" },
                        { label: "日本語", value: "ja" },
                        { label: "Русский", value: "ru" },
                    ],
                    defaultValue: "zh_CN",
                }),
            },
        }),

        // 外观设置
        appearance: singleton({
            label: "外观设置",
            path: "src/content/settings/appearance",
            format: { data: "json" },
            schema: {
                mode: fields.select({
                    label: "壁纸模式",
                    options: [
                        { label: "横幅模式 (Banner)", value: "banner" },
                        { label: "全屏透明 (Overlay)", value: "overlay" },
                        { label: "纯色背景 (None)", value: "none" },
                    ],
                    defaultValue: "banner",
                }),
                src: fields.object({
                    desktop: fields.array(fields.text({ label: "桌面端图片路径" }), {
                        label: "桌面端背景图",
                        itemLabel: (props) => props.value || "图片路径",
                    }),
                    mobile: fields.array(fields.text({ label: "移动端图片路径" }), {
                        label: "移动端背景图",
                        itemLabel: (props) => props.value || "图片路径",
                    }),
                }, { label: "背景图片资源" }),
                banner: fields.object({
                    position: fields.text({ label: "图片位置 (CSS object-position)", defaultValue: "0% 20%" }),
                    homeText: fields.object({
                        enable: fields.checkbox({ label: "启用主页横幅文字", defaultValue: true }),
                        title: fields.text({ label: "横幅主标题" }),
                        subtitle: fields.array(fields.text({ label: "副标题" }), {
                            label: "横幅副标题 (循环/随机显示)",
                            itemLabel: (props) => props.value || "副标题内容",
                        }),
                    }, { label: "横幅文字配置" }),
                }, { label: "横幅模式配置" }),
            },
        }),

        // 导航配置
        navigation: singleton({
            label: "导航菜单",
            path: "src/content/settings/navigation",
            format: { data: "json" },
            schema: {
                links: fields.blocks({
                    preset: {
                        label: "预设页面",
                        schema: fields.object({
                            preset: fields.select({
                                label: "选择页面",
                                options: [
                                    { label: "主页", value: "Home" },
                                    { label: "归档", value: "Archive" },
                                    { label: "友链", value: "Friends" },
                                    { label: "留言板", value: "Guestbook" },
                                    { label: "关于", value: "About" },
                                    { label: "赞助", value: "Sponsor" },
                                    { label: "番组计划", value: "Bangumi" },
                                ],
                                defaultValue: "Home",
                            }),
                        }, { label: "页项设置" }),
                        itemLabel: (props) => `预设: ${props.fields.preset.value}`,
                    },
                    custom: {
                        label: "自定义链接",
                        schema: fields.object({
                            name: fields.text({ label: "名称" }),
                            url: fields.text({ label: "链接地址" }),
                            icon: fields.text({ label: "图标 (Icon 名称)" }),
                            external: fields.checkbox({ label: "是否外部链接", defaultValue: false }),
                            children: fields.blocks({
                                preset: {
                                    label: "预设页面",
                                    schema: fields.object({
                                        preset: fields.select({
                                            label: "选择页面",
                                            options: [
                                                { label: "主页", value: "Home" },
                                                { label: "归档", value: "Archive" },
                                                { label: "友链", value: "Friends" },
                                                { label: "留言板", value: "Guestbook" },
                                                { label: "关于", value: "About" },
                                                { label: "赞助", value: "Sponsor" },
                                                { label: "番组计划", value: "Bangumi" },
                                            ],
                                            defaultValue: "Home",
                                        }),
                                    }, { label: "页项设置" }),
                                    itemLabel: (props) => `预设: ${props.fields.preset.value}`,
                                },
                                custom: {
                                    label: "自定义链接",
                                    schema: fields.object({
                                        name: fields.text({ label: "名称" }),
                                        url: fields.text({ label: "链接地址" }),
                                        icon: fields.text({ label: "图标" }),
                                        external: fields.checkbox({ label: "是否外部链接", defaultValue: true }),
                                    }, { label: "链接设置" }),
                                    itemLabel: (props) => `自定义: ${props.fields.name.value}`,
                                }
                            }, { label: "二级菜单" })
                        }, { label: "自定义链接设置" }),
                        itemLabel: (props) => `自定义: ${props.fields.name.value}`,
                    }
                }, { label: "导航链接列表" }),
            },
        }),

        // 个人资料
        profile: singleton({
            label: "个人资料",
            path: "src/content/settings/profile",
            format: { data: "json" },
            schema: {
                avatar: fields.text({ label: "头像路径/URL" }),
                name: fields.text({ label: "昵称" }),
                bio: fields.text({ label: "个人签名", multiline: true }),
                links: fields.array(
                    fields.object({
                        name: fields.text({ label: "名称" }),
                        icon: fields.text({ label: "图标 (iconify 名称)" }),
                        url: fields.text({ label: "链接地址" }),
                        showName: fields.checkbox({ label: "显示名称", defaultValue: false }),
                    }, { label: "社交链接" }),
                    {
                        label: "社交链接列表",
                        itemLabel: (props) => props.fields.name.value || "新链接",
                    }
                ),
            },
        }),

        // 友链管理
        friends: singleton({
            label: "友链管理",
            path: "src/content/settings/friends",
            format: { data: "json" },
            schema: {
                columns: fields.select({
                    label: "显示列数",
                    options: [
                        { label: "2 列", value: "2" },
                        { label: "3 列", value: "3" },
                    ],
                    defaultValue: "2",
                }),
                friends: fields.array(
                    fields.object({
                        title: fields.text({ label: "站点名称" }),
                        imgurl: fields.text({ label: "头像 URL" }),
                        desc: fields.text({ label: "描述" }),
                        siteurl: fields.text({ label: "站点地址" }),
                        tags: fields.array(fields.text({ label: "标签" }), {
                            label: "标签",
                            itemLabel: (props) => props.value || "标签",
                        }),
                        weight: fields.integer({ label: "排序权重 (越大越靠前)", defaultValue: 5 }),
                        enabled: fields.checkbox({ label: "启用", defaultValue: true }),
                    }, { label: "友链" }),
                    {
                        label: "友链列表",
                        itemLabel: (props) => props.fields.title.value || "新友链",
                    }
                ),
            },
        }),

        // 公告栏
        announcement: singleton({
            label: "公告栏",
            path: "src/content/settings/announcement",
            format: { data: "json" },
            schema: {
                title: fields.text({ label: "公告标题" }),
                content: fields.text({ label: "公告内容", multiline: true }),
                closable: fields.checkbox({ label: "允许关闭", defaultValue: true }),
                link: fields.object({
                    enable: fields.checkbox({ label: "启用链接", defaultValue: false }),
                    text: fields.text({ label: "链接文字" }),
                    url: fields.text({ label: "链接地址" }),
                    external: fields.checkbox({ label: "外部链接", defaultValue: false }),
                }, { label: "公告链接" }),
            },
        }),

        // 赞助配置
        sponsor: singleton({
            label: "赞助配置",
            path: "src/content/settings/sponsor",
            format: { data: "json" },
            schema: {
                title: fields.text({ label: "页面标题 (留空用默认)" }),
                description: fields.text({ label: "页面描述 (留空用默认)" }),
                usage: fields.text({ label: "赞助用途说明", multiline: true }),
                showSponsorsList: fields.checkbox({ label: "显示赞助者列表", defaultValue: true }),
                showButtonInPost: fields.checkbox({ label: "文章底部显示赞助按钮", defaultValue: true }),
                methods: fields.array(
                    fields.object({
                        name: fields.text({ label: "名称" }),
                        icon: fields.text({ label: "图标" }),
                        qrCode: fields.text({ label: "收款码图片路径" }),
                        link: fields.text({ label: "赞助链接" }),
                        description: fields.text({ label: "描述" }),
                        enabled: fields.checkbox({ label: "启用", defaultValue: true }),
                    }, { label: "赞助方式" }),
                    {
                        label: "赞助方式列表",
                        itemLabel: (props) => props.fields.name.value || "新方式",
                    }
                ),
                sponsors: fields.array(
                    fields.object({
                        name: fields.text({ label: "赞助者" }),
                        amount: fields.text({ label: "金额" }),
                        date: fields.text({ label: "日期" }),
                        message: fields.text({ label: "留言" }),
                    }, { label: "赞助记录" }),
                    {
                        label: "赞助者名单",
                        itemLabel: (props) => `${props.fields.name.value} - ${props.fields.amount.value}`,
                    }
                ),
            },
        }),

        // 许可协议
        license: singleton({
            label: "许可协议",
            path: "src/content/settings/license",
            format: { data: "json" },
            schema: {
                enable: fields.checkbox({ label: "启用文章许可证信息", defaultValue: true }),
                name: fields.text({ label: "协议名称" }),
                url: fields.text({ label: "协议链接" }),
            },
        }),

        // 评论系统
        comment: singleton({
            label: "评论系统",
            path: "src/content/settings/comment",
            format: { data: "json" },
            schema: {
                type: fields.select({
                    label: "评论系统类型",
                    options: [
                        { label: "关闭", value: "none" },
                        { label: "Giscus", value: "giscus" },
                        { label: "Twikoo", value: "twikoo" },
                        { label: "Waline", value: "waline" },
                        { label: "Disqus", value: "disqus" },
                        { label: "Artalk", value: "artalk" },
                    ],
                    defaultValue: "none",
                }),
                giscus: fields.object({
                    repo: fields.text({ label: "GitHub 仓库 (owner/repo)" }),
                    repoId: fields.text({ label: "仓库 ID" }),
                    category: fields.text({ label: "Discussion 分类" }),
                    categoryId: fields.text({ label: "分类 ID" }),
                    mapping: fields.select({
                        label: "映射方式",
                        options: [
                            { label: "标题", value: "title" },
                            { label: "路径", value: "pathname" },
                            { label: "URL", value: "url" },
                        ],
                        defaultValue: "title",
                    }),
                    strict: fields.select({
                        label: "严格匹配",
                        options: [{ label: "关闭", value: "0" }, { label: "开启", value: "1" }],
                        defaultValue: "0",
                    }),
                    reactionsEnabled: fields.select({
                        label: "启用表情",
                        options: [{ label: "关闭", value: "0" }, { label: "开启", value: "1" }],
                        defaultValue: "1",
                    }),
                    emitMetadata: fields.select({
                        label: "发送元数据",
                        options: [{ label: "关闭", value: "0" }, { label: "开启", value: "1" }],
                        defaultValue: "1",
                    }),
                    inputPosition: fields.select({
                        label: "评论框位置",
                        options: [
                            { label: "顶部", value: "top" },
                            { label: "底部", value: "bottom" },
                        ],
                        defaultValue: "top",
                    }),
                    lang: fields.text({ label: "语言", defaultValue: "zh-CN" }),
                    loading: fields.select({
                        label: "加载方式",
                        options: [
                            { label: "懒加载", value: "lazy" },
                            { label: "立即加载", value: "eager" },
                        ],
                        defaultValue: "lazy",
                    }),
                }, { label: "Giscus 配置" }),
            },
        }),
    },

    collections: {
        // 文章集合 - 匹配 content.config.ts 中的 postsCollection schema
        posts: collection({
            label: "文章",
            slugField: "title",
            path: "src/content/posts/**",
            entryLayout: "content",
            format: {
                contentField: "content",
                data: "yaml",
            },
            schema: {
                // 文章标题（同时生成 slug）
                title: fields.slug({
                    name: {
                        label: "标题",
                        description: "文章标题，同时用于生成 URL slug",
                        validation: { isRequired: true },
                    },
                }),

                // 发布日期
                published: fields.datetime({
                    label: "发布日期",
                    description: "文章发布日期",
                    validation: { isRequired: true },
                }),

                // 更新日期（可选）
                updated: fields.datetime({
                    label: "更新日期",
                    description: "文章最后更新日期",
                }),

                // 是否为草稿
                draft: fields.checkbox({
                    label: "草稿",
                    description: "勾选后文章不会在站点上公开显示",
                    defaultValue: false,
                }),

                // 文章描述
                description: fields.text({
                    label: "描述",
                    description: "文章摘要描述，用于 SEO 和文章列表预览",
                    multiline: true,
                }),

                // 封面图
                image: fields.text({
                    label: "封面图",
                    description:
                        '封面图片路径或 URL。填写 "api" 使用随机图，留空则无封面',
                }),

                // 标签
                tags: fields.array(fields.text({ label: "标签" }), {
                    label: "标签",
                    description: "文章标签列表",
                    itemLabel: (props) => props.value || "新标签",
                }),

                // 分类
                category: fields.text({
                    label: "分类",
                    description: "文章分类",
                }),

                // 语言
                lang: fields.text({
                    label: "语言",
                    description: '文章语言代码，如 "zh_CN"、"en"，留空则使用站点默认语言',
                }),

                // 是否置顶
                pinned: fields.checkbox({
                    label: "置顶",
                    description: "置顶文章会显示在文章列表顶部",
                    defaultValue: false,
                }),

                // 作者
                author: fields.text({
                    label: "作者",
                    description: "文章作者，留空则使用站点默认作者",
                }),

                // 原文链接
                sourceLink: fields.text({
                    label: "原文链接",
                    description: "如果是转载文章，填写原文 URL",
                }),

                // 许可协议名称
                licenseName: fields.text({
                    label: "许可协议",
                    description: "自定义许可协议名称，留空则使用站点默认协议",
                }),

                // 许可协议链接
                licenseUrl: fields.text({
                    label: "许可协议链接",
                    description: "自定义许可协议的 URL",
                }),

                // 是否启用评论
                comment: fields.checkbox({
                    label: "启用评论",
                    description: "是否在此文章底部显示评论区",
                    defaultValue: true,
                }),

                // 文章正文内容（Markdown 格式）
                content: fields.markdoc({
                    label: "正文",
                    description: "文章正文内容，支持 Markdown 语法",
                    extension: "md",
                }),
            },
        }),
    },
});
