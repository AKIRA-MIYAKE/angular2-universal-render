"use strict";
var node_1 = require('angular2-universal/node');
function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString().substring(1);
}
function createRender(options) {
    if (options === void 0) { options = {}; }
    var _options = {
        document: '',
        precompile: true,
        time: true,
        id: function () { return s4(); },
        platform: function (providers) { return node_1.platformUniversalDynamic(providers); },
        providers: [],
        ngModule: null,
        originUrl: 'localhost',
        baseUrl: '/'
    };
    _options.document = ('document' in options) ? options.document : _options.document;
    _options.precompile = ('precompile' in options) ? options.precompile : _options.precompile;
    _options.time = ('time' in options) ? options.time : _options.time;
    _options.id = ('id' in options) ? options.id : _options.id;
    _options.ngModule = ('ngModule' in options) ? options.ngModule : _options.ngModule;
    _options.originUrl = ('originUrl' in options) ? options.originUrl : _options.originUrl;
    _options.baseUrl = ('baseUrl' in options) ? options.baseUrl : _options.baseUrl;
    var __platform = ('platform' in options) ? options.platform : _options.platform;
    var __providers = options.providers || _options.providers;
    var platformRef = __platform(__providers);
    return function universalRender(config) {
        if (config === void 0) { config = { document: _options.document, ngModule: _options.ngModule }; }
        var ngModule = config.ngModule || _options.ngModule;
        if (!ngModule) {
            throw new Error('Please provide your main module as ngModule');
        }
        if (!config.requestUrl) {
            throw new Error('Please provide the request url as requestUrl');
        }
        config.id = _options.id();
        var _data = Object.assign({}, _options, config);
        var zone = Zone.current.fork({
            name: 'UNIVERSAL render',
            properties: _data
        });
        return zone.run(function () { return (_options.precompile ?
            platformRef.serializeModule(ngModule, _data) :
            platformRef.serializeModuleFactory(ngModule, _data)); });
    };
}
exports.createRender = createRender;
//# sourceMappingURL=create-render.js.map