declare module 'angular2-universal-render' {
	import { NodePlatformRef } from 'angular2-universal/node';
	import { PrebootOptions } from 'preboot';
	export interface UniversalRenderConfig {
	    document?: string;
	    time?: boolean;
	    id?: string;
	    ngModule?: any;
	    precompile?: boolean;
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
	export function createRender(options?: CreateRenderOptions): (config: UniversalRenderConfig) => Promise<string>;

}
declare module 'angular2-universal-render' {
	export function rehydrateCache(defaultValue: {
	    [key: string]: any;
	}): {
	    [key: string]: any;
	};
	export class Cache {
	    _cache: {
	        [key: string]: any;
	    };
	    constructor(isBrowser: boolean);
	    has(key: string): boolean;
	    set(key: string, value: any): void;
	    get(key: string): any;
	    clear(): void;
	    dehydrate(): {
	        [key: string]: any;
	    };
	    rehydrate(json: {
	        [key: string]: any;
	    }): void;
	    toJSON(): {
	        [key: string]: any;
	    };
	}

}
