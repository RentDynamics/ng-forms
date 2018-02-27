/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { RdAngularFormsModule } from '../forms.module';

import { RecaptchaComponent } from './recaptcha.component';


let fixture;
let component: RecaptchaComponent;

describe('Component: Recaptcha', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RdAngularFormsModule
      ],
      declarations: [
      ],
      providers: [
      ]
    });
    fixture = TestBed.createComponent(RecaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should call displayRecaptcha on ngOnInit', () => {
    // Arrange
    let spy = spyOn(component, 'displayRecaptcha');
    // Act
    component.ngOnInit();
    // Assert
    expect(spy).toHaveBeenCalled();
  });

  it('should emit the success value on verifyRecaptchaCallback', () => {
    // Arrange
    let spy = spyOn(component.success, 'emit');
    let response = 'kajhvkjaglsdkjfbkajshdvflakshdfv';
    // Act
    component.verifyRecaptchaCallback(response);
    // Assert
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(response);
  });

});
