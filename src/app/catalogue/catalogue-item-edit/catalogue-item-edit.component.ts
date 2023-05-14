import {AfterContentInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ElasticRequest} from "../../core/models/elastic.request";
import {Subscription} from "rxjs";
import {ElasticResponse} from "../../core/models/elastic.response";
import {ElasticsearchRequestBuilder} from "../../core/services/elasticsearch.request.builder";
import {GoodsService} from "../../core/services/goods.service";
import {SessionStorageService} from "../../core/services/session.storage.service";
import {FormControl, FormGroup} from "@angular/forms";
import {CategoryService} from "../../core/services/category.service";
import {CategoryOptionsService} from "../../core/services/categoryOptions.service";

@Component({
  selector: 'app-catalogue-item-catalogue-edit',
  templateUrl: './catalogue-item-edit.component.html',
  styleUrls: ['./catalogue-item-edit.component.css']
})
export class CatalogueItemEditComponent implements OnInit, AfterContentInit {

  public form: any;
  public catalog: any;

  public catalogOptions: any;
  // public catalogOptions: CatalogOption[] = [];
  public hits: any;
  public goodData: any;
  // private aggregations: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private goodsService: GoodsService,
    private sessionStorageService: SessionStorageService,
    // private commonService: CommonService,
    // private classifierService: ClassifierService
    private categoryService: CategoryService,
    private categoryOptionsService: CategoryOptionsService,
    private router: Router
  ) {

    this.sessionStorageService.catalog$.subscribe( {
      next: (data: any) => {
        this.catalog = data;
        console.log(data)
      }
    })
    this.sessionStorageService.catalogOptions$.subscribe( {
      next: (data: any) => {
        this.catalogOptions = data;

        console.log('catalogOptions', data)
      }
    });
    const tmp: Record<any, any> = {};
    this.catalogOptions.forEach((item: any) => {
      tmp[item.name] = new FormControl('');
    });

    this.form = new FormGroup(tmp);
    console.log('controls1', this.form.controls);
  }

  ngOnInit(): void {

    const tmp: Record<any, any> = {};
    this.catalogOptions.forEach((item: any) => {
      tmp[item.name] = new FormControl('');
    });

    this.form = new FormGroup(tmp);
    console.log('controls2', this.form.controls);

    console.log(this.activatedRoute.snapshot.paramMap.get('id'));
    const itemId: string | null = this.activatedRoute.snapshot.paramMap.get('id');
    const elasticsearchRequestBuilder: ElasticsearchRequestBuilder = new ElasticsearchRequestBuilder();
    const query: any = {
      bool: {
        must: {
          term: {
            _id: itemId
          }
        }
      }
    }
    elasticsearchRequestBuilder.addQuery(query);
    const elasticRequest: ElasticRequest = elasticsearchRequestBuilder.build();
    this.initCatalogItemData(elasticRequest);



  }


  private initCatalogItemData(elasticsearchRequest: ElasticRequest): void {
    const sub: Subscription = this.goodsService.findAll(elasticsearchRequest).subscribe({
      next: (elasticsearchResponse: ElasticResponse) => {
        this.hits =  elasticsearchResponse.hits?.hits;
        console.log('hits: ', this.hits)
        console.log('goods: ', this.hits[0]["_source"]["good_data"])
        this.goodData = this.hits[0]["_source"]["good_data"];
        Object.keys(this.goodData).forEach((key: string) => {
          // console.log('before controls', this.form.controls[key]);
          this.form.removeControl(key);
          if(this.goodData[key] instanceof Object)
            this.form.addControl(key, new FormControl(String(this.goodData[key]["id"])));
          else
            this.form.addControl(key, new FormControl(String(this.goodData[key])));
          // console.log('after controls', this.form.controls[key]);
        })
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        sub.unsubscribe();
      }
    });
  }
  public submitForm(): void {
    console.log('form; ', this.form.value)
  }
  public returnBack(): void {
    this.router.navigate(['catalogue/' + this.activatedRoute.snapshot.paramMap.get('catalogName')]).then()
  }

  ngAfterContentInit(): void {
    console.log('dfdf', this.catalogOptions)
  }
}
