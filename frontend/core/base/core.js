import ForceMethod from '../errors/force-method';

/**
 * @memberOf core
 */
export class Core {
	static getNamespace() {
        new ForceMethod();
	}

	static getName() {
        return ForceMethod();
	}

	getNamespace() {
		return this.constructor.getNamespace();
	}

	getName() {
		return this.constructor.getName();
	}


	// interfaces = []
	//
	// static interfaces = [];
	//
	// static attachInterface( ownerInterface, interfaceToAttach ) {
	// 	if ( ! this.hasInterface( ownerInterface, interfaceToAttach ) ) {
	// 		this.interfaces.push( ownerInterface );
	// 	}
	// }
	//
	// static hasInterface( ownerInterface, interfaceToFind ) {
	// 	if ( interfaceToFind )  {
	// 		return this.interfaces.find( ( ownerInterface ) => this.hasInterface( ownerInterface, interfaceToFind ) );
	// 	}
	//
	// 	return false;
	// }
	//
	// attachInterface( $interface$ ) {
	// 	this.constructor.attachInterface( this, $interface$ );
	// }

}

export default Core;
