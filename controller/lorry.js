const db = require("../middleware/middleware");
const lorrySchema = db.lorry;
const Op = db.Sequelize.Op;

class LorryController {


    async add(body) {
        try {
            await lorrySchema.create(body);
            return {
                status: 'success',
                msg: 'Lorry created'
            }
        } catch (err) {
            return {
                status: 'error',
                msg: 'Branch creation failed'
            }
        }
    }



    async fetch(name) {
        try {

            var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

            let response = await lorrySchema.findAll({ where: condition });
            let count = Object.keys(response).length;
            return {
                response: response,
                count: count
            };
        } catch (error) {
            return {
                status: "error",
                error: errorHandler.parseMongoError(error)
            };
        }
    }


    async fetchdata(id) {
        try {
            let response = await lorrySchema.findByPk(id);
            return response;
        } catch (error) {
            return {
                status: "error",
                error: errorHandler.parseMongoError(error)
            };
        }
    }

    async delete(id) {
        try {
            let response = await lorrySchema.destroy({
                where: { id: id }
            });
            return {
                status: "success",
                response: response
            };
        } catch (error) {
            return {
                status: "error",
                error: errorHandler.parseMongoError(error)
            };
        }
    }

    async update(id, body) {
        try {
            let response = await lorrySchema.update(body, {
                where: { id: id }
            });
            return { status: "success", msg: "Lorry Updated successfully", result: response };
        } catch (error) {
            return { status: "error", error: error };
        }

    }


}



module.exports = new LorryController();