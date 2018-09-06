/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { RecaptchaComponent } from './recaptcha.component';
import { RecaptchaModule } from './recaptcha.module';


let fixture;
let component: RecaptchaComponent;

describe('Component: Recaptcha', () => {

  var spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RecaptchaModule
      ],
      declarations: [
      ],
      providers: [
      ]
    });
    fixture = TestBed.createComponent(RecaptchaComponent);
    component = fixture.componentInstance;
    // Arrange
    spy = spyOn(component, 'displayRecaptcha').and.callFake(() => {});
    // fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should call displayRecaptcha on ngOnInit', () => {
    // Act
    component.ngOnInit();
    // Assert
    expect(spy).toHaveBeenCalled();
  });

  it('should emit the success value on verifyRecaptchaCallback', () => {
    // Arrange
    let spySuccess = spyOn(component.success, 'emit');
    let response = 'kajhvkjaglsdkjfbkajshdvflakshdfv';
    // Act
    component.verifyRecaptchaCallback(response);
    // Assert
    expect(spySuccess).toHaveBeenCalled();
    expect(spySuccess).toHaveBeenCalledWith(response);
  });

});
