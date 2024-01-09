// @ts-check
import {
  Model,
  DataType,
  Table,
  Column,
  AutoIncrement,
  BelongsTo,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";
import { Modality } from "./modality.model";
import { Schedule } from "./schedule.model";

@Table({
  tableName: "horas_clase",
  timestamps: false,
})
export class ClassHours extends Model {
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: "id_hora_clase",
    primaryKey: true,
    unique: true,
  })
  classHours_id!: number;

  @Column({
    type: DataType.STRING(6),
    allowNull: true,
    field: "hora",
  })
  hour!: string;

  @ForeignKey(() => Modality)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: "id_modalidad",
  })
  modality_id!: number;

  @BelongsTo(() => Modality)
  modality!: Modality;

  @HasMany(() => Schedule)
  schedule!: Schedule;
}
