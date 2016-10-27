import { platformUniversalDynamic } from 'angular2-universal/node';
import { PrebootOptions } from 'preboot';

declare var Zone: any;

export interface UniversalRenderConfig {
  document?: string;
  DOCUMENT?: string;
  cancelHandler?: () => boolean;
  time?: boolean;
  id?: string;
  ngModule?: any;
  precompile?: boolean;
  preboot?: PrebootOptions;
  cancel?: boolean;
  requestUrl?: string;
  originUrl?: string;
  baseUrl?: string;
}

export function createRender(options?: any): (UniversalRenderConfig) => Promise<string> {
  options = options || {};
  
  const _options = {
    document: '',
    cancelHandler: () => false,
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
  
  const __providers = ('providers' in options) ? options.providers : [];
  const platformRef = platformUniversalDynamic(__providers);
  
  return function universalRender(config: UniversalRenderConfig = { ngModule: _options.ngModule }) {
    const ngModule = config.ngModule || _options.ngModule;
    
    if (!ngModule) {
      throw new Error('Please provide your main module as ngModule');
    }
    
    if (!config.requestUrl) {
      throw new Error('Please provide the request url as requestUrl');
    }
    
    const _data = Object.assign({}, _options, config);
    _data.DOCUMENT = _data.document;
    
    const zone = Zone.current.fork({
      name: 'UNIVERSAL render',
      properties: _data
    });
    
    return zone.run(() => {
      if (_options.precompile) {
        return platformRef.serializeModule(ngModule, _data);
      }
      return platformRef.serializeModuleFactory(ngModule, _data);
    })
  }
}