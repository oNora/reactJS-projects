jest.unmock('./RowComponent');

import React from 'react';
import { shallow, mount } from 'enzyme';

import RowComponent from './RowComponent';

function setup() {
    const props = {
        bookmark: {}
    };

    return shallow(<RowComponent {...props}/>);
}

describe( 'RowComponent page tests', () => {
    const wrapper = setup();

    it('renders correctly', () => {
         expect(wrapper).toMatchSnapshot();
    });

    it('wrapper type should be tr', () => {
        expect(wrapper.type()).toBe('tr');
    });

    it('button elements should be 2', () => {
        expect( wrapper.find( "button" ).length ).toEqual( 2 );
    });
});