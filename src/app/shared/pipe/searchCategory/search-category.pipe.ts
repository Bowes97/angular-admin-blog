import { Pipe, PipeTransform } from '@angular/core';
import { ICategorysResponse } from '../../interfaces/category/category.interface';

@Pipe({
  name: 'searchCategory'
})
export class SearchCategoryPipe implements PipeTransform {

  transform(value: Array<ICategorysResponse>, category: string): Array<ICategorysResponse> {
    if(!category){
      return value;
    }
    if(!value){
      return [];
    }
    return value.filter(categories => JSON.stringify(categories).toLowerCase().includes(category.toLowerCase()))
  }

}
