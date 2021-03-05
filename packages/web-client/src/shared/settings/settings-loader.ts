import {SettingsModel} from "./settings-model";

export async function loadSettings(): Promise<SettingsModel> {
    const response = await fetch('settings.json');
    if (response.status !== 200) {
        throw new Error('Failed to retrieve settings');
    }

    return await response.json();
}