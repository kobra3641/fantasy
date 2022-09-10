import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchRegion'})
export class FilterRegionPipe implements PipeTransform {
  transform(list: any[], filterText: string): any {
    return list ? list.filter(item => item.rus_name.search(new RegExp(filterText, 'i')) > -1) : [];
  }
}
