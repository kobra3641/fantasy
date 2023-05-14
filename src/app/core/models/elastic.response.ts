export interface ElasticResponse {
  _scroll_id?: string,
  _shards?: any,
  hits?: {
    total: {
      value: number
    };
    hits: Hit[]
  },
  aggregations?: any;
}

export interface Hit {
  _id: string,
  _source: {
    catalog_id: number,
    created_at: string,
    good_data: any,
    id: number,
    name: string,
    price: number,
    updated_at: string
  }
}
