import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Destination {
  day: number;
  label: string;
}

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
})
export class ItineraryComponent {
  tripName = 'MUMBAI';
  startDate = '03 / 10 / 2025';
  endDate = '09 / 10 / 2025';
  catImageUrl = '/assets/poki';

  destinations: Destination[] = [
    { day: 1, label: 'Landing / settle down' },
    { day: 2, label: 'Hotel / accommodation' },
    { day: 3, label: 'Landing / settle down' },
    { day: 4, label: 'Landing / settle down' },
    { day: 5, label: 'Landing / settle down' },
    { day: 6, label: 'Landing / settle down' },
  ];

  constructor(private router: Router) {}

  onDestinationClick(day: number) {
    this.router.navigate(['/day', day]);
  }

  onEditClick() {
    // Add your edit logic here
  }
}
