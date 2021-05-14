import ForceMethod from "CORE/errors/force-method";
import Core from "CORE/base/core";

export default class CommandBase extends Core {
	constructor( args = {}, options = {} ) {
		super();

		const { component } = args;

		if ( component.logger ) {
			this.logger = component.logger.clone();
			this.logger.name = this.getName();

			this.logger.startWith( { args, options } );
		}

		this.initialize( args, options );
	}

	initialize( args, options ) {
		this.args = args;
		this.options =  options;
	}

	apply( args = this.args, options = this.options ) {
		throw new ForceMethod( this, 'apply' );
	}

	run() {
		return this.apply();
	}
}
