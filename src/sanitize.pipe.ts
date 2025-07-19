import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { sanitize } from "class-sanitizer";

@Injectable()
export class SanitizePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (!value || typeof value !== 'object') return value
        sanitize(value)
        return value
    }
}