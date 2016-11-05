import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';

import constants from './constants';
import Snack from './Snack';
const ShoppingCartSpec = {
    drop(props) {
        return { name: props.id };
    }
};

let collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
}

class ShoppingCart extends Component {
    render() {
        let textInDropZone;
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;
        let isDropZone = this.props.dropZone == 'true' ? true : false;
        
        let backgroundColor = 'transparent';
        if (isActive && isDropZone) {
            backgroundColor = '#F7F7BD';
        } else if (canDrop && isDropZone) {
            backgroundColor = '#F7F7F7';
        }
        
        const style = {
            backgroundColor: backgroundColor
        };

        var snacks = this.props.snacks.map((snack) => {
            return <Snack key={snack.id} id={snack.id} name={snack.name} 
                                snackCallbacks={this.props.snackCallbacks}/>
        });

        if (isActive) {
           textInDropZone = 'Hummmm, snack!';
        } else {
            textInDropZone = 'Drag here to order';
        }

        return connectDropTarget(
            <div className={isDropZone ? 'shopping-cart': ''} id={isDropZone ? 'shoppingCart': 'store'} style={style}>
                {snacks}
                {isDropZone ? <p> {textInDropZone }</p>: ''}
            </div>
        );
    }
}

ShoppingCart.propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
}

export default DropTarget(constants.SNACK, ShoppingCartSpec, collect)(ShoppingCart);