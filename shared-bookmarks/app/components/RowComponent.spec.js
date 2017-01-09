import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import RowComponent from './RowComponent';

function setup() {

    const props = {
        bookmark: {},
        onEdit: () => {},
        onDelete: () => {}
    };

    return shallow(<RowComponent {...props}/>);
}

describe('RowComponent item', () => {
  const wrapper = setup();

  it('should be a tr item', () => {
    expect(wrapper.type()).toBe('tr');
  });
});