import {
  AfterSync,
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Degree } from "./degree.model";
import { Student } from "./student.model";
import { Group } from "./group.model";

@Table({
  tableName: "modalidad",
  timestamps: false,
})
export class Modality extends Model {
  static PRESENCIAL_MATUTINO: string = "presencial matutino";
  static PRESENCIAL_VESPERTINO: string = "presencial vespertino";
  static VIRTUAL: string = "virtual";
  static INTENSIVO: string = "intensivo";

  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "id_modalidad",
    primaryKey: true,
    unique: true,
  })
  modality_id!: number;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
    field: "nombre_modalidad",
    unique: true,
  })
  modality_name!: string;

  @Column({
    type: DataType.STRING(15),
    allowNull: true,
    field: "horario_modalidad",
  })
  modality_schedule!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    field: "estado_modalidad",
  })
  modality_status!: boolean;

  @BelongsToMany(() => Degree, {
    through: "carrera_modalidad",
    foreignKey: "id_modalidad",
    otherKey: "id_carrera",
  })
  degree!: Degree[];

  @HasMany(() => Student)
  student!: Student[];

  @HasMany(() => Group)
  group!: Group[];

  @AfterSync
  static createDefaultModalities = async () => {
    const defaultModalities = [
      {
        modality_name: Modality.PRESENCIAL_MATUTINO,
        modality_schedule: "8h00 - 12h30",
        modality_status: true,
      },
      {
        modality_name: Modality.VIRTUAL,
        modality_schedule: "18h00 - 21h00",
        modality_status: true,
      },
    ];
    try {
      for (const singleModality of defaultModalities) {
        await Modality.findOrCreate({
          where: {
            modality_name: singleModality.modality_name,
          },
          defaults: singleModality,
        });
      }
      console.log("Modalidades por defecto creadas exitosamente");
    } catch (error) {
      console.log("Oops, algo malio sal: ", error);
    }
  };
}
