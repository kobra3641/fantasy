import {ElasticRequest} from "../models/elastic.request";

export class ElasticsearchRequestBuilder {
  private _elasticsearchRequest: ElasticRequest = {};

  public addProperty(property: any, value?: any) {
    this._elasticsearchRequest[property] = value;
    return this;
  }

  public addQuery(query: any) {
    this._elasticsearchRequest.query = query;
    return this;
  }

  public addAggregation(aggregations: any) {
    this._elasticsearchRequest.aggs = aggregations;
    return this;
  }

  public addPostFilter(postFilter: any) {
    this._elasticsearchRequest['post_filter'] = postFilter;
    return this;
  }

  public build = (): ElasticRequest => { return this._elasticsearchRequest };

}
