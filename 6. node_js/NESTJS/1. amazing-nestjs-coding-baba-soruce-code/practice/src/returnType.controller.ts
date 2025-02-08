import { Controller, Get } from '@nestjs/common';
import { of } from 'rxjs';

const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Async function with promise');
    }, 3000);
  });
};

@Controller('user')
export class AppController {
  @Get('json')
  getJson() {
    return {
      name: 'John Doe',
      age: 25,
      email: 'john.doe@example.com',
    };
  }

  @Get('text')
  getText() {
    return 'Hello, world!';
  }

  @Get('html')
  getHtml() {
    return '<h1>Hello, world!</h1>';
  }

  @Get('arr')
  getArr() {
    return ['anupam', 'juhi', 'anil', 'rakhi'];
  }

  @Get('arrjson')
  getArrayWithObject() {
    return [
      {
        name: 'John Doe',
        age: 25,
        email: 'john.doe@example.com',
      },
      {
        name: 'Jane Smith',
        age: 30,
        email: 'jane.smith@example.com',
      },
    ];
  }

  @Get('promise')
  getPromise() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Promise resolved');
      }, 3000);
    });
  }

  @Get('async')
  async getAsync() {
    const data = await getData();
    return data;
  }

  @Get('observable')
  findImages() {
    return of([
      'https://picsum.photos/200',
      'https://picsum.photos/300',
      'https://picsum.photos/400',
    ]);
  }
}
