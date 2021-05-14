import ControllerBase from 'CORE/controllers/controller';
import Remove from "./commands/remove";

/**
 * TODO: This is will be rule example of coding standards in terms of methods order.
 * @memberOf components.cart
 */
export class Controller extends ControllerBase {
	static getNamespace() {
		return 'Components/Cart'
	}

	static getName() {
		return 'Components/Cart/Controller';
	}

	getCommands() {
		return { Remove };
	}
}

export default Controller;
