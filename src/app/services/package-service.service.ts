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
  // Временные зависимости, используются для подсвечивания пакетов зависимостей
  tempDependencies: string[] = [];
  constructor(private http: HttpClient) { };

  // Получение пакетов
  getPackages(): Observable<Package[]> {
    this.cleanTempDependencies();
    return this.http.get<Package[]>(this.apiUrl)
      .pipe(
        map(fetchedPackages => {
          // Пакеты сохраняются в сервисе и далее передаются главной странице
          this.packages = fetchedPackages;
          return this.packages;
        }),
        catchError(this.handleError<Package[]>('getPackages', []))
      );
  }

  // Получение зависимостей пакета по его названию
  getDependencies(id: string): void {
    // Для проверки, загружены ли зависимости ранее, находится выделенный пакет
    let requiredPackage = this.packages.find(p => p.id === id);
    // Если число зависимостей 0 - запрос не отправляется
    if (requiredPackage?.dependencyCount == 0) {
      this.tempDependencies = [];
    }
    // Если зависимости уже загружены, они сохраняются в переменной для выделения
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
          // Загруженные зависимости сохраняются в объекте выделенного пакета
          this.packages.find(p => p.id === id)!.dependencies = null || fetchedDependencies;
          // И в переменной для выделения
          this.tempDependencies = fetchedDependencies;
        })
    }
  }

  // Фильтрация пакетов
  filterPackages(query: string): Package[] {
    // Если пакетов нет - возвращается пустой массив
    if (this.packages.length == 0) {
      return [];
    }
    // Если запрос = пустой строчке, возвращаются все пакеты
    if (query === '') {
      return this.packages;
    }
    return this.packages.filter(p => p.id.toLowerCase().includes(query.toLowerCase()));
  }

  // Проверка, что пакет в зависимостях от выделенного
  checkIfPackageIsDependencyOfHovered(id: string): boolean {
    return this.tempDependencies.includes(id);
  }

  // Очистка переменной с временными зависимостями
  cleanTempDependencies() {
    this.tempDependencies = [];
  }

  // Обработчик ошибок
  private handleError<T>(method: string, result?: T) {
    return (error: any): Observable<T> => {
      console.log(`Ошибка в ${method}: ${error.message}`);
      return of(result as T);
    }
  }
}
