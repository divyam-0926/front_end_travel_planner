import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DayDetailService } from './day-detail.service';
import { Observable, lastValueFrom } from 'rxjs';

interface DayDetail {
  id?: number;
  tripName: string;
  description: string;
  days: number;
  dayNumber: number;
  date: string;
  places: string;
  userId?: string;
}

@Component({
  selector: 'app-day-detail',
  templateUrl: './day-detail.component.html',
})
export class DayDetailComponent implements OnInit {
  dayNumber: number;
  userId: string = ''; // Replace with your actual user ID logic!

  form: any = {};
  details: DayDetail[] = [];

  // For editing
  editRow: DayDetail | null = null;
  isEditMode = false;

  // For adding multiple days before submitting
  pendingDays: DayDetail[] = [];

  constructor(
    private route: ActivatedRoute,
    private dayDetailService: DayDetailService
  ) {
    this.dayNumber = +this.route.snapshot.paramMap.get('dayNumber')!;
  }

  ngOnInit() {
    this.userId = 'CURRENT_USER_ID'; // Replace with actual logic!
    this.resetForm();
    this.loadDetails();
  }

  resetForm() {
    this.form = {
      tripName: '',
      description: '',
      days: '',
      dayNumber: '',
      date: '',
      places: ''
    };
    this.isEditMode = false;
    this.editRow = null;
  }

  loadDetails() {
    this.dayDetailService.getDetails(this.dayNumber, this.userId).subscribe(data => {
      this.details = data;
    });
  }

  addDay() {
    if (
      !this.form.tripName ||
      !this.form.description ||
      !this.form.days ||
      !this.form.dayNumber ||
      !this.form.date ||
      !this.form.places
    ) {
      return;
    }
    const newDay: DayDetail = {
      tripName: this.form.tripName,
      description: this.form.description,
      days: +this.form.days,
      dayNumber: +this.form.dayNumber,
      date: this.form.date,
      places: this.form.places,
      userId: this.userId,
    };
    this.pendingDays.push({ ...newDay });
    // Optionally clear only dayNumber, date, places for next entry
    this.form.dayNumber = '';
    this.form.date = '';
    this.form.places = '';
  }

  removePendingDay(idx: number) {
    this.pendingDays.splice(idx, 1);
  }

  async submitAllDays() {
    if (this.pendingDays.length === 0) return;
    const requests: Observable<any>[] = [];
    for (const day of this.pendingDays) {
      requests.push(this.dayDetailService.addDetail(day));
    }
    await Promise.all(requests.map(req => lastValueFrom(req)));
    this.pendingDays = [];
    this.resetForm();
    this.loadDetails();
  }

  // Editing
  startEdit(detail: DayDetail) {
    this.editRow = { ...detail };
    this.isEditMode = true;
  }

  saveEdit() {
    if (this.editRow) {
      const updatedDetail = {
        ...this.editRow,
        userId: this.userId,
        days: +this.editRow.days,
        dayNumber: +this.editRow.dayNumber
      };
      this.dayDetailService.updateDetail(this.editRow.id!.toString(), updatedDetail).subscribe(() => {
        this.editRow = null;
        this.isEditMode = false;
        this.loadDetails();
        this.resetForm();
      });
    }
  }

  cancelEdit() {
    this.editRow = null;
    this.isEditMode = false;
    this.resetForm();
  }

  deleteDetail(id: number) {
    this.dayDetailService.deleteDetail(id.toString()).subscribe(() => {
      this.loadDetails();
    });
  }
}
