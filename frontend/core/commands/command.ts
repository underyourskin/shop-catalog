import CommandBase from './base';
import Controller from "../controllers/controller";

export class Command extends CommandBase {
    public controller: Controller
}

namespace core {
    namespace commands {
        export class Command extends CommandBase {

        }
    }
}

export default Command;
