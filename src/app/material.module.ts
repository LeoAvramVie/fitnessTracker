import {NgModule} from '@angular/core';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';


@NgModule({
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule],
  exports: [MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule]
})
export class MaterialModule {}

