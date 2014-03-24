var data = require('sdk/self').data;
var converterPanel = require('sdk/panel').Panel({
    width: 212,
    height: 200,
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
