export interface ElasticRequest {
  [key: string]: any
  query?: any,
  aggs?: any
}

export interface Filter {
  bool: {
    filter: any[];
  }
}
