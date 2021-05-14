export default class Add extends $core.commands.Command {
    static getNamespace() {
        return 'Components/Catalog/Product/Commands'
    }

    static getName() {
        return 'Components/Catalog/Product/Commands/Add';
    }

    apply( args = this.args, options = this.options ) {
        const { component } = args,
            id = parseInt( component.id ),
            amount = parseInt(component.getAmount() );


        // $api.run( 'catalog/getLocalProductById', { id } );
        let product = component.api.catalog.getLocalProductById( id );

        // Assign `id` and `amount`.
        product = Object.assign( {}, product, { id, amount } );

        // Put it back to 1.
        component.setAmount( 1 );
    }
}
