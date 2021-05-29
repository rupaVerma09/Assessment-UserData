import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'lastFour'})
export class lastFour implements PipeTransform {
  transform(value: number): number {
      var x = this.getLAstFour(value)
    return x;
  }

  getLAstFour(x){
    if(x){
      return String(x).split("").splice(12,4).join()['replaceAll'](",","");
    }
  }
}