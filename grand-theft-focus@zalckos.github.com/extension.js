const Main = imports.ui.main;
const WindowAttentionHandler = imports.ui.windowAttentionHandler;
const Shell = imports.gi.Shell;
const Lang = imports.lang;

function StealMyFocus() {
    this._init();
}

StealMyFocus.prototype = {
    _init : function() {
        this._tracker = Shell.WindowTracker.get_default();
        this._handlerid = global.display.connect('window-demands-attention', Lang.bind(this, this._onWindowDemandsAttention));
    },

    _onWindowDemandsAttention: function(display, window) {
        Main.activateWindow(window);
    },

    destroy: function () {
        global.display.disconnect(this._handlerid);
    }
}

let stealmyfocus;

function init() {
}

function enable() {
    stealmyfocus = new StealMyFocus();
}

function disable() {
    stealmyfocus.destroy();
}
