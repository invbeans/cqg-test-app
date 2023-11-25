import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Output() refreshEvent = new EventEmitter<void>();
  @Output() filterPackages = new EventEmitter<string>();
  packageName = new FormControl('');
  faArrowsRotate = faArrowsRotate;

  refreshPackages() {
    this.refreshEvent.emit();
  }

  handleInputChange() {
    if (!this.packageName.value) {
      this.filterPackages.emit('');
    } else {
      this.filterPackages.emit(this.packageName.value);
    }
  }
}
