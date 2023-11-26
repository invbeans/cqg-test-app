import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundThousands',
})
export class RoundThousands implements PipeTransform {

  transform(value: number): string {
    if (value >= 1000) {
      return `${Math.floor(value/1000)}K`
    } else {
      return `${value}`
    }
  }

}
