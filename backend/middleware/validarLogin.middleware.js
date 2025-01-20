import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import loginSchema from '../schema/login.schema.js';

const ajv = new Ajv();
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

export { validarLogin };
