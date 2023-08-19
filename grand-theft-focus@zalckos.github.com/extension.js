import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as WindowAttentionHandler from 'resource:///org/gnome/shell/ui/windowAttentionHandler.js';
import Shell from 'gi://Shell';

import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

function GrandTheftFocus() {
    this._init();
}

GrandTheftFocus.prototype = {
    _init : function() {
        this._tracker = Shell.WindowTracker.get_default();
        this._handlerid = global.display.connect('window-demands-attention', this._onWindowDemandsAttention.bind(this));
    },

    _onWindowDemandsAttention: function(display, window) {
        if (!Main.overview._shown)
            Main.activateWindow(window);
    },

    destroy: function () {
        global.display.disconnect(this._handlerid);
    }
}

export default class GrandTheftExtension {
    enable() {
        this._grandtheftfocus = new GrandTheftFocus();
    }

    disable() {
        this._grandtheftfocus = null;
    }
}
