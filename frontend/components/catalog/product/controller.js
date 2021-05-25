import ControllerBase from 'CORE/controllers/controller';
import Add from './commands/add'
/**
 * @memberOf components.catalog.product
 */
export class Controller extends ControllerBase {
    constructor() {
        super();
        $core.commands.onAfterAffect( 'Components/Catalog/Product/Commands/Add', 'Components/Catalog/Commands/Add' );
    }
    static getNamespace() {
        return 'Components/Catalog/Component'
    }

    static getName() {
        return 'Components/Catalog/Component/Controller';
    }

    getCommands() {
        return { Add };
    }
}

export default Controller;
