import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, BookDocument } from './schema/Book';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}
  create(createBookDto: CreateBookDto) {
    const model = new this.bookModel();
    model.title = createBookDto.title;
    model.author = createBookDto.author;
    model.published = createBookDto.published;
    return model.save();
  }

  findAll() {
    return this.bookModel.find().exec();
  }

  findOne(id: string) {
    return this.bookModel.findById(id).exec();
    // return `This action returns a #${id} book`;
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return this.bookModel
      .updateOne(
        { _id: id },
        {
          title: updateBookDto.title,
          author: updateBookDto.author,
          published: updateBookDto.published,
        },
      )
      .exec();
  }

  remove(id: string): any {
    return this.bookModel.deleteOne({ _id: id }).exec();
    // return `This action removes a #${id} book`;
  }
}
