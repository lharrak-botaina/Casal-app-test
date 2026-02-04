import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class IsPasswordMatchService {

  constructor() { }

  checkPasswords(group: FormGroup, field1 = 'password', filed2 = 'repeat_password') {
    let pass = group.get(field1).value;
    let confirmPass = group.get(filed2).value;

    return pass === confirmPass
      ? group
          .get(filed2)
          .setErrors(
            group.get(filed2).errors?.length > 0
              ? { ...group.get(filed2).errors }
              : null
          )
      : group
          .get(filed2)
          .setErrors({ ...group.get(filed2).errors, notSame: true });
  }
}
