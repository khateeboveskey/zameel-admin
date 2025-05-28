import { Model } from "@tailflow/laravel-orion/lib/model";

export class User extends Model<{
  name: string;
  email: string;
}> {
  public $resource(): string {
    return 'users';
  }
}