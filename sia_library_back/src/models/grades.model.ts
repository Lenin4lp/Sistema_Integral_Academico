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
      field: "final_grade",
    })
    final_grade!: number;

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

  }