/*
table.string('username').notNullable();
table.string('password').notNullable();
table.string('infoName').notNullable();
table.string('description').notNullable();
*/

const {checkName} = require ("./../../helpers/helpers.js");

test("check name", () => {
    expect(checkName("")).toBe(false);
    expect(checkName(null)).toBe(false);
    expect(checkName("i")).toBe(false);
    expect(checkName(1)).toBe(false);
    expect(checkName("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")).toBe(false);


    expect(checkName("attila")).toBe(true);
    expect(checkName("attila tolnai")).toBe(true);
})