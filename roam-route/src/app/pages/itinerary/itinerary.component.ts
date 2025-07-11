import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Day {
  day: number;
  label: string;
}

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
})
export class ItineraryComponent implements OnInit {
  // Hardcoded as in your HTML
  tripName = 'MUMBAI';
  startDate = '03 / 10 / 2025';
  endDate = '09 / 10 / 2025';
  catImageUrl = '/assets/poki';

  // Example day list; replace with API call if needed
  days: Day[] = [
    { day: 1, label: 'Gateway of India' },
    { day: 2, label: 'Marine Drive' },
    { day: 3, label: 'Elephanta Caves' },
    { day: 4, label: 'Juhu Beach' },
    { day: 5, label: 'Siddhivinayak Temple' },
    { day: 6, label: 'Colaba Causeway' },
    { day: 7, label: 'Haji Ali Dargah' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // If you want to load days from a service, do it here.
  }

  onDayClick(day: number) {
    // Navigate to the detail page for the selected day
    this.router.navigate(['/day', day]);
  }
}
