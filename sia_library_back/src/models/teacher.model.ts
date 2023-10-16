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
  
  @Table({
    tableName: "docente",
    timestamps: true,
  })
  export class Teacher extends Model {
    @Column({
      type: DataType.STRING(10),
      allowNull: true,
      field: "id_docente",
      primaryKey: true,
    })
    teacher_id!: string;
  
    @Column({
      type: DataType.STRING(30),
      allowNull: true,
      field: "espacialidad_docente",
    })
    speciality!: string;
  
    @ForeignKey(() => User)
    @Column({
      type: DataType.STRING(10),
      allowNull: false,
      field: "id_usuario",
    })
    user_id!: string;
  
    @BelongsTo(() => User, { onDelete: "CASCADE" })
    user!: User;
  }
  