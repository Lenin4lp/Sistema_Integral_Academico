import {
  AfterSync,
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Group } from "./group.model";

@Table({
  tableName: "periodo_academico",
  timestamps: false,
})
export class Period extends Model {
  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    field: "id_periodo",
    primaryKey: true,
    unique: true,
  })
  period_id!: string;

  @Column({
    type: DataType.STRING(16),
    allowNull: false,
    field: "nombre_periodo",
    unique: true,
  })
  period_name!: string;

  @HasMany(() => Group)
  group!: Group[];
}
