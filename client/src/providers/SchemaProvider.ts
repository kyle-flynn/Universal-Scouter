import {default as Axios, AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError} from "axios";
import {Schema} from "universal-scouter-shared";

export interface ISchemasResponse {
  schemas: Schema[];
  error: AxiosError | undefined;
}

export interface ISchemaResponse {
  schema: Schema | undefined;
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
      console.log(res);
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
}

export default SchemaProvider.getInstance();