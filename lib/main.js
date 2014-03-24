var data = require('sdk/self').data;
var clipboard = require("sdk/clipboard");
var converterPanel = require('sdk/panel').Panel({
    width: 212,
    height: 100,
    contentURL: data.url('content.html'),
    contentScriptFile: data.url('content.js')
});
var widget = require('sdk/widget').Widget({
    id: 'text-entry',
    label: 'Text entry',
    contentURL: data.url('img/icon.png'),
    panel: converterPanel
});
converterPanel.on('show', function() {
    converterPanel.port.emit('show');
});
converterPanel.port.on('panel-close', function(text) {
    converterPanel.hide();
});
converterPanel.port.on('panel-copy', function(text) {
    clipboard.set(text);
});
