import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Regions} from "../../core/configurations/regions";
import {StorageService} from "../../core/services/storage.service";
import {Subscription} from "rxjs";

declare var ymaps:any;

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html',
  styleUrls: ['../shop.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShopViewComponent implements OnInit, OnDestroy {

  public map: any;
  public totalShops: any[] = [];
  public region: any;
  public allRegions: any;
  public currentRegionShops: any;
  public regionPoints: any;
  private _subscriptions = new Subscription();

  constructor(
    private regions: Regions,
    private storageService: StorageService
  ) {
    this.totalShops = regions.regions;
    this.allRegions = regions.regions.length;
    this.regionPoints = regions.points
  }

  ngOnInit(): void {
    this._subscriptions.add(
      this.storageService.region$.subscribe({
      next: (region) => {
        this.region = region;
      }
      })
    );
    this.currentRegionShops = this.regionPoints.filter((item: any) => item.region == this.region.name);

    ymaps.ready().then(() => {
      this.map = new ymaps.Map('map', {
        center: this.region.coords,
        zoom: 10,
        controls: []
      });

      let coordinates = this.regions.points;
      coordinates.forEach((item: any) => {
        let circlePlacemark = new ymaps.Placemark(
          item.coords, {
            balloonContentBody: [
              '<div class="balloon">' +
              '<p class="balloonTitle">' + item.about.title + '</p>' +
              item.about.address +
              '<hr><b>Время работы</b><br><div>Торговый зал:<span>' +
              (item.about.openTime[0] + ' - ' + item.about.openTime[1]) +
              '</span></div><hr><b>Покупателям</b><br><div>Магазин:<span>' +
              (item.about.phone) +
              '</span></div><hr><b>Бизнес-клиентам</b><br><div>Магазин:<span>' +
              (item.about.email) +
              '</span></div>' +
              '<a href="shop/' + item.about.url + '">Подробнее о магазине</a>' +
              '</div>'
            ]
          }, {
            preset: 'islands#darkGreenCircleDotIcon'
          }
        );
        this.map.geoObjects.add(circlePlacemark);

        circlePlacemark.events
          .add('mouseenter', function (e: any) {
            e.get('target').options.set('preset', 'islands#redCircleDotIcon');
          })
          .add('mouseleave', function (e: any) {
            e.get('target').options.set('preset', 'islands#darkGreenCircleDotIcon');
          })
          .add('click', function (e: any) {
            e.get('target').options.set('preset', 'islands#darkGreenCircleDotIcon');
          });
      });
    });
  }

  public declOfNum(number: number, words: any) {
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

}
