import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datedisplay',
  standalone: true
})
export class DateDisplayPipe implements PipeTransform {

  transform(inputDate: string): string {
    let result = '';

    const currDate = new Date();
    const parsedInputDate = new Date(inputDate + 'Z');
    const diffInMilliseconds = currDate.getTime() - parsedInputDate.getTime();


    if (diffInMilliseconds < 60000) {
      result = 'Just now';
    } else {
      const diffInMinutes = Math.floor(diffInMilliseconds / 60000);
      if (diffInMinutes < 60) {
        result = `${diffInMinutes} minutes ago`;
        if (diffInMinutes === 1) {
          result = `${diffInMinutes} minute ago`;
        } else {
          result = `${diffInMinutes} minutes ago`;
        }
      } else {
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
          if (diffInHours === 1) {
            result = `${diffInHours} hour ago`;
          } else {
            result = `${diffInHours} hours ago`;
          }
        } else {
          const diffInDays = Math.floor(diffInHours / 24);
          if (diffInDays < 30) {
            if (diffInDays === 1) {
              result = `Yesterday`;
            } else {
              result = `${diffInDays} days ago`;
            }
          } else {
            const diffInMonths = Math.floor(diffInDays / 30);
            if (diffInMonths < 12) {
              if (diffInMonths === 1) {
                result = `${diffInMonths} month ago`;
              } else {
                result = `${diffInMonths} months ago`;
              }
            } else {
              const diffInYears = Math.floor(diffInMonths / 12);
              if (diffInYears === 1) {
                result = `${diffInYears} year ago`;
              } else {
                result = `${diffInYears} years ago`;
              }
            }
          }
        }
      }
    }

    return result;
  }

}
