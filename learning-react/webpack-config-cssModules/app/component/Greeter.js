import React, {Component} from 'react'
import config from './config.json';

import styles from './Greeting.css';
import rabbitsGif from '../../images/rabbits.gif'

class Greeter extends Component {
    render() {
        return (
            <div>
                <div className={styles.root}>
                    {config.greetText}
                </div>
                <br />
                <span className={styles.setFont}> and differed font</span>
                <br />
                <br />
                <p className={styles.img}></p>
                <br />
                <img src={rabbitsGif} alt="" />
            </div>
        );
    }
}
export default Greeter