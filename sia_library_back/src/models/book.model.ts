// @ts-check
import {
    Model,
    Table,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
  } from "sequelize-typescript";
  import { Degree } from "./degree.model";
  
  @Table({
    tableName: "libro",
    timestamps: true,
  })
  export class Book extends Model {
    @Column({
      type: DataType.STRING(10),
      allowNull: false,
      field: "id_libro",
      primaryKey: true,
      unique: true,
    })
    book_id!: string;
  
    @Column({
      type: DataType.STRING(30),
      allowNull: false,
      field: "nombre_libro",
      
    })
    book_name!: string;
  
    @Column({
      type: DataType.STRING(20),
      allowNull: true,
      field: "autor_libro",
    })
    book_author!: string;
  
    @Column({
      type: DataType.STRING(80),
      allowNull: true,
      field: "url_libro",
    })
    book_url!: string;
  
    @ForeignKey(() => Degree)
    @Column({
      type: DataType.STRING(10),
      allowNull: false,
      field: "id_carrera",
    })
    degree_id!: string;
  
  
    @BelongsTo(() => Degree)
    degree!: Degree;
  }
  