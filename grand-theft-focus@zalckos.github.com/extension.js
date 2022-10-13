const Main = imports.ui.main;
const WindowAttentionHandler = imports.ui.windowAttentionHandler;
const Shell = imports.gi.Shell;

function GrandTheftFocus() {
    this._init();
}

GrandTheftFocus.prototype = {
    _init : function() {
        this._tracker = Shell.WindowTracker.get_default();
        this._handlerid = global.display.connect('window-demands-attention', this._onWindowDemandsAttention.bind(this));
    },

    _onWindowDemandsAttention: function(display, window) {
        Main.activateWindow(window);
    },

    destroy: function () {
        global.display.disconnect(this._handlerid);
    }
}

let grandtheftfocus;

function init() {
}

function enable() {
    grandtheftfocus = new GrandTheftFocus();
}

function disable() {
    grandtheftfocus = null;
}
