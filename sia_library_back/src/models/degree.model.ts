import {
    AfterSync,
    BeforeCreate,
    BelongsToMany,
    Column,
    DataType,
    HasMany,
    Model,
    Table,
  } from "sequelize-typescript";
  import { Student } from "./student.model";
  import { v4 as uuidv4 } from "uuid";
import { Book } from "./book.model";
  
  @Table({
    tableName: "carrera",
    timestamps: false,
  })
  export class Degree extends Model {
  
    @Column({
      type: DataType.STRING(10),
      allowNull: true,
      field: "id_carrera",
      primaryKey: true,
      unique: true,
    })
    degree_id!: string;
  
    @Column({
      type: DataType.STRING(30),
      allowNull: false,
      field: "nombre_carrera",
      unique: true,
    })
    degree_name!: string;
  
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
      field: "n°_semestres",
    })
    degree_duration!: number;
  
    @Column({
      type: DataType.STRING(100),
      allowNull: true,
      field: "malla_curricular",
    })
    degree_curriculum_framework!: string;
  
    @Column({
      type: DataType.STRING(3),
      allowNull: false,
      field: "acronimo",
    })
    degree_acronym!: string;
  
    @HasMany(() => Student)
    student!: Student[];

    @HasMany(()=> Book)
  book!: Book[];
  
    @BeforeCreate
    static async automatizeDegreeId(degree: Degree) {
      const acronym = degree.degree_acronym;
      const generatedUuid = uuidv4().substring(0, 6);
      degree.degree_id = `${acronym}-${generatedUuid}`;
    }
  }
  