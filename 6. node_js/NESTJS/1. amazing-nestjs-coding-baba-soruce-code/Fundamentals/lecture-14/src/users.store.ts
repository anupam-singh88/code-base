import { Injectable, Scope } from "@nestjs/common";

let instanceCount = 0;

//@Injectable({Scope: Scope.TRANSIENT}) // NEW DEDICATED INSTANCE FOR EACH MODULE WHOEVER INJECTS IT used for caching mostly

//@Injectable({Scope: Scope.request}) //every time new instance created wehn request comes 

// @Injectable({Scope: Scope.DEFAULT})
export class UsersStore {
  public readonly storeN: number;

  constructor() {
    this.storeN = ++instanceCount;

    console.log(`UsersStore init (instance ${this.storeN})`);
  }

  getStore() {
    return `I am UsersStore (instance ${this.storeN})`;
  }
}
