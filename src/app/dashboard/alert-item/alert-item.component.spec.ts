import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AlertItemComponent } from './alert-item.component';

describe('AlertItemComponent', () => {
  let component: AlertItemComponent;
  let fixture: ComponentFixture<AlertItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertItemComponent);
    component = fixture.componentInstance;

    // Set a sample alert for testing
    component.alert = {
      id: 1,
      name: 'Test Alert',
      description: 'A test alert',
      dates: {
        start: new Date(),
        end: new Date(),
      },
      location: 'Test location',
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).to.be.true;
  });

  it('should emit edit event when Edit button is clicked', () => {
    spyOn(component.edit, 'emit');

    const editButton = fixture.debugElement.query(By.css('button.edit-button'));
    editButton.triggerEventHandler('click', null);

    expect(component.edit.emit).toHaveBeenCalledWith(component.alert);
  });

  it('should emit delete event when Delete button is clicked', () => {
    spyOn(component.delete, 'emit');

    const deleteButton = fixture.debugElement.query(By.css('button.delete-button'));
    deleteButton.triggerEventHandler('click', null);

    expect(component.delete.emit).toHaveBeenCalledWith(component.alert);
  });
});
