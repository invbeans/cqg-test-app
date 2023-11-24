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

  constructor(
    private packageService: PackageService
  ) {}

  ngOnInit(): void {
    this.loadInitData();

  }

  loadInitData(): void {
    this.packageService.getPackages()
    .subscribe(fetchedPackages => this.packages = fetchedPackages)
  }
}
