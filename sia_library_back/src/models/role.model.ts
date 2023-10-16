// @ts-check
import {
    Model,
    DataType,
    Table,
    Column,
    AutoIncrement,
    AfterSync,
    HasMany,
  } from "sequelize-typescript";
  import { User } from "./user.model";
  
  @Table({
    tableName: "rol",
    timestamps: false,
  })
  export class Role extends Model {
    // Roles predefinidos (Siempre van a estar por defecto en la db)
    static STUDENT_ROLE: string = "estudiante";
    static TEACHER_ROLE: string = "docente";
    static ADMIN_ROLE: string = "administrador";
    static SUPERADMIN_ROLE: string = "superadministrador";
  
    @AutoIncrement
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
      field: "id_rol",
      primaryKey: true,
      unique: true,
    })
    role_id!: number;
  
    @Column({
      type: DataType.STRING(25),
      allowNull: false,
      field: "nombre_rol",
      unique: true,
    })
    role_name!: string;
  
    @Column({
      type: DataType.STRING(200),
      allowNull: true,
      field: "descripcion",
    })
    role_description!: string;
  
    //   Metodo para crear roles por defecto
    @AfterSync
    static createDefaultRoles = async () => {
      const defaultRoles = [
        {
          role_name: Role.STUDENT_ROLE,
          role_description:
            "Accede a recursos, calificaciones, y cumple actividades academicas",
        },
        {
          role_name: Role.TEACHER_ROLE,
          role_description:
            "Crea, modifica y elimina recursos, asigna tareas y administra notas de estudiantes",
        },
        {
          role_name: Role.ADMIN_ROLE,
          role_description:
            "Crea, modifica y elimina recursos, estudiantes y docentes. Accede y administra cursos, carreras y calificaciones",
        },
        {
          role_name: Role.SUPERADMIN_ROLE,
          role_description:
            "Administra toda la plataforma: Creacion, eliminacion y modificacion de recursos, estudiantes, docentes y administradores.",
        },
      ];
      try {
        for (const singleRole of defaultRoles) {
          await Role.findOrCreate({
            where: {
              role_name: singleRole.role_name,
            },
            defaults: singleRole,
          });
        }
  
        console.log("Roles por defecto creados exitosamente");
      } catch (error) {
        console.log("Oops, algo malio sal: ", error);
      }
    };
    @HasMany(() => User)
    user!: User[];
  }
  