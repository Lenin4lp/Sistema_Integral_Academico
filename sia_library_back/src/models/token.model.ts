import {
    Model,DataType,Table,Column,ForeignKey, BeforeCreate
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

@Table({
    tableName: "token",
    timestamps: false,
})
export class Token extends Model {
    @Column({
        type: DataType.STRING(10),
        allowNull: true,
        field: "id_token",
        primaryKey: true,
    })
    token_id!: string;

    @Column({
        type: DataType.STRING(10),
        allowNull: false,
        field: "token",
    })
    token!: string;

    @BeforeCreate
  static async automatizeSubjectId(token: Token) {
    
    const generatedUuid = uuidv4().substring(0, 8);
    token.token_id = `${generatedUuid}`;
  }
}