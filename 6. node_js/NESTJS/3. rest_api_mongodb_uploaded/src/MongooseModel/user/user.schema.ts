import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { ACCOUNT_STATUS, ACCOUNT_TYPE } from 'src/constants';
import { Address, AddressSchema } from '../common';
import { compare, hash } from 'bcrypt';
import { HydratedDocument, Model, Query } from 'mongoose';

@Schema({
  timestamps: true,
  // methods: {
  //   async isValidPassword(
  //     this: UserDocument,
  //     candidatePassword: string,
  //   ): Promise<boolean> {
  //     const hashedPassword = this.password;
  //     const isMatched = await compare(candidatePassword, hashedPassword);
  //     return isMatched;
  //   },
  // },
  // statics: {
  //   async findByEmailAndPassword(
  //     this: IUserModel,
  //     email: string,
  //     password: string,
  //   ) {
  //     const user = await this.findOne<UserDocument>({ email }, '+password');

  //     if (!user) return;

  //     const isPwdMatched = await user.isValidPassword(password);

  //     if (!isPwdMatched) return;

  //     return user;
  //   },
  // },
  // query: {
  //   byName(this: UserModelQuery<User>, name: string): UserModelQuery<User> {
  //     return this.where<User>({ name: new RegExp(name, 'i') }) as UserModelQuery<User>;
  //   },
  // },
})
export class User {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({
    required: true,

    //  select: false
  })
  password: string;

  @Prop()
  age?: number;

  @Prop()
  phone?: string;

  @Prop({
    type: String,
    enum: Object.keys(ACCOUNT_STATUS),
    default: ACCOUNT_STATUS.ACTIVE,
  })
  status?: ACCOUNT_TYPE;

  @Prop({
    type: String,
    enum: Object.keys(ACCOUNT_TYPE),
    immutable: true,
    required: true,
  })
  accountType: ACCOUNT_TYPE;

  @Prop({
    default: [],
  })
  social?: string[];

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({
    type: AddressSchema,
    required: true,
  })
  address: Address;

  @Prop(
    raw({
      reference: { type: String },
      beta: { type: Boolean },
    }),
  )
  metadata: Record<string, any> | any;

  // NOTE: Document instance method
  isValidPassword: (candidatePassword: string) => Promise<boolean>;
}

export type UserDocument = User & Document;

export const USER_MODEL = User.name;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.isValidPassword = async function (
  this: UserDocument,
  candidatePassword: string,
): Promise<boolean> {
  const hashedPassword = this.password;
  const isMatched = await compare(candidatePassword, hashedPassword);
  return isMatched;
};

UserSchema.pre('save', async function (next) {
  try {
    const user = this;
    const hashedPassword = await hash(user.password, 10);
    user.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

export type UserModelQuery = Query<
  any,
  HydratedDocument<User>, // UserDocument
  IUserQueryHelpers
> &
  IUserQueryHelpers; // chaining
export interface IUserQueryHelpers {
  byName(this: UserModelQuery, name: string): UserModelQuery;
}
export interface IUserModel extends Model<UserDocument, IUserQueryHelpers> {
  findByEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<UserDocument | undefined>;
}
