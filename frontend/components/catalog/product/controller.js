import ControllerBase from 'CORE/controllers/controller';
import Add from './commands/add'
/**
 * @memberOf components.catalog.product
 */
export class Controller extends ControllerBase {
    static getNamespace() {
        return 'Components/Catalog/Product'
    }

    static getName() {
        return 'Components/Catalog/Product/Controller';
    }

    getCommands() {
        return { Add };
    }
}

export default Controller;
