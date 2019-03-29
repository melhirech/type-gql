import { Connection } from "typeorm";
import { testConn } from "../../../test-utils/testConn";
import { gCall } from "../../../test-utils/gCall";
import faker from "faker";
import { User } from "../../../entity/User";

let conn: Connection

beforeAll(async() => {
    conn = await testConn()
})

afterAll(async() => {
    await conn.close()
})


const registerMutation = `
mutation Register($data: RegisterInput!) {
  register(
    data: $data
  ) {
    id
    firstName
    lastName
    email
    name
  }
}
`
describe("Register", () => {
    it("create user", async () => {
        const user = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(8)
        }
        const testResponse = await gCall({
            source: registerMutation,
            variableValues: {
                data: user
            }
        })

        expect(testResponse).toMatchObject({
            data: {
                register: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            }
        })

    const savedUser = await User.findOne({where: {email: user.email}})
    console.log(savedUser)
    expect(savedUser).toBeDefined()
    expect(savedUser!.confirmed).toBeFalsy()
    })
})