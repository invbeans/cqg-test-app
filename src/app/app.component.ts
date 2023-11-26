import { Component, OnInit } from '@angular/core';
import { Package } from './models/package';
import { PackageService } from './services/package-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'test-app';
  packages: Package[] | undefined;

  constructor(
    private packageService: PackageService
  ) {}

  // Загрузка пакетов при инициализации компонента
  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages() {
    this.packageService.getPackages()
    .subscribe(fetchedPackages => this.packages = fetchedPackages)
  }

  // Обновление пакетов (загрузка с сервера заново)
  refreshPackages() {
    this.loadPackages();
  }

  // Фильтрация пакетов
  filterPackages(query: string) {
    this.packages = this.packageService.filterPackages(query);
  }
}
