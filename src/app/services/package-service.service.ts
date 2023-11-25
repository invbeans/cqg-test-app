import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Package } from '../models/package';
import { Observable, catchError, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private packages: Package[] = [];
  private apiUrl: string = 'http://localhost:3000/packages/'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // подгружать это в ngoninit
  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(this.apiUrl, this.httpOptions)
      .pipe(
        map(fetchedPackages => {
          //сработает??
          this.packages = fetchedPackages;
          console.log(fetchedPackages);
          return this.packages;
        }),
        catchError(this.handleError<Package[]>('getPackages', []))
      );
  }

  getDependencies(id: string): Observable<string[]> {
    let requiredPackage = this.packages.find(p => p.id === id);
    if(requiredPackage?.dependencyCount == 0) {
      return of([]);
    }
    if(requiredPackage!.dependencies) {
      return of(requiredPackage!.dependencies);
    }
    else {
      const encodedId = encodeURIComponent(id);
      return this.http.get<string[]>(this.apiUrl + `${encodedId}/dependencies`, this.httpOptions)
      .pipe(
        map(fetchedDependencies => {
          this.packages.find(p => p.id === id)!.dependencies = null || fetchedDependencies;
          return fetchedDependencies;
        }),
        catchError(this.handleError<string[]>('getDependencies', []))
      )
    }
  }

  filterPackages(query: string): Package[] {
    if(this.packages.length == 0) {
      return [];
    }
    if(query === '') {
      return this.packages;
    }
    return this.packages.filter(p => p.id.toLowerCase().includes(query.toLowerCase()));
  }

  private handleError<T>(method: string, result?: T) {
    return (error: any): Observable<T> => {
      console.log(`Ошибка в ${method}: ${error.message}`);
      return of(result as T);
    }
  }
}
