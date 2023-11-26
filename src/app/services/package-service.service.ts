import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Package } from '../models/package';
import { Observable, catchError, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private packages: Package[] = [];
  private apiUrl: string = 'http://localhost:3000/packages/';
  tempDependencies: string[] = [];
  constructor(private http: HttpClient) { };

  getPackages(): Observable<Package[]> {
    this.cleanTempDependencies();
    return this.http.get<Package[]>(this.apiUrl)
      .pipe(
        map(fetchedPackages => {
          this.packages = fetchedPackages;
          console.log(fetchedPackages);
          return this.packages;
        }),
        catchError(this.handleError<Package[]>('getPackages', []))
      );
  }

  getDependencies(id: string): void {
    let requiredPackage = this.packages.find(p => p.id === id);
    if (requiredPackage?.dependencyCount == 0) {
      this.tempDependencies = [];
    }
    if (requiredPackage!.dependencies) {
      this.tempDependencies = requiredPackage!.dependencies;
    }
    else {
      const encodedId = encodeURIComponent(id);
      this.http.get<string[]>(this.apiUrl + `${encodedId}/dependencies`)
        .pipe(
          catchError(this.handleError<string[]>('getDependencies', []))
        )
        .subscribe(fetchedDependencies => {
          this.packages.find(p => p.id === id)!.dependencies = null || fetchedDependencies;
          this.tempDependencies = fetchedDependencies;
        })
    }
  }

  filterPackages(query: string): Package[] {
    if (this.packages.length == 0) {
      return [];
    }
    if (query === '') {
      return this.packages;
    }
    return this.packages.filter(p => p.id.toLowerCase().includes(query.toLowerCase()));
  }

  checkIfPackageIsDependencyOfHovered(id: string) {
    return this.tempDependencies.includes(id);
  }

  cleanTempDependencies() {
    this.tempDependencies = [];
  }

  private handleError<T>(method: string, result?: T) {
    return (error: any): Observable<T> => {
      console.log(`Ошибка в ${method}: ${error.message}`);
      return of(result as T);
    }
  }
}
