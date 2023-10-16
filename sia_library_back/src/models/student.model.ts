// @ts-check
import {
    Model,
    DataType,
    Table,
    Column,
    ForeignKey,
    BelongsTo,
    BelongsToMany,
    HasOne,
    HasMany,
  } from "sequelize-typescript";
  import { User } from "./user.model";
import { Degree } from "./degree.model";
  
  
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
  
    @BelongsTo(() => User, { onDelete: "CASCADE" })
    user!: User;

    @BelongsTo(() => Degree)
  degree!: Degree;

    @BelongsToMany(() => Student, { through: "estudiante_materia",
    foreignKey: "id_estudiante",
    otherKey: "id_materia"})
    students!: Student[];
  
  }
  