import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import constants from './constants';

//for drag
const snackDragSpec = {
    beginDrag(props) {
        return {
            name: props.name,
            id: props.id
        };
    },

    endDrag(props, monitor) {
        const dragItem = monitor.getItem();
        const dropResult = monitor.getDropResult();
        if ( dropResult.name) {
            props.snackCallbacks.updateContainer(dragItem.id, dropResult.name);
            console.log(`You dropped ${dragItem.name} and into ${dropResult.name}`);
        }
    }
};
let collectDrag = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

//for drop
const snackDropSpec = {
    hover(props, monitor) {
        const draggedId = monitor.getItem().id;

        props.snackCallbacks.updatePosition(draggedId, props.id);
    }
}
let collectDrop = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
    };
}

class Snack extends Component {
    render() {
        const { name, isDragging, connectDragSource, connectDropTarget } = this.props;
        const opacity = isDragging ? 0.4 : 1;

        const style = {
            opacity: 1
        };

        return (
            connectDropTarget(connectDragSource(
                <div className='snack' style={style}>
                    {name}
                </div>
            )
        ))
    }
}

Snack.propTypes = {
    name: PropTypes.string.isRequired,
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
};

// export default DragSource(constants.SNACK, snackSpec, collect)(Snack);

const dragHighOrderCard = DragSource(constants.SNACK, snackDragSpec, collectDrag)(Snack);
const dragDropHighOrderCard = DropTarget(constants.SNACK, snackDropSpec, collectDrop)(dragHighOrderCard);
export default dragDropHighOrderCard;