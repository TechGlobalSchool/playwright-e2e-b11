import { test, expect } from "../../fixtures/test-data-fixtures";
import { executeQuery } from "../../utils/dbUtils";

test.describe("API e2e test together with DB", () => {
  test("Create a new student using POST", async ({ request, newStudent }) => {
    const response = await request.post(process.env.API_ENDPOINT!, {
      // headers: {
      //   'Content-type': 'application/json',
      //   'Authorization': `Bearer ${process.env.API_TOKEN}`
      // },
      data: newStudent,
    });

    // console.log(JSON.stringify(response, null, 2));

    const responseBody = await response.json()
    console.log(responseBody)

    expect(response.status()).toBe(201)
    expect(response.ok()).toBeTruthy()

    const name = responseBody.FIRST_NAME

    console.log("NAME: " + name)
    console.log('DOB: ' + responseBody.DOB)

    for(const key in newStudent) {
      expect(responseBody[key]).toBe(newStudent[key])
    }

    const query = `SELECT * FROM students WHERE email = '${newStudent.EMAIL}'`
    
    const result = await executeQuery(query)
    console.log(JSON.stringify(result, null, 2))
    const dbRow = result[0]

    for(const key in newStudent) {
      if(key === 'DOB') {
        // console.log(dbRow[key].toISOString() + ' CONVERTED VERSION')
        // After splitting ---> ['1990-01-01', 'T06:00:00.000Z']
        const receivedString = dbRow[key].toISOString().split('T')[0]
        expect(receivedString).toBe(newStudent[key])
      } else {
        expect(dbRow[key]).toBe(newStudent[key])
      }
    }

    expect(result).toBeDefined()
    expect(result.length).toBe(1)
  });
});
