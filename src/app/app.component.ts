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

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages() {
    this.packageService.getPackages()
    .subscribe(fetchedPackages => this.packages = fetchedPackages)
  }

  refreshPackages() {
    this.loadPackages();
  }

  filterPackages(query: string) {
    this.packages = this.packageService.filterPackages(query);
  }
}
