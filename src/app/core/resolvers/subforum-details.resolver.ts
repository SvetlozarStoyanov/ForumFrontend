import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { SubforumService } from '../services/subforum.service';
import { SubforumDetailsModel } from '../models/subforums/subforum-details-model';

export const subforumDetailsResolver: ResolveFn<SubforumDetailsModel | null> = (route, state): Observable<SubforumDetailsModel | null> => {
  const subforumService = inject(SubforumService);
  const router = inject(Router);
  const subforumName = route.paramMap.get('name');
  return subforumService.getSubforumByName(subforumName!).pipe(catchError(error => {
    router.navigate(['/not-found'])
    return of(null);
  }));
};
