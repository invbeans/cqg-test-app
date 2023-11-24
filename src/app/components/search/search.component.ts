import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  packageName = new FormControl('');
  faArrowsRotate = faArrowsRotate;
}
