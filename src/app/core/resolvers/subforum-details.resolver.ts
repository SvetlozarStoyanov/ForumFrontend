import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { SubforumService } from '../services/subforum.service';
import { SubforumDetailsModel } from '../models/subforums/subforum-details-model';

export const subforumDetailsResolver: ResolveFn<SubforumDetailsModel> = (route, state): Observable<SubforumDetailsModel> =>  {
  const subforumService = inject(SubforumService);
  
  const subforumName = route.paramMap.get('name');
  return subforumService.getSubforumByName(subforumName!);
};
