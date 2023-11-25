import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
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
  tempDependencies: string[] = [];

  constructor(
    private packageService: PackageService
  ) {}

  ngOnInit(): void {
    this.loadInitData();
  }

  loadInitData() {
    this.cleanTempVariables();
    this.packageService.getPackages()
    .subscribe(fetchedPackages => this.packages = fetchedPackages)
  }

  cleanTempVariables() {
    this.cleanTempDependencies();
  }

  refreshPackages() {
    this.loadInitData();
  }

  getDependenciesById(id: string) {
    this.packageService.getDependencies(id)
    .subscribe(fetchedDependencies => this.tempDependencies = fetchedDependencies);
  }

  filterPackages(query: string) {
    this.packages = this.packageService.filterPackages(query);
  }

  cleanTempDependencies() {
    this.tempDependencies = [];
  }
}
