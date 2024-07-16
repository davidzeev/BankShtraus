import { Component, ViewChild, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BugDTO } from '../../../../../models/Bugs.model';
import { BugsService } from '../../../../../services/bugs.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bug-list',
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.scss']
})
export class BugListComponent implements OnInit, AfterViewInit, OnDestroy {
  public bugsForm!: FormGroup;
  private subscription: Subscription = new Subscription();
  public dataSource = new MatTableDataSource<any>();

  public difficultyOptions = [0, 1, 2, 3, 4, 5];
  public displayedColumns: string[] = [
    'bugId', 'name', 'description', 'bugType', 'difficultyLevel', 'version', 'frequency', 'data', 'actions'
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private bugsService: BugsService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.bugsForm = this.fb.group({
      bugs: this.fb.array([])
    });
    this.getBugList();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getBugList(): void {
    this.subscription.add(
      this.bugsService.getBugList().subscribe({
        next: (bugs: BugDTO[]) => {
          this.setBugs(bugs);
          this.dataSource.data = (this.bugsForm.get('bugs') as FormArray).controls;
        },
        error: (error) => {
          console.error('Error fetching bugs:', error);
        }
      })
    );
  }

  private setBugs(bugs: BugDTO[]): void {
    const bugsFormArray = this.bugsForm.get('bugs') as FormArray;
    bugs.forEach(bug => {
      bugsFormArray.push(this.createBugFormGroup(bug));
    });
  }

  private createBugFormGroup(bug: BugDTO): FormGroup {
    return this.fb.group({
      bugId: [bug.bugId],
      name: [bug.name, Validators.required],
      description: [bug.description, Validators.required],
      bugType: [bug.bugType],
      difficultyLevel: [bug.difficultyLevel, Validators.required],
      version: [bug.version, Validators.required],
      frequency: [bug.frequency, [Validators.required, Validators.min(0), Validators.max(50)]],
      data: [bug.data, [Validators.min(-99999999), Validators.max(99999999)]]
    });
  }

  public getFormControl(index: number, controlName: string): FormControl {
    const bugsFormArray = this.bugsForm.get('bugs') as FormArray;
    return bugsFormArray.at(index).get(controlName) as FormControl;
  }

  public isDirty(index: number): boolean {
    const bugsFormArray = this.bugsForm.get('bugs') as FormArray;
    return bugsFormArray.at(index).dirty;
  }

  public saveBug(index: number): void {
    const bugsFormArray = this.bugsForm.get('bugs') as FormArray;
    const bugFormGroup = bugsFormArray.at(index) as FormGroup;
    if (bugFormGroup.valid) {
      const updatedBug = bugFormGroup.value;
      this.subscription.add(
        this.bugsService.updateBug(updatedBug.bugId, updatedBug).subscribe({
          next: () => {
            bugFormGroup.markAsPristine();
            this.snackBar.open('שגיאה עודכנה בהצלחה!', 'סגור', { duration: 3000 });
          },
          error: (error) => {
            console.error('Error updating bug:', error);
          }
        })
      );
    }
  }

  public isInvalid(index: number, controlName: string): boolean {
    const control = this.getFormControl(index, controlName);
    return control.invalid && (control.dirty || control.touched);
  }

  public isInvalidGroup(index: number): boolean {
    const bugsFormArray = this.bugsForm.get('bugs') as FormArray;
    return (bugsFormArray.at(index) as FormGroup).invalid;
  }

  public get bugs(): FormArray {
    return this.bugsForm.get('bugs') as FormArray;
  }
}
