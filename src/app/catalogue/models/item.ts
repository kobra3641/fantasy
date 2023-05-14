import {Hit} from "../../core/models/elastic.response";

export interface Item {
  count: number,
  goods: Hit[]
}
