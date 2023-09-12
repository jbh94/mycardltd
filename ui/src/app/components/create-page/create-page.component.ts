import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

import { first } from 'rxjs';

import { Page } from 'src/app/models/Page';
import { AuthService } from 'src/app/services/auth.service';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  @ViewChild("formDirective") formDirective!: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter
  form!: FormGroup;

  isOpen = false;

  constructor(private pageService: PageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      title: new FormControl("", [Validators.required, Validators.minLength(5)]),
      body: new FormControl("", [Validators.required, Validators.minLength(10)]),
      uniqueUrlSuffix: new FormControl("", [Validators.required, Validators.minLength(2)])
    })
  }

  onSubmit(formData: Pick<Page, "title" | "body" | "uniqueUrlSuffix">): void {
    this.pageService.createPage(formData, this.authService.userId).pipe(first()).subscribe(() => {
      this.create.emit(null);
    })
    this.form.reset();
    this.formDirective.resetForm();
  }

}
