export default class Remove extends $core.commands.Command {
	static getNamespace() {
		return 'Components/Cart/Commands'
	}

	static getName() {
		return 'Components/Cart/Commands/Remove';
	}

	apply( args = this.args, options = this.options ) {
		debugger;
		this.logger.startWith( { component: args.component } );

		const { component } = args,
			{ id } = component;

		component.options.parentComponent.options.cart.removeItem( ( data ) => {
			if ( ! data.error ) {
				const item = component.options.parentComponent.getItemKeyById( id );

				if ( item ) {
					// TODO: Change to model. model.doRemoveItem
					component.options.parentComponent.doRemoveItem( item, true );
				} else {
					alert( `${this.constructor.name}::removeItem() -> item with id: '${id}' not found in cart.` );
				}
			} else {
				alert( data.message );
			}
		}, id );
	}

	// onItemRemove( item ) {
	// 	this.logger.startWith( { e: item } );
	//
	// 	const itemId = item.id;
	//
	// 	this.apiCart.removeItem( ( data ) => {
	// 		if ( ! data.error ) {
	// 			const item = this.getItemKeyById( itemId );
	//
	// 			if ( item ) {
	// 				this.doRemoveItem( item, true );
	// 			} else {
	// 				alert( `${this.constructor.name}::removeItem() -> item with id: '${item.id}' not found in cart.` );
	// 			}
	//
	// 		} else {
	// 			alert( data.message );
	// 		}
	// 	}, itemId );
	// }
}
