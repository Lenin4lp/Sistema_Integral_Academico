// @ts-check
import {
  Model,
  DataType,
  Table,
  Column,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  HasMany,
} from "sequelize-typescript";
import { User } from "./user.model";
import { Degree } from "./degree.model";
import { Subject } from "./subject.model";
import { Modality } from "./modality.model";
import { Grade } from "./grades.model";
import { Group } from "./group.model";
import { StudentGroup } from "./studentGroup.model";

@Table({
  tableName: "estudiante",
  timestamps: true,
})
export class Student extends Model {
  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    field: "id_estudiante",
    primaryKey: true,
  })
  student_id!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    field: "id_usuario",
  })
  user_id!: string;

  @ForeignKey(() => Degree)
  @Column({
    type: DataType.STRING(10),
    allowNull: true,
    field: "id_carrera",
  })
  degree_id!: string;

  @ForeignKey(() => Modality)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: "id_modalidad",
  })
  modality_id!: number;

  @BelongsToMany(() => Group, () => StudentGroup)
  group!: Group[];

  @HasMany(() => Grade)
  grades!: Grade[];

  @BelongsTo(() => User, { onDelete: "CASCADE" })
  user!: User;

  @BelongsTo(() => Degree)
  degree!: Degree;

  @BelongsTo(() => Modality)
  modality!: Modality;
}
