import {SchemaEntry} from '../';

describe('SchemaEntry', () => {
  it('should give correct JSON', () => {
    const entry: SchemaEntry = new SchemaEntry();
    entry.entryId = '0-0';
    entry.team = '3618';
    entry.match = '12';
    entry.properties = {
      string: 'test',
      number: 12
    };
    expect(entry.toJSON()).toEqual({entry_id: '0-0', team: '3618', match: '12', properties: {string: 'test', number: 12}});
  });
  it('should convert from JSON', () => {
    const entryJSON: object = {entry_id: '0-0', team: '3618', match: '12', properties: {string: 'test', number: 12}};
    expect(new SchemaEntry().fromJSON(entryJSON).toJSON()).toEqual({entry_id: '0-0', team: '3618', match: '12', properties: {string: 'test', number: 12}});
  });
});

describe('getNormalizedName()', () => {
  it('should normalize a JSON name', () => {
    expect(SchemaEntry.getNormalizedName('some_property')).toEqual('Some Property');
    expect(SchemaEntry.getNormalizedName('property')).toEqual('Property');
    expect(SchemaEntry.getNormalizedName('i_am_bulletproof')).toEqual('I Am Bulletproof');
  });
});