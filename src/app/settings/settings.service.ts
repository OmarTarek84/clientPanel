import { Settings } from './settings.modal';
import { EventEmitter } from '@angular/core';

export class SettingsService {
    settingChanged = new EventEmitter<Settings>();
    constructor() {
        if (localStorage.getItem('settings') !== null) {
            this.setting = JSON.parse(localStorage.getItem('settings'));
        }
    }
    private setting: Settings = {
        allowRegistration: true,
        disableBalanceOnAdd: false,
        disableBalanceOnEdit: true
    };

    getSettings() {
        return this.setting;
    }

    changeSettings(settings: Settings) {
        localStorage.setItem('settings', JSON.stringify(settings));
        this.settingChanged.emit(this.setting);
    }
}
