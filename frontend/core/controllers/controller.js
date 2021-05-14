/**
 * @file: core/controller.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 * TODO:
 */

import ForceMethod from "CORE/errors/force-method";
import Core from "CORE/base/core";
import { Commands } from 'CORE';

/**
 * @memberOf core.controllers
 */
export class Controller extends Core {
	constructor() {
		super();

		this.registerCommands();
	}

	registerCommands() {
		this.commands = Commands.register( this.getCommands(), this );
	}

	getName() {
		return this.constructor.getName();
	}

	getCommands() {
		new ForceMethod();
	}
}

export default Controller;
