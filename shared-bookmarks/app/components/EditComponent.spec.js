jest.unmock('./EditComponent');

import React from 'react';
import { shallow, mount } from 'enzyme';

import EditComponent from './EditComponent';
import customStyle from './editComponent.css';

function setup() {
    const props = {
        selectedBookmark: {},
        handleSubmit: () => {},
        clearField:() => {},
    };

    const wrapper = shallow(<EditComponent {...props}/>);

    return {
        props,
        wrapper
    }
}

describe( 'EditComponent page tests', () => {
    // const wrapper = setup();
    const {wrapper} = setup();

    it('wrapper type should be DIV', () => {
        expect(wrapper.type()).toBe('div');
    });

    fit('check for method handleChange', () => {

        // console.log('wrapper.instance().handleChange', wrapper.instance().handleChange);
        expect(wrapper.instance().handleChange).toBeDefined();
    });
});