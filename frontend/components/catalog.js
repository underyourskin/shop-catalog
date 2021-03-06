/**
 * @file: components/catalog.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: Manages catalog
 */
import * as services from 'SERVICES';
import { Component, Logger } from 'MODULES';

import Pagination from './catalog/pagination';
import Product from './catalog/product';
import Spinner from './catalog/spinner';

/**
 * @memberOf components
 */
export class Catalog extends Component {
    static amountMaxValue = 999;
    static amountMinValue = 1;

    /**
     * Current page number.
     * @type {number}
     */
    page = 0;

    /**
     * Loaded products to be rendered.
     * @type {Array.<components.Product>}
     */
    products = [];

    constructor( parent, options ) {
        super( parent, options );

        this.logger = new Logger( Catalog.getName(), true );
        this.logger.setOutputHandler( services.Terminal.onOutput );
        this.logger.startWith( { options } );

        this.apis = {
            catalog: options.api,
        };

        this.events = {
            onRecvOnce: () => {},
            onProductAdd: ( product ) => {},
        };

        this.components = {
            pagination: new Pagination( this.view.element ),
        };

        // After render.
        this.afterRender = () => {
            super.afterRender();

            this.elements = {
                row: this.view.element.children[ 0 ],
            };

            this.components.spinner = new Spinner( this.elements.row );

            this.getProducts( 0, this.onRecvOnce.bind( this ) );
        }
    }

    static getNamespace() {
        return 'Components'
    }

    static getName() {
        return 'Components/Catalog';
    }

    /**
     * Function onPageChange() : Called on page change.
     *
     * @param {number} page
     */
    onPageChange( page ) {
        this.logger.startWith( { page } );

        const { spinner } = this.components;

        // Remove all products.
        this.products.forEach( ( product ) =>
            product.remove()
        );

        // Show spinner.
        spinner.show();

        this.getProducts( page - 1, () => {
            this.renderProducts();
        } );
    }

    /**
     * Function onProductAdd() : Called on "Add to cart button".
     *
     * @param {Product} product
     */
    onProductAdd( product ) {
        this.logger.startWith( { product } );

        // Call callback.
        this.events.onProductAdd( product );
    }

    /**
     * Function onProductAmountChange() : Called on "Product Amount Change".
     *
     * Function override amount ( Used as filter ).
     *
     * @param {components.Product} product
     * @param {number} amount
     */
    onProductAmountChange( product, amount ) {
        this.logger.startWith( { amount } );

        if ( amount > Catalog.amountMaxValue ) {
            amount = Catalog.amountMaxValue;
        } else if ( amount < Catalog.amountMinValue ) {
            amount = Catalog.amountMinValue;
        }

        product.setAmount( amount );
    }

    /**
     * Function addProduct() : Add's a product.
     *
     * Function Create product component and push it `this.products`.
     *
     * @param {Product} product
     *
     * @returns {Product}
     */
    addProduct( product ) {
        const productComponent = new Product( this.elements.row, {
                api: {
                    catalog: this.apis.catalog,
                },
                ... product,
            } );

        productComponent.on( 'product:add', this.onProductAdd.bind( this ) );
        productComponent.on( 'product:change', this.onProductAmountChange.bind( this ) );

        this.products.push( productComponent );

        return productComponent;
    }

    /**
     * Function getProducts() : Get products from catalog endpoint.
     *
     * @param {number} page
     * @param {{function()}} onSuccess
     */
    getProducts( page, onSuccess ) {
        this.logger.startWith( { page, onSuccess } );

        const { spinner } = this.components;

        this.apis.catalog.get( data => {
            // Clear old products.
            this.products = [];

            // Used '1000' ms here to fake loading.
            spinner.fadeOut( 1000, () => {
                if ( !data.error ) {
                    this.components.pagination.set( data.pagination );

                    data.result.forEach( ( product ) =>
                        this.addProduct( product )
                    );

                    if ( onSuccess ) onSuccess();
                }
            } );
        }, page );
    }

    template() {
        return (`
            <div class="container" style="max-width: 1080px;">
                <div id="catalog" class="row">
                </div>
            </div>
        `);
    }

    render() {
        super.render();

        const { pagination, spinner } = this.components;

        spinner.render();

        pagination.render();
        pagination.on( 'page:change', this.onPageChange.bind( this ) );
    }

    /**
     * Function renderProducts() : Render products.
     */
    renderProducts() {
        this.products.forEach( ( product ) => {
            product.render();
        } );
    }

    /**
     * Function onRecvOnce() : Called on success of initial getCatalog request.
     */
    onRecvOnce() {
        this.renderProducts();

        this.events.onRecvOnce();
    }

    /**
     * Function on() : Declare event callback.
     *
     * @param {'initialRecv'|'productAdd'} event
     * @param {{function()}} callback
     */
    on( event, callback ) {
        this.logger.startWith( { event, callback } );

        switch ( event ) {
            case 'initialRecv': {
                this.events.onRecvOnce = callback;
            }
            break;

            case 'productAdd': {
                this.events.onProductAdd = callback;
            }
            break;

            default: {
                alert( `${this.constructor.name}::on() -> invalid event type: '${event}'` );
            }
        }
    }
}

export default Catalog;
