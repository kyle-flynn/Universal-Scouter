import {Database as SQLiteDatabase} from 'sqlite3';
import * as path from 'path';
import {Property, Schema, SchemaEntry} from 'universal-scouter-shared';

class Database {
  private static instance: Database;
  private db: SQLiteDatabase;

  public static getInstance(): Database {
    if (typeof Database.instance === 'undefined') {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private constructor() {
    this.db = new SQLiteDatabase(path.join(__dirname, '../data/schemas.db'));
  }

  public getAllSchemas(): Promise<object[]> {
    return new Promise<object[]>((resolve, reject) => {
      this.db.all(`SELECT * FROM 'schemas';`, (err: any, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  public getSchema(id: number): Promise<object[]> {
    return new Promise<object[]>((resolve, reject) => {
      this.db.all(`SELECT * FROM 'schemas' WHERE id = ${id};`, (err: any, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  public insertSchema(schema: Schema): Promise<object[]> {
    return new Promise<object[]>((resolve, reject) => {
      const propertyJSON: any = schema.properties.map((p: Property) => p.toJSON());
      this.db.all(`INSERT INTO 'schemas' VALUES (${schema.id}, '${schema.name}', ${schema.year}, '${schema.description}', '${JSON.stringify(propertyJSON)}', '${schema.competition}');`, (err: any, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  public updateSchema(schema: Schema): Promise<object[]> {
    return new Promise<object[]>((resolve, reject) => {
      const propertyJSON: any = schema.properties.map((p: Property) => p.toJSON());
      this.db.all(`UPDATE 'schemas' SET name = '${schema.name}', year = ${schema.year}, description = '${schema.description}', properties = '${JSON.stringify(propertyJSON)}' competition = '${schema.competition}' WHERE id = ${schema.id};`, (err: any, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  public removeSchema(id: number): Promise<object[]> {
    return new Promise<object[]>((resolve, reject) => {
      this.db.all(`DELETE FROM 'schemas' WHERE id = ${id};`, (err: any, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  public createEntryTable(schema: Schema): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let data: string = '';
      for (const property of schema.properties) {
        data += `${property.getJSONName()} ${this.getPossibleDataTypes(property.type)},`;
      }
      data = data.substring(0, data.length - 1);
      this.db.all(`CREATE TABLE entry_${schema.id} (entry_id VARCHAR PRIMARY KEY NOT NULL, match VARCHAR NOT NULL, team NOT NULL, ${data});`, (err: any, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  public getEntry(entryId: string): Promise<object[]> {
    return new Promise<object[]>((resolve, reject) => {
      const id: string = entryId.split('-')[0];
      this.db.all(`SELECT * FROM entry_${id} WHERE entry_id = '${entryId}';`, (err: any, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  public getAllSchemaEntries(schemaId: string): Promise<object[]> {
    return new Promise<object[]>((resolve, reject) => {
      this.db.all(`SELECT * FROM entry_${schemaId};`, (err: any, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  public insertEntry(entry: SchemaEntry): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const id: string = entry.entryId.split('-')[0];
      const values: string[] = [];
      for (const property in entry.properties) {
        if (entry.properties.hasOwnProperty(property)) {
          const value = (entry.properties as any)[property];
          if (typeof value === 'string') {
            values.push(`'${value}'`);
          } else {
            values.push(value);
          }
        }
      }
      this.db.all(`INSERT INTO entry_${id} VALUES ('${entry.entryId}', '${entry.match}', '${entry.team}', ${values.toString()});`, (err: any, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  public updateEntry(entry: SchemaEntry): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const id: string = entry.entryId.split('-')[0];
      const values: string[] = [];
      for (const property in entry.properties) {
        if (entry.properties.hasOwnProperty(property)) {
          let value: any = (entry.properties as any)[property];
          if (typeof value === 'string') {
            value = `'${value}'`;
          }
          values.push(`${property} = ${value}`);
        }
      }
      this.db.all(`UPDATE entry_${id} SET ${values} WHERE entry_id = '${entry.entryId}';`, (err: any, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  public deleteEntry(entryId: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const id: string = entryId.split('-')[0];
      this.db.all(`DELETE FROM entry_${id} WHERE entry_id = '${entryId}';`, (err: any, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  public deleteAllEntries(schemaId: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.db.all(`DELETE FROM entry_${schemaId};`, (err: any, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  public getPossibleDataTypes(type: string): string {
    if (type === 'string' || type === 'dropdown') {
      return 'VARCHAR';
    } else if (type === 'number') {
      return 'INT';
    } else if (type === 'boolean') {
      return 'BOOLEAN';
    } else {
      return 'VARCHAR';
    }
  }

}

export default Database.getInstance();