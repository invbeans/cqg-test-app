import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Package } from '../../models/package';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-package-card',
  templateUrl: './package-card.component.html',
  styleUrl: './package-card.component.scss'
})
export class PackageCardComponent {
  @Input({ required: true }) package!: Package;
  @Input() isDependencyOfHoveredPackage = false;
  @Output() fetchDependencies = new EventEmitter<string>();
  @Output() cleanTempDependencies = new EventEmitter<void>();
  hovered = false;

  faDownload = faDownload;

  handleMouseEnter() {
    this.hovered = true;
    this.fetchDependencies.emit(this.package.id);
  }

  handleMouseLeave() {
    this.hovered = false;
    this.cleanTempDependencies.emit();
  }

  isCompositeId(): boolean {
    return this.package.id.split('/').length > 1;
  }

  getIdHighlitedPart(): string {
    return this.package.id.split('/')[0];
  }

  getIdNormalPart(): string {
    if (this.isCompositeId()) {
      return this.package.id.split('/')[1];
    } else {
      return this.package.id;
    }
  }
}
