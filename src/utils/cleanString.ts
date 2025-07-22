import { Transform } from 'class-transformer';

export const CleanString = (): PropertyDecorator =>
  Transform(({ value }) =>
    typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : value
  );
