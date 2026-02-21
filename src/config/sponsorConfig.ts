import type { SponsorConfig } from "../types/config";
import sponsorData from "../content/settings/sponsor.json";

export const sponsorConfig: SponsorConfig = {
	title: sponsorData.title || "",
	description: sponsorData.description || "",
	usage: sponsorData.usage || "",
	showSponsorsList: sponsorData.showSponsorsList ?? true,
	showButtonInPost: sponsorData.showButtonInPost ?? true,
	methods: (sponsorData.methods || []).map((m: any) => ({
		name: m.name,
		icon: m.icon,
		qrCode: m.qrCode || "",
		link: m.link || "",
		description: m.description || "",
		enabled: m.enabled ?? true,
	})),
	sponsors: (sponsorData.sponsors || []).map((s: any) => ({
		name: s.name,
		amount: s.amount,
		date: s.date,
		message: s.message || "",
	})),
};

