import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dependenciesCount'
})
export class DependenciesCountPipe implements PipeTransform {

  transform(value: number): string {
    if (value == 1) {
      return `${value} dependency`
    } else {
      return `${value} dependencies`
    }
  }

}
