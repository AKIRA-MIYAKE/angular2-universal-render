import { Type, NgModuleRef } from '@angular/core';
import { platformUniversalDynamic, NodePlatformRef } from 'angular2-universal/node';
import { PrebootOptions } from 'preboot';

declare var Zone: any;

function s4(): string {
  return Math.floor((1 + Math.random()) * 0x10000).toString().substring(1);
}

export interface UniversalRenderConfig {
  document?: string;
  time?: boolean;
  id?: string;
  ngModule?: any;
  precompile?:  boolean;
  preboot?: PrebootOptions;
  requestUrl?: string;
  originUrl?: string;
  baseUrl?: string;
}

export interface CreateRenderOptions {
  document?: string;
  precompile?: boolean;
  time?: boolean;
  id?: () => string;
  platform?: (providers: any) => NodePlatformRef;
  providers?: any[];
  ngModule?: any;
  originUrl?: string;
  baseUrl?: string;
}

export interface Render {
  (config: UniversalRenderConfig): Promise<string>;
}

export function createRender(options: CreateRenderOptions =  {}): (config: UniversalRenderConfig) => Promise<string> {
  const _options: CreateRenderOptions = {
    document: '',
    precompile: true,
    time: true,
    id: () => s4(),
    platform: (providers: any) => platformUniversalDynamic(providers),
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
  const platformRef: NodePlatformRef = __platform(__providers);

  return function universalRender(config: UniversalRenderConfig = { document: _options.document, ngModule: _options.ngModule }): Promise<string> {
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
      platformRef.serializeModuleFactory(ngModule, _data)
    ));
  }
}