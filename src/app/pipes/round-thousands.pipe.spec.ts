import { RoundThousands } from './round-thousands.pipe';

describe('RoundThousandsPipe', () => {
  it('create an instance', () => {
    const pipe = new RoundThousands();
    expect(pipe).toBeTruthy();
  });
});
