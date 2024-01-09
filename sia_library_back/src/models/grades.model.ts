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
  AfterCreate,
  AfterUpdate,
  BeforeUpdate,
} from "sequelize-typescript";
import { Student } from "./student.model";
import { Group } from "./group.model";
import { v4 as uuidv4 } from "uuid";

@Table({
  tableName: "calificaciones",
  timestamps: false,
})
export class Grade extends Model {
  @Column({
    type: DataType.STRING(6),
    allowNull: true,
    field: "id_calificacion",
    primaryKey: true,
    unique: true,
  })
  grade_id!: string;

  @Column({
    type: DataType.DECIMAL(4, 2),
    allowNull: true,
    field: "grade_1",
  })
  grade_1!: number;

  @Column({
    type: DataType.DECIMAL(4, 2),
    allowNull: true,
    field: "grade_2",
  })
  grade_2!: number;

  @Column({
    type: DataType.DECIMAL(4, 2),
    allowNull: true,
    field: "test_1",
  })
  test_1!: number;

  @Column({
    type: DataType.DECIMAL(4, 2),
    allowNull: true,
    field: "exam_1",
  })
  exam_1!: number;

  @Column({
    type: DataType.DECIMAL(4, 2),
    allowNull: true,
    field: "prom_1",
  })
  prom_1!: number;

  @Column({
    type: DataType.DECIMAL(4, 2),
    allowNull: true,
    field: "grade_3",
  })
  grade_3!: number;

  @Column({
    type: DataType.DECIMAL(4, 2),
    allowNull: true,
    field: "grade_4",
  })
  grade_4!: number;

  @Column({
    type: DataType.DECIMAL(4, 2),
    allowNull: true,
    field: "test_2",
  })
  test_2!: number;

  @Column({
    type: DataType.DECIMAL(4, 2),
    allowNull: true,
    field: "exam_2",
  })
  exam_2!: number;

  @Column({
    type: DataType.DECIMAL(4, 2),
    allowNull: true,
    field: "prom_2",
  })
  prom_2!: number;

  @Column({
    type: DataType.DECIMAL(4, 2),
    allowNull: true,
    field: "supletorio",
  })
  resit!: number;

  @Column({
    type: DataType.DECIMAL(4, 2),
    allowNull: true,
    field: "final_grade",
  })
  final_grade!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: "asistencia_1",
  })
  attendance_1!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: "asistencia_2",
  })
  attendance_2!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: "asistencia_total",
  })
  total_attendance!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: "estado",
  })
  status!: string;

  @Column({
    type: DataType.DECIMAL(4, 2),
    allowNull: true,
    field: "total",
  })
  total!: number;

  @ForeignKey(() => Student)
  @Column({
    type: DataType.STRING(10),
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

  @BelongsTo(() => Student)
  student!: Student;

  @BelongsTo(() => Group)
  group!: Group;

  @BeforeCreate
  static async automatizeGradeId(grade: Grade) {
    const uuid = uuidv4().substring(0, 6);
    grade.grade_id = uuid;
  }

  @BeforeCreate
  @BeforeUpdate
  static async updateProm(grade: Grade) {
    const grade1 = grade.grade_1 * 0.15;
    const grade2 = grade.grade_2 * 0.15;
    const test1 = grade.test_1 * 0.3;
    const exam1 = grade.exam_1 * 0.4;
    const grade3 = grade.grade_3 * 0.15;
    const grade4 = grade.grade_4 * 0.15;
    const test2 = grade.test_2 * 0.3;
    const exam2 = grade.exam_2 * 0.4;
    grade.prom_1 = grade1 + grade2 + test1 + exam1;
    grade.prom_2 = grade3 + grade4 + test2 + exam2;
  }

  @BeforeCreate
  @BeforeUpdate
  static async updateFinalGrade(grade: Grade) {
    const prom1 = grade.prom_1;
    const prom2 = grade.prom_2;
    const finalGrade = (prom1 + prom2) / 2;
    const resit = grade.resit;
    grade.final_grade = finalGrade;
    grade.total = (finalGrade + resit) / 2;
  }
  @BeforeCreate
  @BeforeUpdate
  static async updateAttendance(grade: Grade) {
    const attend1 = grade.attendance_1;
    const attend2 = grade.attendance_2;
    const totalAttendance = (attend1 + attend2) / 2;
    grade.total_attendance = totalAttendance;
  }
}
