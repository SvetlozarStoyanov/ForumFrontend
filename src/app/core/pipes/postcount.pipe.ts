import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'postcount',
    standalone: true
})
export class PostCountPipe implements PipeTransform {

    transform(membercount: number): string {
        let membercountText: string = '';

        if (membercount > 1000000) {
            membercountText = `${membercount / 1000000}M posts`;
        } else if (membercount > 1000) {
            membercountText = `${membercount / 1000}K posts`;
        } else if (membercount === 1) {
            membercountText = `1 post`;
        } else if (membercount === 0) {
            membercountText = `No posts`;
        } else {
            membercountText = `${membercount} posts`;
        }

        return membercountText;
    }

}
