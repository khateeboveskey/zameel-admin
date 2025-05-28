import { Model } from "@tailflow/laravel-orion/lib/model";

export class Major extends Model<{
  name: string;
  college_id: number;
  degree_id: number;
  years: number;
}> {
  public $resource(): string {
    return 'majors';
  }
}