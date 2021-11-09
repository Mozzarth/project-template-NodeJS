import { EmailAddres } from "../../../shared/domain/valueobjects/email/emailaddres";
import { connectionMySql } from "../../../shared/persistence/connection.mysql";
import { SqlConnection } from "../../../shared/persistence/IConnection";
import { IUserFind, IUserFindRepository } from "../domain/user.find";
import { Uuid } from "../../../shared/domain/valueobjects/uuid";
import { Profiles } from "../../shared/user.profiles";
import { RowDataPacket } from "mysql2/promise";


export class UserFindMysql implements IUserFindRepository {

    constructor(private readonly provider: SqlConnection) { }


    async all(): Promise<IUserFind[]> {
        const connection = await this.provider.getConnection();
        try {
            const data = await connection.query(`
                        SELECT
                            BIN_TO_UUID(idUSer) as idUser,
                            email,
                            password,
                            profile,
                            created,
                            if(isnull(userCreate)=1,null,BIN_TO_UUID(userCreate)) as userCreate,
                            if(isnull(userUpdate)=1,null,BIN_TO_UUID(userUpdate)) as userUpdate,
                            updateAt
                        FROM users;`, [])
            // console.log(data)
            const result = (data[0] as any)
            return result
        } catch (error) {
            throw error
        } finally {
            connection.release();
        }
    }
    async root(): Promise<IUserFind | undefined> {
        const connection = await this.provider.getConnection();
        try {
            const data = await connection.query<RowDataPacket[][]>(`
                        SELECT
                            BIN_TO_UUID(idUSer) as idUser,
                            email,
                            password,
                            profile,
                            created,
                            if(isnull(userCreate)=1,null,BIN_TO_UUID(userCreate)) as userCreate,
                            if(isnull(userUpdate)=1,null,BIN_TO_UUID(userUpdate)) as userUpdate,
                            updateAt
                        FROM users where profile = ? and active = 1;`, [Profiles.ROOT])
            const result: any = data[0][0]
            return (result as IUserFind | undefined)
            return undefined
        } catch (error) {
            throw error
        } finally {
            connection.release();
        }
    }
    async byId(id: Uuid): Promise<IUserFind | undefined> {
        const connection = await this.provider.getConnection();
        try {
            const data = await connection.query<RowDataPacket[][]>(`
                        SELECT
                            BIN_TO_UUID(idUSer) as idUser,
                            email,
                            password,
                            profile,
                            created,
                            if(isnull(userCreate)=1,null,BIN_TO_UUID(userCreate)) as userCreate,
                            if(isnull(userUpdate)=1,null,BIN_TO_UUID(userUpdate)) as userUpdate,
                            updateAt
                        FROM users where idUSer = UUID_TO_BIN(?) and active = 1;`, [id.toString()])
            const result: any = data[0][0]
            return (result as IUserFind | undefined)
        } catch (error) {
            throw error
        } finally {
            connection.release();
        }
    }

    async byEmail(email: EmailAddres): Promise<IUserFind | undefined> {
        const connection = await this.provider.getConnection();
        try {
            const data = await connection.query<RowDataPacket[][]>(`SELECT
                            BIN_TO_UUID(idUSer) as idUser,
                            email,
                            profile,
                            password,
                            created,
                            if(isnull(userCreate)=1,null,BIN_TO_UUID(userCreate)) as userCreate,
                            if(isnull(userUpdate)=1,null,BIN_TO_UUID(userUpdate)) as userUpdate,
                            updateAt
            FROM users where email = ? and active = 1;`, [email.toString()])
            const result: any = data[0][0]
            return (result as IUserFind | undefined)
        } catch (error) {
            throw error
        } finally {
            connection.release();
        }
    }

}

const userFindMysql = new UserFindMysql(connectionMySql)
export { userFindMysql }