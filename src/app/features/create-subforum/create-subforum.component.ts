import { Component, OnInit } from '@angular/core';
import { SubforumCreateModel } from './models/subforum-create-model';
import { FormsModule, NgForm } from '@angular/forms';
import { SubforumService } from '../../core/services/subforum.service';
import { NameNotTakenDirective } from '../../core/directives/name-not-taken.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-subforum',
  standalone: true,
  imports: [FormsModule, NameNotTakenDirective],
  templateUrl: './create-subforum.component.html',
  styleUrl: './create-subforum.component.css'
})
export class CreateSubforumComponent implements OnInit {
  subforumNames: string[] = [];

  subforumCreateModel: SubforumCreateModel = {
    name: ''
  };

  constructor(private readonly subforumService: SubforumService, private readonly router: Router) {

  }

  ngOnInit(): void {
    this.subforumService.getAllSubforumNames().subscribe(res => {
      this.subforumNames = res;
    });
  }

  onSubmit(createSubforumForm: NgForm) {

    this.subforumService.createSubforum(this.subforumCreateModel).subscribe(res => {
      console.log(res);
      this.router.navigate(['/subforums/details', res.name]);
    });
  }
}
