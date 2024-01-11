import {
  Table,
  Column,
  DataType,
  ForeignKey,
  Model,
} from "sequelize-typescript";
import { Student } from "./student.model";
import { Group } from "./group.model";

@Table({
  tableName: "grupo_estudiante",
  timestamps: false,
})
export class StudentGroup extends Model {
  @ForeignKey(() => Student)
  @Column({
    type: DataType.STRING(11),
    allowNull: false,
    field: "id_estudiante",
  })
  student_id!: string;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.STRING(14),
    allowNull: false,
    field: "id_grupo",
  })
  group_id!: string;
}
