const loginSchema = {
    type: "object",
    properties: {
        email: {
            type: "string",
            format: "email" // Validação do formato de email
           
        },
        senha: {
            type: "string",
            minLength: 6 // Senha deve ter no mínimo 6 caracteres
        }
    },
    required: ["email", "senha"], // Campos obrigatórios
    additionalProperties: false // Bloqueia outros campos não especificados
};

module.exports = loginSchema;
