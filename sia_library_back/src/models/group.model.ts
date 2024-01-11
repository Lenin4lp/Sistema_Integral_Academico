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
} from "sequelize-typescript";
import { Student } from "./student.model";
import { Subject } from "./subject.model";
import { Modality } from "./modality.model";
import { Period } from "./period.model";
import { Grade } from "./grades.model";
import { Teacher } from "./teacher.model";
import { v4 as uuidv4 } from "uuid";
import { StudentGroup } from "./studentGroup.model";

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

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    field: "estado",
  })
  group_status!: boolean;

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

  @ForeignKey(() => Teacher)
  @Column({
    type: DataType.STRING(10),
    allowNull: true,
    field: "id_docente",
  })
  teacher_id!: string;

  @BelongsToMany(() => Student, () => StudentGroup)
  student!: Student[];

  @BelongsTo(() => Modality)
  modality!: Modality;

  @BelongsTo(() => Subject)
  subject!: Subject;

  @BelongsTo(() => Period)
  period!: Period;

  @HasMany(() => Grade)
  grades!: Grade[];

  @BelongsTo(() => Teacher)
  teacher!: Teacher;

  @BeforeCreate
  static async createGroupUUID(group: Group) {
    const subjectID = group.subject_id;
    const subjectAbreviation = subjectID.substring(2, 5);
    const groupName = group.group_name
      .substring(0, 7)
      .toUpperCase()
      .replace(" ", "");
    const generatedUuid = uuidv4().substring(0, 3);

    group.group_id = `${subjectAbreviation}-${groupName}${generatedUuid}`;
  }
}
