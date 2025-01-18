const Ajv = require('ajv');
const ajv = new Ajv();
const addFormats = require("ajv-formats");
const loginSchema = require('../schema/login.schema');

addFormats(ajv);

function validarLogin(req, res, next) {
    const login = req.body;
    const validate = ajv.compile(loginSchema);
    const valid = validate(login);

    if (valid) {
        next();
    } else {
        res.status(400).json({ msg: "Dados inválidos", erros: validate.errors });
    }
}

module.exports = validarLogin;
