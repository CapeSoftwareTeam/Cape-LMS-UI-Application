import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculation'
})
export class CalculationPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
//    let dateofjoining:any new Date(). getFullYear
//    let currentDate:any new Date().getFullYear
//    let capeExperience  = dateofjoining-currentDate;
//    return capeExperience;

// }
}
