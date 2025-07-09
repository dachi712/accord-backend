import { Transform } from 'class-transformer';

export const CleanString = () =>
  Transform(({ value }) =>
    typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : value
  );
