import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generalCount',
  standalone: true
})
export class GeneralCountPipe implements PipeTransform {

  transform(membercount: number, singularForm: string, multipleForm: string): string {
    let membercountText: string = '';

    if (membercount > 1000000) {
      membercountText = `${membercount / 1000000}M ${multipleForm}`;
    } else if (membercount > 1000) {
      membercountText = `${membercount / 1000}K ${multipleForm}`;
    } else if (membercount === 1) {
      membercountText = `1 ${singularForm}`;
    } else if (membercount === 0) {
      membercountText = `No ${multipleForm}`;
    } else {
      membercountText = `${membercount} ${multipleForm}`;
    }

    return membercountText;

  }
}
