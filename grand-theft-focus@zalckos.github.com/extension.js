import * as Main from 'resource:///org/gnome/shell/ui/main.js';

function onWindowDemandsAttention(display, window) {
    if (!Main.overview._shown) {
        Main.activateWindow(window);
    }
}

export default class GrandTheftExtension {
    enable() {
        this._handlerid = global.display.connect('window-demands-attention', onWindowDemandsAttention);
    }

    disable() {
        global.display.disconnect(this._handlerid);
        delete this._handlerid;
    }
}
