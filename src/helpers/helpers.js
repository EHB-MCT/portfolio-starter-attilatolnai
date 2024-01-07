/*
table.string('username').notNullable();
table.string('password').notNullable();
table.string('infoName').notNullable();
table.string('description').notNullable();
*/

/**Check if the name is acceptable
* @params : name
* @returns : if name is not acceptable return false, otherwise return true
*/

function checkName(name){
    if(name == null || name.length <=1 || typeof(name)!="string" || name.length >= 30){
        return false
    }
    return true
}


module.exports = {
    checkName
}