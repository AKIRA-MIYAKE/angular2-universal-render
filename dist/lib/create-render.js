"use strict";
const node_1 = require('angular2-universal/node');
function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString().substring(1);
}
function createRender(options = {}) {
    const _options = {
        document: '',
        precompile: true,
        time: true,
        id: () => s4(),
        platform: (providers) => node_1.platformUniversalDynamic(providers),
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
    const __platform = ('platform' in options) ? options.platform : _options.platform;
    const __providers = options.providers || _options.providers;
    const platformRef = __platform(__providers);
    return function universalRender(config = { document: _options.document, ngModule: _options.ngModule }) {
        const ngModule = config.ngModule || _options.ngModule;
        if (!ngModule) {
            throw new Error('Please provide your main module as ngModule');
        }
        if (!config.requestUrl) {
            throw new Error('Please provide the request url as requestUrl');
        }
        const _data = Object.assign({}, _options, config);
        const zone = Zone.current.fork({
            name: 'UNIVERSAL render',
            properties: _data
        });
        return zone.run(() => (_options.precompile ?
            platformRef.serializeModule(ngModule, _data) :
            platformRef.serializeModuleFactory(ngModule, _data)));
    };
}
exports.createRender = createRender;
//# sourceMappingURL=create-render.js.map