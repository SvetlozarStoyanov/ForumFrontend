import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'membercount',
  standalone: true
})
export class MemberCountPipe implements PipeTransform {

  transform(membercount: number): string {
    let membercountText: string = '';

    if (membercount > 1000000) {
      membercountText = `${membercount / 1000000} members`;
    } else if (membercount > 1000) {
      membercountText = `${membercount / 1000} members`;
    } else if (membercount === 1) {
      membercountText = `1 member`;
    } else if (membercount === 0) {
      membercountText = `No members`;
    } else {
      membercountText = `${membercount} members`;
    }
    
    return membercountText;
  }

}
