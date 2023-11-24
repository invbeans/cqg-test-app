import { DependenciesCountPipe } from './dependencies-count.pipe';

describe('DependenciesCountPipe', () => {
  it('create an instance', () => {
    const pipe = new DependenciesCountPipe();
    expect(pipe).toBeTruthy();
  });
});
