import Core from "./base/core";
import Command from "./commands/command";
import Controller from "./controllers/controller";
import CommandAlreadyRegistered from "./commands/errors/command-already-registered";

interface CommandsClass {
    new (args: {}, options: {}): Command;

    getName: () => string,
    getNamespace:() => string,
}

interface InternalHookInterface {
    [key: string]: Array<String>
}

export class Commands extends Core {
    public Command = Command;

    static commands: { [args: string]: ( CommandsClass ) } = {};

	/**
	 * TODO: Change name.
	 *
	 * Internal hooks.
	 */
	static onHooks: InternalHookInterface = {};

	static run( command:string, args: { result: any }, options  = {} ) {
		const commandConstructor = this.commands[ command ];

		let result = new commandConstructor( args, options ).run();

		if ( this.onHooks[ commandConstructor.getName() ] ) {
			this.onHooks[ commandConstructor.getName() ].forEach( ( command ) => {
				// @ts-ignore
                const Command = this.commands[ command ];

				args.result = result;

				result = new Command( args, options ).run();
			} );
		}
	}

	static register( commands: Array<Command>, controller: Controller ) {
		commands = Object.values( commands );

		Object.values( commands ).forEach( ( command ) => {
			// @ts-ignore
            if ( this.commands[ command.getName() ] ) {
				throw new CommandAlreadyRegistered( command );
			}

			// Register.
			command.controller = controller;

			// @ts-ignore
            this.commands[ command.getName() ] = command;
		} );
	}

	/**
	 * @TODO Change method to 'onAfter'.
	 */
	static on( hookCommand:string, affectCommand:string ) {
		if ( ! this.onHooks[ hookCommand ] ) {
			this.onHooks[ hookCommand ] = [];
		}

		this.onHooks[ hookCommand ].push( affectCommand );
	}

	public run( command:string, args: { result: any }, options  = Object ) {
	   return Commands.run( command, args, options  );
    }
}
