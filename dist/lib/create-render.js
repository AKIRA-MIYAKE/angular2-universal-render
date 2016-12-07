"use strict";
var node_1 = require('angular2-universal/node');
function createRender(options) {
    options = options || {};
    var _options = {
        document: '',
        cancelHandler: function () { return false; },
        time: false,
        id: null,
        ngModule: null,
        precompile: true,
        cancel: false,
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
    var __providers = ('providers' in options) ? options.providers : [];
    var platformRef = node_1.platformUniversalDynamic(__providers);
    return function universalRender(config) {
        if (config === void 0) { config = { ngModule: _options.ngModule }; }
        var ngModule = config.ngModule || _options.ngModule;
        if (!ngModule) {
            throw new Error('Please provide your main module as ngModule');
        }
        if (!config.requestUrl) {
            throw new Error('Please provide the request url as requestUrl');
        }
        var _data = Object.assign({}, _options, config);
        _data.DOCUMENT = _data.document;
        var zone = Zone.current.fork({
            name: 'UNIVERSAL render',
            properties: _data
        });
        return zone.run(function () {
            if (_options.precompile) {
                return platformRef.serializeModule(ngModule, _data);
            }
            return platformRef.serializeModuleFactory(ngModule, _data);
        });
    };
}
exports.createRender = createRender;
//# sourceMappingURL=/Users/miyake-akira/Documents/Repositories/angular2-universal-render/src/lib/create-render.js.map