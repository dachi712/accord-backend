import { Transform } from 'class-transformer';

export function CapitalizeFirst(): PropertyDecorator {
  return Transform(({ value }) => {
    if (typeof value !== 'string') return value;
    if (value.length === 0) return value;
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  });
}
