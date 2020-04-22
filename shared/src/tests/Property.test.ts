import {
  BooleanProperty,
  DropdownProperty,
  getPropertyFromJSON,
  NumberProperty,
  Property,
  StringProperty
} from '../';

describe('Property', () => {
  it('should give correct JSON', () => {
    const prop: Property = new Property('test', 'Test Property');
    expect(prop.toJSON()).toEqual({name: 'Test Property', type: 'test'});
  });
  it('should convert from JSON', () => {
    const propJSON: object = {name: 'Test Property', type: 'test'};
    expect(new Property('test', 'Test Property').fromJSON(propJSON).toJSON()).toEqual(propJSON);
  });
  it('should return JSON name', () => {
    const prop: Property = new Property('test', 'Test Property');
    expect(prop.getJSONName()).toEqual('test_property');
    prop.name = 'one_two_three';
    expect(prop.getJSONName()).toEqual('one_two_three');
    prop.name = 'I AM BULLETPROOF';
    expect(prop.getJSONName()).toEqual('i_am_bulletproof');
    prop.name = 'property';
    expect(prop.getJSONName()).toEqual('property');
  });
});

describe('StringProperty', () => {
  it('should give correct JSON', () => {
    const prop: StringProperty = new StringProperty('Test Property');
    prop.defaultValue = 'default';
    expect(prop.toJSON()).toEqual({name: 'Test Property', type: 'string', defaultValue: 'default'});
  });
  it('should convert from JSON', () => {
    const propJSON: object = {name: 'Test Property', type: 'string', defaultValue: 'default'};
    expect(new StringProperty('Test Property').fromJSON(propJSON).toJSON()).toEqual(propJSON);
  });
});

describe('NumberProperty', () => {
  it('should give correct JSON', () => {
    const prop: NumberProperty = new NumberProperty('Test Property');
    prop.defaultValue = 12;
    prop.min = -1;
    prop.max = 120;
    expect(prop.toJSON()).toEqual({name: 'Test Property', type: 'number', defaultValue: 12, min: -1, max: 120});
  });
  it('should convert from JSON', () => {
    const propJSON: object = {name: 'Test Property', type: 'number', defaultValue: 12, min: -1, max: 120};
    expect(new NumberProperty('Test Property').fromJSON(propJSON).toJSON()).toEqual(propJSON);
  });
});

describe('BooleanProperty', () => {
  it('should give correct JSON', () => {
    const prop: BooleanProperty = new BooleanProperty('Test Property');
    prop.defaultValue = true;
    expect(prop.toJSON()).toEqual({name: 'Test Property', type: 'boolean', defaultValue: true});
  });
  it('should convert from JSON', () => {
    const propJSON: object = {name: 'Test Property', type: 'boolean', defaultValue: true};
    expect(new BooleanProperty('Test Property').fromJSON(propJSON).toJSON()).toEqual(propJSON);
  });
});

describe('DropdownProperty', () => {
  it('should give correct JSON', () => {
    const prop: DropdownProperty = new DropdownProperty('Test Property');
    prop.options = ['default', 'one', 'two', 'three'];
    prop.defaultValue = 'default';
    expect(prop.toJSON()).toEqual({name: 'Test Property', type: 'dropdown', defaultValue: 'default', options: 'default,one,two,three'});
  });
  it('should convert from JSON', () => {
    const propJSON: object = {name: 'Test Property', type: 'dropdown', defaultValue: 'default', options: 'default,one,two,three'};
    expect(new DropdownProperty('Test Property').fromJSON(propJSON).toJSON()).toEqual(propJSON);
  });
});

describe('getPropertyFromJSON()', () => {
  it('should return StringProperty', () => {
    const propJSON: object = {name: 'Test Property', type: 'string', defaultValue: 'default'};
    const prop: Property = getPropertyFromJSON(propJSON);
    expect(prop instanceof StringProperty).toBe(true);
  });
  it('should return NumberProperty', () => {
    const propJSON: object = {name: 'Test Property', type: 'number', defaultValue: 12, min: -1, max: 120};
    const prop: Property = getPropertyFromJSON(propJSON);
    expect(prop instanceof NumberProperty).toBe(true);
  });
  it('should return BooleanProperty', () => {
    const propJSON: object = {name: 'Test Property', type: 'boolean', defaultValue: true};
    const prop: Property = getPropertyFromJSON(propJSON);
    expect(prop instanceof BooleanProperty).toBe(true);
  });
  it('should return DropdownProperty', () => {
    const propJSON: object = {name: 'Test Property', type: 'dropdown', defaultValue: 'default', options: 'default,one,two,three'};
    const prop: Property = getPropertyFromJSON(propJSON);
    expect(prop instanceof DropdownProperty).toBe(true);
  });
  it('should return default Property (StringProperty)', () => {
    const propJSON: object = {name: 'Test Property', type: 'unknown', defaultValue: 'default'};
    const prop: Property = getPropertyFromJSON(propJSON);
    expect(prop instanceof StringProperty).toBe(true);
  });
});