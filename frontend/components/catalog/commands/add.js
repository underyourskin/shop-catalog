export default class Add extends $core.commands.Command {
    static getNamespace() {
        return 'Components/Catalog/Component/Commands'
    }

    static getName() {
        return 'Components/Catalog/Commands/Add';
    }

    apply( args = this.args, options = this.options ) {
        const { component } = args,
            id = parseInt( component.id ),
            amount = parseInt(component.getAmount() );


        // $api.run( 'catalog/getLocalProductById', { id } );
        let product = component.apis.catalog.getLocalProductById( id );

        // Assign `id` and `amount`.
        product = Object.assign( {}, product, { id, amount } );

        // Put it back to 1.
        component.setAmount( 1 );

        component.events.onProductAdd( component );
    }

}
