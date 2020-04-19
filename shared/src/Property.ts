export class Property {
  public type: string;
  public name: string;

  public constructor(type: string, name: string) {
    this.type = type;
    this.name = name;
  }

  public getJSONName(): string {
    if (this.name && this.name.length > 0) {
      return this.name.toLowerCase().replace(/ /g, '_');
    } else {
      return '';
    }
  }

  public toJSON(): object {
    return {
      name: this.name,
      type: this.type
    };
  }

  public fromJSON(json: any): Property {
    return new Property(json.type, json.name);
  }
}

export class StringProperty extends Property {

  public defaultValue: string;

  public constructor(name: string) {
    super('string', name);

    this.defaultValue = '';
  }

  public toJSON(): object {
    return {
      ...super.toJSON(),
      defaultValue: this.defaultValue
    };
  }

  public fromJSON(json: any): StringProperty {
    const property: StringProperty = new StringProperty(json.name);
    property.defaultValue = json.defaultValue;
    return property;
  }
}

export class NumberProperty extends Property {

  public defaultValue: number;
  public min: number;
  public max: number;

  public constructor(name: string) {
    super('number', name);

    this.defaultValue = 0;
    this.min = 0;
    this.max = 9999;
  }

  public toJSON(): object {
    return {
      ...super.toJSON(),
      defaultValue: this.defaultValue,
      min: this.min,
      max: this.max
    };
  }

  public fromJSON(json: any): NumberProperty {
    const property: NumberProperty = new NumberProperty(json.name);
    property.defaultValue = json.defaultValue;
    property.min = json.min;
    property.max = json.max;
    return property;
  }
}

export class BooleanProperty extends Property {

  public defaultValue: boolean;

  public constructor(name: string) {
    super('boolean', name);

    this.defaultValue = false;
  }

  public toJSON(): object {
    return {
      ...super.toJSON(),
      defaultValue: this.defaultValue,
    };
  }

  public fromJSON(json: any): BooleanProperty {
    const property: BooleanProperty = new BooleanProperty(json.name);
    property.defaultValue = json.defaultValue;
    return property;
  }
}

export class DropdownProperty extends Property {

  public defaultValue: string;
  public options: string[];

  public constructor(name: string) {
    super('dropdown', name);

    this.defaultValue = '';
    this.options = [];
  }

  public toJSON(): object {
    return {
      ...super.toJSON(),
      defaultValue: this.defaultValue,
      options: this.options.toString()
    };
  }

  public fromJSON(json: any): DropdownProperty {
    const property: DropdownProperty = new DropdownProperty(json.name);
    property.defaultValue = json.defaultValue;
    property.options = json.options.split(',');
    return property;
  }
}

export function getPropertyFromJSON(json: any): Property {
  switch (json.type) {
    case 'string':
      return new StringProperty(json.type).fromJSON(json);
    case 'number':
      return new NumberProperty(json.type).fromJSON(json);
    case 'boolean':
      return new BooleanProperty(json.type).fromJSON(json);
    case 'dropdown':
      return new DropdownProperty(json.type).fromJSON(json);
    default:
      return new StringProperty(json.type).fromJSON(json);
  }
}