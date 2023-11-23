// @ts-check
import {
  Model,
  DataType,
  Table,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
  BeforeCreate,
  AfterSync,
} from "sequelize-typescript";
import { Student } from "./student.model";
import { Subject } from "./subject.model";
import { Modality } from "./modality.model";
import { Period } from "./period.model";
import { Grade } from "./grades.model";

@Table({
  tableName: "grupo",
  timestamps: false,
})
export class Group extends Model {
  @Column({
    type: DataType.STRING(14),
    allowNull: true,
    field: "id_grupo",
    primaryKey: true,
    unique: true,
  })
  group_id!: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    field: "nombre_grupo",
  })
  group_name!: string;

  @ForeignKey(() => Subject)
  @Column({
    type: DataType.STRING(12),
    allowNull: false,
    field: "id_materia",
  })
  subject_id!: string;

  @ForeignKey(() => Modality)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "id_modalidad",
  })
  modality_id!: number;

  @ForeignKey(() => Period)
  @Column({
    type: DataType.STRING(10),
    allowNull: true,
    field: "id_periodo",
  })
  period_id!: string;

  @BelongsToMany(() => Student, {
    through: "grupo_estudiante",
    foreignKey: "id_grupo",
    otherKey: "id_estudiante",
  })
  student!: Student[];

  @BelongsTo(() => Modality)
  modality!: Modality;

  @BelongsTo(() => Subject)
  subject!: Subject;

  @BelongsTo(() => Period)
  period!: Period;

  @HasMany(() => Grade)
  grades!: Grade[];

  @BeforeCreate
  static async createGroupUUID(group: Group) {
    const subjectID = group.subject_id;
    const subjectAbreviation = subjectID.substring(2, 5);
    const groupName = group.group_name
      .substring(0, 7)
      .toUpperCase()
      .replace(" ", "");

    group.group_id = `${subjectAbreviation}-${groupName}`;
  }
}
