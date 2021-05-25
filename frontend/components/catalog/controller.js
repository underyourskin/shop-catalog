import ControllerBase from 'CORE/controllers/controller';
import Add from './commands/add';

/**
 * @memberOf components.cart
 */
export class Controller extends ControllerBase {

    static getNamespace() {
        return 'Components/Catalog'
    }

    static getName() {
        return 'Components/Catalog/Controller';
    }

    getCommands() {
        return { Add };
    }
}

export default Controller;
