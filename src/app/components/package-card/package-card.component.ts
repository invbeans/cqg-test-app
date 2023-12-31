import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Package } from '../../models/package';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { PackageService } from '../../services/package-service.service';

@Component({
  selector: 'app-package-card',
  templateUrl: './package-card.component.html',
  styleUrl: './package-card.component.scss'
})
export class PackageCardComponent{
  @Input({ required: true }) package!: Package;
  faDownload = faDownload;

  constructor(private packageService: PackageService){};

  // Проверка, что этот пакет в зависимостях от выделенного пакета
  checkIfADependency(): boolean {
    return this.packageService.checkIfPackageIsDependencyOfHovered(this.package.id);
  }

  handleMouseEnter() {
    this.packageService.getDependencies(this.package.id);
  }

  handleMouseLeave() {
    this.packageService.cleanTempDependencies();
  }

  // Проверка, что название пакета составное
  isCompositeId(): boolean {
    return this.package.id.split('/').length > 1;
  }

  // Получение части названия пакета до "/"
  getIdHighlitedPart(): string {
    return this.package.id.split('/')[0];
  }

  // Получение части названия пакета после "/" или полное название без "/"
  getIdNormalPart(): string {
    if (this.isCompositeId()) {
      return this.package.id.split('/')[1];
    } else {
      return this.package.id;
    }
  }
}
