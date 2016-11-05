import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'react-addons-update';

import ShoppingCart from './ShoppingCart';

class Container extends Component {
    constructor() {
        super();

        this.state = {
            snacks: [
            {id: 1,  name: 'Chips', container: 'store'},
            {id: 2,  name: 'Cupcake', container: 'store'},
            {id: 3,  name: 'Donut', container: 'store'},
            {id: 4,  name: 'Doritos', container: 'store'},
            {id: 5,  name: 'Popcorn', container: 'store'}
            ]
        }

        this.updateSnackPosition = this.updateSnackPosition.bind(this);
        this.updateSnackContainer = this.updateSnackContainer.bind(this);
    }
     updateSnackContainer(snackId, listId) {

         let snackIndex = this.state.snacks.findIndex((snack) => snack.id == snackId);
         let snack = this.state.snacks[snackIndex];

         if (snack.status !== listId) {
             // set the component state to the mutated object
             this.setState(update(this.state, {
                 snacks: {
                     [snackIndex]: {
                         container: {
                             $set: listId
                         }
                     }
                 }
             }));
            }

     }
    updateSnackPosition(snackId, afterId) {

        // Only proceed if hovering over a different snack
        if (snackId !== afterId) {
        // Find the index of the snack
        let snackIndex = this.state.snacks.findIndex((snack) => snack.id == snackId);
        // Get the current snack
        let snack = this.state.snacks[snackIndex]
            // Find the index of the snack the user is hovering over
        let afterIndex = this.state.snacks.findIndex((snack) => snack.id == afterId);
        // Use splice to remove the snack and reinsert it a the new index
        this.setState(update(this.state, {
            snacks: {
            $splice: [
                [snackIndex, 1],
                [afterIndex, 0, snack]
            ]
            }
        }));
        }
    }
    render() {

        return (
            <div>
                <ShoppingCart dropZone='false' id='store' 
                                snacks={this.state.snacks.filter((snack) => snack.container === "store")} 
                                snackCallbacks={{
                                   updateContainer: this.updateSnackContainer,
                                   updatePosition: this.updateSnackPosition
                                }}/>
                <ShoppingCart dropZone='true' id='shoppingCart' 
                                snacks={this.state.snacks.filter((snack) => snack.container === "shoppingCart")} 
                                snackCallbacks={{
                                    updateContainer: this.updateSnackContainer,
                                    updatePosition: this.updateSnackPosition
                                }}/>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(Container);