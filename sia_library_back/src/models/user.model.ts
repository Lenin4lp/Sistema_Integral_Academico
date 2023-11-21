// @ts-check
import {
  Model,
  DataType,
  Table,
  Column,
  BeforeCreate,
  BeforeUpdate,
  ForeignKey,
  BelongsTo,
  HasOne,
  AfterSync,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Role } from "./role.model";
import { Student } from "./student.model";
import { Teacher } from "./teacher.model";
import { Admin } from "./admin.model";
import bcrypt from "bcryptjs";
import getUserInfo from "../libs/getUserInfo";
import { jwtUtils } from "../auth/sign";
import { Token } from "./token.model";

const generateAccessToken = jwtUtils.generateAccessToken;
const generateRefreshToken = jwtUtils.generateRefreshToken;

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

  @BeforeCreate
  static async automatizePassword(user: User) {
    if (user.changed('user_password')) {
      const hash = await bcrypt.hash(user.user_password, 10);
      user.user_password = hash;
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

  public async isCorrectPassword(password: string, hash: string): Promise<boolean> {
    const same = await bcrypt.compare(password, hash);
    return same;
  }
  public createAccessToken(): string {
    return generateAccessToken(getUserInfo(this));
  }
  public async createRefreshToken(): Promise<string> {
    const refreshToken = generateRefreshToken(getUserInfo(this));
    try {
      await Token.create({ token: refreshToken });
      console.log('Token saved', refreshToken);
      return refreshToken;
    } catch (error) {
      console.error(error);
      //next(new Error("Error creating token"));
      throw new Error('Error creating token');
    }
  }
  public async userNameExists(user_name: string): Promise<boolean> {
    const result = await User.findAll({
      where: {
        user_name,
      },
    });
    return result.length > 0;
  }
}

export default User;







