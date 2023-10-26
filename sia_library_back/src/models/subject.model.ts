import {
    AfterSync,
    BeforeCreate,
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table,
  } from "sequelize-typescript";
  import { Teacher } from "./teacher.model";
  import { v4 as uuidv4 } from "uuid";
import { Student } from "./student.model";
  
  // TODO Tengo que pedir una lista de todas las materias de las carreras existentes para crearlas por defecto
  
  @Table({
    tableName: "materia",
    timestamps: false,
  })
  export class Subject extends Model {
    @Column({
      type: DataType.STRING(12),
      allowNull: true,
      field: "id_materia",
      primaryKey: true,
      unique: true,
    })
    subject_id!: string;
  
    @Column({
      type: DataType.STRING(50),
      allowNull: false,
      field: "nombre_materia",
      unique: true,
    })
    subject_name!: string;
  
    @Column({
      type: DataType.STRING(3),
      allowNull: false,
      field: "acronimo",
    })
    subject_acronym!: string;

    @Column({
      type: DataType.STRING(30),
      allowNull: true,
      field: "syllabus",
    })
    syllabus!: string;
  
    @ForeignKey(() => Teacher)
    @Column({
      type: DataType.STRING(10),
      allowNull: true,
      field: "id_docente",
    })
    teacher_id!: string;
  
    @BelongsTo(() => Teacher)
    teacher!: Teacher;

    @BelongsToMany(() => Student, {through: "estudiante_materia",
    foreignKey: "id_materia",
otherKey: "id_estudiante"})
    students!: Student[]
  
    @BeforeCreate
    static async automatizeSubjectId(subject: Subject) {
      const acronym = subject.subject_acronym;
      const generatedUuid = uuidv4().substring(0, 5);
      subject.subject_id = `M-${acronym}-${generatedUuid}`;
    }
  }
  