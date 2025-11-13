export interface ResponseApi<T> {
  data: T;
  message: string;
  statusCode: number;
}