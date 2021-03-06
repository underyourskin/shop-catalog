/**
 * @file: core/container.js
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @description: nope.
 * TODO:
 */
import ElementBase from './element/base.js';

/**
 * @memberOf core
 */
export class Container extends ElementBase {
    static getNamespace() {
        return 'Core'
    }

    static getName() {
        return 'Core/Container';
    }

    initialize() {
	    this.events = {
		    onAfterRender: () => {},
	    };

        super.initialize();
    }

    afterRender() {
        super.afterRender();

        if ( this.events && this.events.onAfterRender ) {
            this.events.onAfterRender( this.child );
        }
    }

    /**
     * @param {Container} child
     */
    set( child ) {
        if ( ! ( child instanceof Container ) ) {
            throw new Error();
        }

        this.child = child;
    }

    render( preventDefault ) {
        if ( ! preventDefault ) this.beforeRender();

        // Self Re-render.
        super.render( true );

        // Re-render of child.
        if ( this.child ) {
            this.child.render();
        }

        if ( ! preventDefault )  this.afterRender();
    }

    /**
     * Function on() : Declare event callback
     *
     * @param {'render:after'} event
     * @param {{function()}} callback
     */
    on( event, callback ) {
        switch ( event ) {
            case 'render:after': {
                this.events.onAfterRender = callback;
            }
            break;

            default: {
                alert( `${this.constructor.name}::on() -> invalid event type: '${event}'` );
            }
        }
    }
}

export default Container;
