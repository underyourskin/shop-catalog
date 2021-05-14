/**
 * @file: api/index.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: API Namespace O__o
 */

export { Cart } from './cart.js';
export { Catalog } from './catalog.js';
export { Http } from './http.js';
export { Websocket } from './websocket.js';

if  ( ! global.$api ) {
	async function attachAPIToGlobal() {
		if ( ! global.$core ) {
			global.$api = await import( 'API' );
		}
	}

	function onAfterAttachCore() {

	}

	attachAPIToGlobal().then( onAfterAttachCore );
}
