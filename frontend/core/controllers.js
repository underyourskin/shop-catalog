import Core from "CORE/base/core";
import CommandAlreadyRegistered from "CORE/commands/errors/command-already-registered";
import Controller from "CORE/controllers/controller";

/**
 * @memberOf core
 */
export default class Controllers extends Core {
	Controller = Controller;

	/**
	 * @type {Object.<core.controllers.controller>}
	 */
	static controllers = {};

	static getNamespace() {
		return 'Core';
	}

	static getName() {
		return 'Core/Controllers';
	}

	/**
	 * @param {string} name
	 * @return {core.controllers.controller}
	 */
	static get( name ) {
		return this.controllers[ name ];
	}

	static register( name, controller ) {
		if ( this.controllers[ controller.getName() ] ) {
			throw new CommandAlreadyRegistered( command ); // Change to ControllerAlreadyExist.
		}

		// Register.
		this.controllers[ controller.getName() ] = controller;

		return this.controllers[ name ] = controller;
	}
}
