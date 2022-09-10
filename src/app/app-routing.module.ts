import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  { path: 'catalogue', loadChildren: () => import('./catalogue/catalogue.module').then(m => m.CatalogueModule)},
  { path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
