import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { ACCOUNT_STATUS, ACCOUNT_TYPE } from "../../constants";
import { AddressSchema, Address } from "../common/address.schema";

@Schema({
  timestamps: true,
  // collections:'users', // collection name
  // toJSON: { virtuals: true, getters: true },
  // toObject: { virtuals: true, getters: true },
  // strict: true,
  // versionKey: false,
  // id: false,

})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, select: false })
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
    immutable: true, // once set, it can't be changed
    required: true,
  })
  accountType: ACCOUNT_TYPE;

  @Prop({ default: [] })
  social?: string[];

  @Prop({ default: false })
  isEmailVerified?: boolean;

  @Prop({ type: AddressSchema, required: true })
  address: Address;

  @Prop(
    // NOTE: object or any kind (mixed type) of data type
    raw({
      reference: { type: String },
      beta: { type: Boolean },
    })
  )
  metadata: Record<string, any> | any;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const USER_MODEL = User.name; // User