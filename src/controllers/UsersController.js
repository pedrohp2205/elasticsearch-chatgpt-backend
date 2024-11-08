const AppError = require("../utils/AppError")
const { hash, compare } = require("bcryptjs");
const knex = require("../database")

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body;

        const checkUserExists = await knex("users").where( { email } )

        if(checkUserExists.length > 0 ) {
            throw new AppError ("Este email ja está em uso.")
        }

        const hashedPassword = await hash(password, 8);

        await knex("users").insert({
            name,
            email,
            password: hashedPassword
        })

        return response.status(201).json("");
    }


    async update(request, response) {
        const { name, email, password, old_password } = request.body;
        const id  = request.user.id;

        const user = await knex("users").where( { id } ).first()

        if(!user) {
            throw new AppError("Usuário não encontrado.")
        }   

        const userWithUpdatedEmail = await knex("users").where( {email} ).first()


        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError("Email já em uso")
        }



        if(password && !old_password) {
            throw new AppError("Você precisa informar a senha antiga para definir a nova senha.")
        }

        if(password && old_password) {
            const checkOldPassword = await compare(old_password, user.password)

            if(!checkOldPassword) {
                throw new AppError("As senhas não batem")
            }

            user.password = await hash(password, 8 )
        }


        await knex("users").where({ id }).update({
            name: name || user.name,
            email: email || user.email,
            password: user.password
        }, ['id', 'name', 'email', 'password'])

        return response.json()
    }
}

module.exports = UsersController