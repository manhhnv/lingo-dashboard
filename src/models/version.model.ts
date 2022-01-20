import { BaseModel } from "./base.model";

export class VersionModel extends BaseModel {
  description: string | undefined;
  tag: string | undefined;
  os: "Android" | "iOs" | undefined;
}

export class UpdateVersionModel {
  id: string | undefined;
  description: string | undefined;
  tag: string | undefined;
}

export class CreatVersionModel {
  description: string | undefined;
  tag: string | undefined;
  os: string | undefined;
}
