import type { LicenseConfig } from "../types/config";
import licenseData from "../content/settings/license.json";

export const licenseConfig: LicenseConfig = {
	enable: licenseData.enable ?? true,
	name: licenseData.name || "CC BY-NC-SA 4.0",
	url: licenseData.url || "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

