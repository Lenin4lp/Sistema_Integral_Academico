// @ts-check
import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  BeforeCreate,
} from "sequelize-typescript";
import { Degree } from "./degree.model";
import { v4 as uuidv4 } from "uuid";

@Table({
  tableName: "libro",
  timestamps: true,
})
export class Book extends Model {
  @Column({
    type: DataType.STRING(15),
    allowNull: true,
    field: "id_libro",
    primaryKey: true,
    unique: true,
  })
  book_id!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: "nombre_libro",
  })
  book_name!: string;

  @Column({
    type: DataType.STRING(80),
    allowNull: true,
    field: "autor_libro",
  })
  book_author!: string;

  @Column({
    type: DataType.STRING(4),
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
    type: DataType.STRING(50),
    allowNull: true,
    field: "editorial_libro",
  })
  book_editorial!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    field: "url_libro",
  })
  book_url!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: "clasificacion_libro",
  })
  book_classification!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    field: "portada_libro",
  })
  book_cover!: string;

  @ForeignKey(() => Degree)
  @Column({
    type: DataType.STRING(10),
    allowNull: true,
    field: "id_carrera",
  })
  degree_id!: string;

  @BelongsTo(() => Degree)
  degree!: Degree;

  @BeforeCreate
  static async automatizeCreation(book: Book) {
    const bookIdentificator = "BK";
    const generatedUuid = uuidv4().substring(0, 6);
    book.book_id = `${bookIdentificator}${generatedUuid}`;
  }
}
