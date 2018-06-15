import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { defaultKeys } from '@dilta/screwbox';

export interface Parent {
  phoneNo: number;
  name: string;
  relationship: string;
  homeAddress: string;
  workAddress?: string;
  email?: string;
  profession: string;
  workcategory: string;
  town: string;
  state: string;
}

export const objParentKeys = ['name', 'email', 'homeAddress', 'phoneNo',
  'profession', 'town', 'relationship', 'state', 'workAddress', 'workcategory'];
@Component({
  selector: 'app-parent-biodata-editor',
  templateUrl: './parent-biodata-editor.component.html',
  styleUrls: ['./parent-biodata-editor.component.scss']
})
export class ParentBiodataEditorComponent implements OnInit {

  public static inputError = new Error(`expected a valid object type of Parent
  <parent-biodata-editor > </parent-biodata-editor>`);

  @Input() public parent: Parent = {} as any;
  @Output() public emitter = new EventEmitter();

  public parentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // sets intial and for testing
    this.parentForm = this.form(this.parent);
  }

  /**
   *  form(parent)
   *  @param parent a valid parent or not defined object
   * initalize new forms from the input provided or
   * initalize new default forms if there is no input
   */
  public form(parent?: Parent) {
    const { required } = Validators;
    // checking if parent is defined if not it is
    // defaulted
    if (!parent) {
      parent = defaultKeys(parent, objParentKeys);
    }
    // checks if parent is an object if not throws an
    // error
    if (typeof parent !== 'object') {
      throw ParentBiodataEditorComponent.inputError;
    }
    // constructing form groups
    return this.fb.group({
      name: [parent.name, required],
      email: [parent.email],
      homeAddress: [parent.homeAddress, required],
      phoneNo: [parent.phoneNo, required],
      profession: [parent.profession, required],
      town: [parent.town, required],
      relationship: [parent.relationship, required],
      state: [parent.state, required],
      workAddress: [parent.workAddress],
      workcategory: [parent.workcategory, required],
    });
  }

  /**
   * emits the parent value has an output binding
   * @param value parent form value
   */
  public emit(value: Parent) {
    console.log(value);
    this.emitter.emit(value);
  }

  ngOnInit() {
    // for external inputs which has now been resolved
    this.parentForm.setValue(this.form(this.parent).value);
  }
}
