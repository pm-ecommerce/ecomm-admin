export interface ReportResponse<T> {
  status: number;
  message: string;
  data: {
    responseData: T
  };
}
