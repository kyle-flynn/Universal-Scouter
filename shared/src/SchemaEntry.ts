export default class SchemaEntry {

  public entryId: string;
  public match: string;
  public properties: object;

  public constructor() {
    this.entryId = '';
    this.match = '';
    this.properties = {};
  }

  public toJSON(): object {
    return {
      entry_id: this.entryId,
      match: this.match,
      properties: this.properties
    };
  }

  public fromJSON(json: any): SchemaEntry {
    const entry: SchemaEntry = new SchemaEntry();
    entry.entryId = json.entry_id;
    entry.match = json.match;
    entry.properties = json.properties;
    return entry;
  }

  public static getNormalizedName(name: string): string {
    if (name && name.length > 0) {
      const str: string[] = name.split('_');
      return str.map((s) => s.charAt(0).toUpperCase() + s.substring(1)).toString().replace(/,/g, ' ');
    } else {
      return '';
    }
  }

}