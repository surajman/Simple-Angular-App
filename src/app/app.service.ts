import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemHeroService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 1, name: 'Windstorm', age: 25, isActive: true },
      { id: 2, name: 'Bombasto', age: 23, isActive: false },
      { id: 3, name: 'Magneta', age: 28, isActive: true },
      { id: 4, name: 'Tornado', age: 21, isActive: true }
    ];
    return {users};
  }
}
