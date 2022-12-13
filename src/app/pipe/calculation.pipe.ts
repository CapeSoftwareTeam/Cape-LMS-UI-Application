import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculation'
})
export class CalculationPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toUpperCase();
return items.filter( it => {
      return it.toLowerCase().includes(searchText);
    });
   }

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

//    let dateofjoining:any new Date(). getFullYear
//    let currentDate:any new Date().getFullYear
//    let capeExperience  = dateofjoining-currentDate;
//    return capeExperience;

// }
}
