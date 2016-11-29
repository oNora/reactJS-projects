import React, {Component} from 'react'
import config from './config.json';

import rabbitsGif from '../../images/rabbits.gif';

class Greeter extends Component {
    render() {
        return (
            <div>
                <div className='root'>
                    {config.greetText}
                </div>
                <br />
                <span className='setFont'> and differed font</span>
                <br />
                <br />
                <div>
                    <p>bootstrap elements: </p>
                    <span className='glyphicon glyphicon-heart'></span>
                    <br />
                    <button type="button" className="btn btn-default" aria-label="Left Align">
                        <span className="glyphicon glyphicon-align-left" aria-hidden="true"></span>
                    </button>
                    <br />
                    <button type="button" className="btn btn-default btn-lg">
                        <span className="glyphicon glyphicon-star" aria-hidden="true"></span> Star
                    </button>
                </div>
                <br />
                <p className='img'></p>
                <br />
                <img src={rabbitsGif} alt="" />
            </div>
        );
    }
}
export default Greeter