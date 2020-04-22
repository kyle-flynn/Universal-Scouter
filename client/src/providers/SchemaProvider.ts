import {default as Axios, AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError} from "axios";
import {Schema, SchemaEntry} from 'universal-scouter-shared';

export interface ISchemasResponse {
  schemas: Schema[];
  error: AxiosError | undefined;
}

export interface ISchemaResponse {
  schema: Schema | undefined;
  error: AxiosError | undefined;
}

export interface ISchemaEntriesResponse {
  entries: SchemaEntry[];
  error: AxiosError | undefined;
}

export interface ISchemaEntryResponse {
  entry: SchemaEntry | undefined;
  error: AxiosError | undefined;
}

class SchemaProvider {
  private static instance: SchemaProvider;
  // @ts-ignore
  private axios: AxiosInstance;
  // @ts-ignore
  private config: AxiosRequestConfig;

  public static getInstance(): SchemaProvider {
    if (typeof SchemaProvider.instance === "undefined") {
      SchemaProvider.instance = new SchemaProvider();
    }
    return SchemaProvider.instance;
  }

  private constructor() {}

  public initialize(host: string, port: number): void {
    this.config = {
      baseURL: `http://${host}:${port}/api`
    };
    this.axios = Axios.create(this.config);
  }

  public async getSchemas(): Promise<ISchemasResponse> {
    try {
      const res: AxiosResponse = await this.axios.get("/schemas");
      const schemas: Schema[] = (res.data.response as any[]).map((s: any) => new Schema().fromJSON(s));
      return {schemas, error: undefined};
    } catch (reason) {
      return {schemas: [], error: reason};
    }
  }

  public async getSchema(id: number): Promise<ISchemaResponse> {
    try {
      const res: AxiosResponse = await this.axios.get(`/schemas/${id}`);
      const schema: Schema = new Schema().fromJSON(res.data.response);
      return {schema, error: undefined};
    } catch (reason) {
      return {schema: undefined, error: reason};
    }
  }

  public async postSchema(schema: Schema): Promise<ISchemasResponse> {
    try {
      const res: AxiosResponse = await this.axios.post("/schemas", schema.toJSON());
      const schemas: Schema[] = (res.data.response as any[]).map((s: any) => new Schema().fromJSON(s));
      return {schemas, error: undefined};
    } catch (reason) {
      return {schemas: [], error: reason};
    }
  }

  public async putSchema(schema: Schema): Promise<ISchemasResponse> {
    try {
      const res: AxiosResponse = await this.axios.put(`/schemas/${schema.id}`, schema.toJSON());
      const schemas: Schema[] = (res.data.response as any[]).map((s: any) => new Schema().fromJSON(s));
      return {schemas, error: undefined};
    } catch (reason) {
      return {schemas: [], error: reason};
    }
  }

  public async deleteSchema(id: number): Promise<ISchemasResponse> {
    try {
      const res: AxiosResponse = await this.axios.delete(`/schemas/${id}`);
      const schemas: Schema[] = (res.data.response as any[]).map((s: any) => new Schema().fromJSON(s));
      return {schemas, error: undefined};
    } catch (reason) {
      return {schemas: [], error: reason};
    }
  }

  public async getAllEntries(schemaId: string): Promise<ISchemaEntriesResponse> {
    try {
      const res: AxiosResponse = await this.axios.get(`/entries/all/${schemaId}`);
      const entries: SchemaEntry[] = (res.data.response as any[]).map((e: any) => new SchemaEntry().fromJSON(e));
      return {entries, error: undefined};
    } catch (reason) {
      return {entries: [], error: reason};
    }
  }

  public async getEntry(entryId: string): Promise<ISchemaEntryResponse> {
    try {
      const res: AxiosResponse = await this.axios.get(`/entries/${entryId}`);
      const entry: SchemaEntry = new SchemaEntry().fromJSON(res.data.response);
      return {entry, error: undefined};
    } catch (reason) {
      return {entry: undefined, error: reason};
    }
  }

  public async postEntry(entry: SchemaEntry): Promise<ISchemaEntriesResponse> {
    try {
      const id: string = entry.entryId.split('-')[0];
      const res: AxiosResponse = await this.axios.post(`/entries/${id}`, entry.toJSON());
      const entries: SchemaEntry[] = (res.data.response as any[]).map((e: any) => new SchemaEntry().fromJSON(e));
      return {entries, error: undefined};
    } catch (reason) {
      return {entries: [], error: reason};
    }
  }

  public async putEntry(entry: SchemaEntry): Promise<ISchemaEntriesResponse> {
    try {
      const id: string = entry.entryId.split('-')[0];
      const res: AxiosResponse = await this.axios.put(`/entries/${id}`, entry.toJSON());
      const entries: SchemaEntry[] = (res.data.response as any[]).map((e: any) => new SchemaEntry().fromJSON(e));
      return {entries, error: undefined};
    } catch (reason) {
      return {entries: [], error: reason};
    }
  }

  public async deleteAllEntries(schemaId: string): Promise<ISchemaEntriesResponse> {
    try {
      const res: AxiosResponse = await this.axios.delete(`/entries/all/${schemaId}`);
      const entries: SchemaEntry[] = (res.data.response as any[]).map((s: any) => new SchemaEntry().fromJSON(s));
      return {entries, error: undefined};
    } catch (reason) {
      return {entries: [], error: reason};
    }
  }

  public async deleteEntry(entryId: string): Promise<ISchemaEntriesResponse> {
    try {
      const res: AxiosResponse = await this.axios.delete(`/entries/${entryId}`);
      const entries: SchemaEntry[] = (res.data.response as any[]).map((s: any) => new SchemaEntry().fromJSON(s));
      return {entries, error: undefined};
    } catch (reason) {
      return {entries: [], error: reason};
    }
  }
}

export default SchemaProvider.getInstance();