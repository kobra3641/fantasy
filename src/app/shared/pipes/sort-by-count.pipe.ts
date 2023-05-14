import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByCount'
})
export class SortByCountPipe implements PipeTransform {

  transform(value: any[] | undefined): any[] | undefined {
    value?.forEach((item) => console.log(item));
    return value ? value.sort((n1,n2) =>
    {
      return n1?.count - n2?.count;
    }) : value;
  }
}
