import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class UserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);
    if (!value.age || !value.id) {
      throw new BadRequestException('Age is required');
    }
    return value;
  }
}
