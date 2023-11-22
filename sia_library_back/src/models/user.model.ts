// @ts-check
import {
  Model,
  DataType,
  Table,
  Column,
  BeforeCreate,
  ForeignKey,
  BelongsTo,
  HasOne,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Role } from "./role.model";
import { Student } from "./student.model";
import { Teacher } from "./teacher.model";
import { Admin } from "./admin.model";

@Table({
  tableName: "usuario",
  timestamps: true,
})
export class User extends Model {
  @Column({
    type: DataType.STRING(10),
    allowNull: true,
    field: "id_usuario",
    primaryKey: true,
    unique: true,
  })
  user_id!: string;

  @Column({
    type: DataType.STRING(40),
    allowNull: false,
    field: "nombres_usuario",
  })
  user_name!: string;

  @Column({
    type: DataType.STRING(40),
    allowNull: false,
    field: "apellidos_usuario",
  })
  user_lastname!: string;

  @Column({
    type: DataType.STRING(40),
    allowNull: false,
    field: "correo_usuario",
    unique: true,
  })
  user_email!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: "contrasena_usuario",
  })
  user_password!: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
    field: "cedula_identidad",
  })
  user_ci!: string;

  @Column({
    type: DataType.STRING(80),
    allowNull: true,
    field: "direccion",
  })
  user_direction!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: "nacionalidad",
  })
  user_Citizenship!: string;

  @Column({
    type: DataType.STRING(15),
    allowNull: true,
    field: "telefono",
  })
  user_phone!: string;

  @Column({
    type: DataType.STRING(15),
    allowNull: false,
    field: "sexo",
  })
  user_genre!: string;

  @Column({
    type: DataType.STRING(11),
    allowNull: true,
    field: "fecha_nacimiento",
  })
  birth_date!: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "id_rol",
  })
  role_id!: number;

  // Metodo que crea un id personalizado segun el rol que cumple el usuario
  @BeforeCreate
  static async automatizeCreation(user: User) {
    const studentIdentificator = "ES";
    const teacherIdentificator = "DO";
    const adminIdentificator = "AD";
    const superAdminIdentificator = "SA";
    if (user.role_id === 1) {
      const generatedUuid = uuidv4().substring(0, 6);
      user.user_id = `${studentIdentificator}-${generatedUuid}`;
    } else if (user.role_id === 2) {
      const generatedUuid = uuidv4().substring(0, 6);
      user.user_id = `${teacherIdentificator}-${generatedUuid}`;
    } else if (user.role_id === 3) {
      const generatedUuid = uuidv4().substring(0, 6);
      user.user_id = `${adminIdentificator}-${generatedUuid}`;
    } else if (user.role_id === 4) {
      const generatedUuid = uuidv4().substring(0, 6);
      user.user_id = `${superAdminIdentificator}-${generatedUuid}`;
    }
  }

  @BelongsTo(() => Role)
  role!: Role;

  @HasOne(() => Student, { onDelete: "CASCADE" })
  student!: Student;

  @HasOne(() => Teacher, { onDelete: "CASCADE" })
  teacher!: Teacher;

  @HasOne(() => Admin, { onDelete: "CASCADE" })
  admin!: Admin;
}

export default User;
