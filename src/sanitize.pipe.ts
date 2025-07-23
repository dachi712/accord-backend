import { Injectable, PipeTransform } from '@nestjs/common';
import { sanitize } from 'class-sanitizer';

@Injectable()
export class SanitizePipe implements PipeTransform {
  transform(value: Record<string, unknown>): Record<string, unknown> {
    if (!value || typeof value !== 'object') return value;
    sanitize(value);
    return value;
  }
}
