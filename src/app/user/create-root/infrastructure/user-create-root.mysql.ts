import { connectionMySql } from "../../../shared/persistence/connection.mysql";
import { SqlConnection } from "../../../shared/persistence/IConnection";
import { IUserRootCreateRepository } from "../domain/user.create-root";
import { User } from "../../shared/user";



export class UserCreateRootMysql implements IUserRootCreateRepository {

    constructor(private readonly provider: SqlConnection) { }

    async handle(user: User): Promise<void> {
        const connection = await this.provider.getConnection();
        try {
            const statament = 'insert into users(idUser,email,password,profile,userCreate) values(UUID_TO_BIN(?),?,?,?,UUID_TO_BIN(?))';
            const { id, email, password, profile } = user.toPrimitives()
            await connection.query(statament, [id, email, password, profile, id])
        } catch (error) {
            throw error
        } finally {
            connection.end();
        }
    }
}

const userCreateRootMysql = new UserCreateRootMysql(connectionMySql)
export { userCreateRootMysql }