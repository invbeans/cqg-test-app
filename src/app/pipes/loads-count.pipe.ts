import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'loadsCount',
})
export class LoadsCountPipe implements PipeTransform {

  transform(value: number): string {
    if (value >= 1000) {
      return `${Math.floor(value/1000)}K`
    } else {
      return `${value}`
    }
  }

}
