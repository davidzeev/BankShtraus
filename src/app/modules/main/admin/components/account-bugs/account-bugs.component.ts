import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BugDTO, AccountBug, UpdateAccountBugsDTO, BugsAndBugsAccountDTO } from '../../../../../models/Bugs.model';
import { BugsService } from '../../../../../services/bugs.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-account-bugs',
  templateUrl: './account-bugs.component.html',
  styleUrl: './account-bugs.component.scss'
})

export class AccountBugsComponent implements OnInit, OnDestroy {
  @Input() accountNumber!: number;
  public bugSettingsForm!: FormGroup;
  private subscription: Subscription = new Subscription();
  public dataSource = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['bugId', 'name', 'description', 'bugType', 'frequency', 'data', 'actions'];

  constructor(private fb: FormBuilder, private bugsService: BugsService) { }

  ngOnInit(): void {
    this.bugSettingsForm = this.fb.group({
      bugs: this.fb.array([])
    });
    this.getBugsAndAccountBugs();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getBugsAndAccountBugs(): void {
    this.subscription.add(
      this.bugsService.getBugsAndBugsAccount(this.accountNumber).subscribe({
        next: (data: BugsAndBugsAccountDTO) => {
          this.setBugs(data.bugList, data.accountBugs);
          this.dataSource.data = (this.bugSettingsForm.get('bugs') as FormArray).controls;
        },
        error: (error) => {
          console.error('Error fetching bugs:', error);
        }
      })
    );
  }

  private setBugs(bugs: BugDTO[], accountBugs: AccountBug[]): void {
    const bugsFormArray = this.bugSettingsForm.get('bugs') as FormArray;
    bugs.forEach(bug => {
      const accountBug = accountBugs.find(accountBug => accountBug.bugId === bug.bugId);
      bugsFormArray.push(this.createBugFormGroup(bug, accountBug));
    });
  }

  private createBugFormGroup(bug: BugDTO, accountBug?: AccountBug): FormGroup {
    return this.fb.group({
      bugId: [bug.bugId],
      name: [bug.name],
      description: [bug.description],
      bugType: [bug.bugType],
      frequency: [accountBug ? accountBug.frequency : bug.frequency],
      data: [accountBug ? accountBug.data : bug.data || null],
      isAccountBug: [!!accountBug]
    });
  }

  public getFormControl(index: number, controlName: string): FormControl {
    const bugsFormArray = this.bugSettingsForm.get('bugs') as FormArray;
    return bugsFormArray.at(index).get(controlName) as FormControl;
  }

  public saveSettings(): void {
    const bugsFormArray = this.bugSettingsForm.get('bugs') as FormArray;
    const updateAccountBugsDto: UpdateAccountBugsDTO = {
      accountNumber: this.accountNumber,
      bugs: bugsFormArray.value
        .filter((bug: any) => bug.isAccountBug)
        .map((bug: any) => ({ id: bug.bugId, data: bug.data, frequency: bug.frequency }))
    };

    this.subscription.add(
      this.bugsService.updateBugsAccount(updateAccountBugsDto).subscribe({
        next: () => {
          alert('הרשימה עודכנה בהצלחה');
        },
        error: (error) => {
          console.error('Error updating settings:', error);
        }
      })
    );
  }

  public get bugs(): FormArray {
    return this.bugSettingsForm.get('bugs') as FormArray;
  }
}
