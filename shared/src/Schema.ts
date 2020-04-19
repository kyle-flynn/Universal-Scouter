import {getPropertyFromJSON, Property} from './Property';

export default class Schema {

  public id: number;
  public name: string;
  public year: number;
  public competition: string;
  public description: string;
  public properties: Property[];

  public constructor() {
    this.id = -1;
    this.name = '';
    this.year = 0;
    this.competition = '';
    this.description = '';
    this.properties = [];
  }

  public toJSON(): object {
    return {
      id: this.id,
      name: this.name,
      year: this.year,
      competition: this.competition,
      description: this.description,
      properties: this.properties.map((p: Property) => p.toJSON())
    };
  }

  public fromJSON(json: any): Schema {
    try {
      const schema: Schema = new Schema();
      schema.id = json.id;
      schema.name = json.name;
      schema.year = json.year;
      schema.competition = json.competition;
      schema.description = json.description;
      if (typeof json.properties === 'string') {
        schema.properties = JSON.parse(json.properties)?.map((p: any) => getPropertyFromJSON(p));
      } else {
        schema.properties = json.properties?.map((p: any) => getPropertyFromJSON(p));
      }
      return schema;
    } catch (e) {
      throw new Error(e);
    }
  }

}