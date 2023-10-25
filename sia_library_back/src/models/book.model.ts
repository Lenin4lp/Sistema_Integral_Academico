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
      type: DataType.STRING(20),
      allowNull: true,
      field: "anio_libro",
    })
    book_year!: string;

    @Column({
      type: DataType.STRING(20),
      allowNull: true,
      field: "edicion_libro",
    })
    book_edition!: string;

    @Column({
      type: DataType.STRING(20),
      allowNull: true,
      field: "autor_editorial",
    })
    book_editorial!: string;
  
    @Column({
      type: DataType.STRING(80),
      allowNull: true,
      field: "url_libro",
    })
    book_url!: string;

    @Column({
      type: DataType.STRING(20),
      allowNull: true,
      field: "clasificacion_libro",
    })
    book_classification!: string;
  
    @ForeignKey(() => Degree)
    @Column({
      type: DataType.STRING(10),
      allowNull: true,
      field: "id_carrera",
    })
    degree_id!: string;
  
  
    @BelongsTo(() => Degree)
    degree!: Degree;
  }
  