// @ts-check
import {
    Model,
    DataType,
    Table,
    Column,
    ForeignKey,
    BelongsTo,
    PrimaryKey,
  } from "sequelize-typescript";
  import { User } from "./user.model";
  
  @Table({
    tableName: "administrador",
    timestamps: true,
  })
  export class Admin extends Model {
    @Column({
      type: DataType.STRING(10),
      allowNull: false,
      field: "id_admin",
      primaryKey: true,
    })
    admin_id!: string;
  
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
  