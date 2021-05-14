export default class ForceMethod extends Error {
	/**
	 * @param {core.Core} core
	 * @param {string} method
	 */
	constructor( core, method ) {
		super( `ForeMethod implementation: at '${ core.constructor.getName() }' method: '${ method }'   ` );
	}
}
