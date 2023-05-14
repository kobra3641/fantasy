import {Component, OnInit, ViewChild} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['../home.component.css']
})
export class HomeViewComponent implements OnInit {

  public banners: any = [
    {
      title: 'Модульные шкафы',
      subtitle: 'Бесплатное проектирование систем хранения',
      image: 'https://res.cloudinary.com/lmru-test/image/upload/v1/elbrus/images/catalog-popup-images/version5/hranenie.jpg',
      routerLink: ''
    },
    {
      title: 'Освещение',
      subtitle: 'жилых помещений',
      image: 'https://res.cloudinary.com/lmru-test/image/upload/v1/elbrus/images/catalog-popup-images/version5/osveshchenie-zhilyh-pomeshcheniy.jpg',
      routerLink: ''
    },
    {
      title: 'Водоснабжение',
      subtitle: 'и водоотведение',
      image: 'https://res.cloudinary.com/lmru-test/image/upload/v1/elbrus/images/catalog-popup-images/version5/vodosnabzhenie.jpg',
      routerLink: ''
    },
    {
      title: 'Декор',
      subtitle: 'Товары для интерьера по низким ценам',
      image: 'https://res.cloudinary.com/lmru-test/image/upload/v1/elbrus/images/catalog-popup-images/version5/dekor-1.jpg',
      routerLink: ''
    },
    {
      title: 'Плитка',
      subtitle: 'керамогранит и мозаика',
      image: 'https://res.cloudinary.com/lmru-test/image/upload/v1/elbrus/images/catalog-popup-images/version5/plitka.jpg',
      routerLink: ''
    },
    {
      title: 'Силовая техника',
      subtitle: 'Генераторы и компрессоры',
      image: 'https://cdn.leroymerlin.ru/lmru/image/upload/v1656332195/lmcode/bCwjeLDHiEiSTtAsKJ9o4Q/90296819.jpg',
      routerLink: ''
    },
    {
      title: 'Кухонные гарнитуры',
      subtitle: 'стильные и функциональные',
      image: 'https://cdn.leroymerlin.ru/lmru/image/upload/v1663086692/lmcode/Y3yJXzRjJU257nQpN6KGxA/90618111.jpg',
      routerLink: ''
    },
    {
      title: 'Душевые кабины',
      subtitle: 'керамогранит и мозаика',
      image: 'https://res.cloudinary.com/lmru-test/image/upload/v1/elbrus/images/catalog-popup-images/version5/dushevye-kabiny-i-shirmy.jpg',
      routerLink: ''
    }
  ]
  @ViewChild('longBanner') longBanner: any | undefined;


  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Главная");
  }

}
