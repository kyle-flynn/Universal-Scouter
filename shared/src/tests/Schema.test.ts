import {NumberProperty, Schema, StringProperty} from '../';

describe('Schema', () => {
  it('should give correct JSON', () => {
    const schema: Schema = new Schema();
    schema.id = 12;
    schema.name = 'test schema';
    schema.year = 2020;
    schema.competition = 'c';
    schema.description = 'desc';
    schema.properties = [new StringProperty('some string'), new NumberProperty('some number')];
    expect(schema.toJSON()).toEqual({id: 12, name: 'test schema', year: 2020, competition: 'c', description: 'desc', properties: [{name: 'some string', type: 'string', defaultValue: ''}, {name: 'some number', type: 'number', defaultValue: 0, min: 0, max: 9999}]});
  });
  it('should convert from JSON', () => {
    const schemaJSON: object = {id: 12, name: 'test schema', year: 2020, competition: 'c', description: 'desc', properties: [{name: 'some string', type: 'string', defaultValue: ''}, {name: 'some number', type: 'number', defaultValue: 0, min: 0, max: 9999}]};
    expect(new Schema().fromJSON(schemaJSON)).toEqual(schemaJSON);
  });
  it('should throw error', () => {
    const schemaJSON: object = {properties: false};
    expect(() => {
      new Schema().fromJSON(schemaJSON);
    }).toThrow();
  });
});