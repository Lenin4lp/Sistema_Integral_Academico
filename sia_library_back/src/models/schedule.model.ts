import {
  Model,
  Column,
  DataType,
  Table,
  BeforeCreate,
  HasMany,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { ClassHours } from "./classHours.model";

@Table({
  tableName: "horario",
  timestamps: false,
})
export class Schedule extends Model {
  @Column({
    type: DataType.STRING(8),
    allowNull: true,
    field: "id_horario",
    primaryKey: true,
    unique: true,
  })
  schedule_id!: string;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    field: "dias_semana",
    defaultValue: ["Lu", "Ma", "Mi", "Ju", "Vi"],
  })
  days!: string[];

  @ForeignKey(() => ClassHours)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: "id_hora_clase",
  })
  classHours_id!: number;

  @BelongsTo(() => ClassHours)
  classHours!: ClassHours[];

  @BeforeCreate
  static async automatizeScheduleId(schedule: Schedule) {
    const uuid = uuidv4().substring(0, 6);
    const identificator = "SC";
    schedule.schedule_id = `${identificator}${uuid}`;
  }
}
