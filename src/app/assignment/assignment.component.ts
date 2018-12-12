import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  projectForm: FormGroup;
  projectStatuses = ['Stable', 'Critical', 'Finished'];
  constructor() { }

  ngOnInit() {
    //setup projectForm controls here
    this.projectForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectName': new FormControl(null, Validators.required, this.validateProjectName),
      'projectStatus': new FormControl(null)
    });
  }

  validateProjectName(ctrl: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (ctrl.value === 'test') {
          console.log('name invalid');
          resolve({ 'nameIsForbidden': true });
        } else {
          console.log('name valid');
          resolve(null);
        }
      }, 1500);
    });

    return promise;
  }

  onProjectSubmit() {
    console.log(this.projectForm);
  }

  hasError(path: string, errName: string): boolean {
    return this.projectForm.get(path).touched && this.projectForm.get(path).hasError(errName);
  }

}
