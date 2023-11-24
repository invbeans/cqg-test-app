import { Component, Input } from '@angular/core';
import { Package } from '../../models/package';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-package-card',
  templateUrl: './package-card.component.html',
  styleUrl: './package-card.component.scss'
})
export class PackageCardComponent {
  @Input({ required: true }) package!: Package;
  faDownload = faDownload;
}
