const db = require("../middleware/middleware");
const itemSchema = db.item;
const Op = db.Sequelize.Op;

class ItemController {


    async add(body) {
        try {
            await itemSchema.create(body);
            return {
                status: 'success',
                msg: 'Item created'
            }
        } catch (err) {
            return {
                status: 'error',
                msg: 'Item creation failed'
            }
        }
    }



    async fetch(name) {
        try {

            var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

            let response = await itemSchema.findAll({ where: condition });
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
            let response = await itemSchema.findByPk(id);
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
            let response = await itemSchema.destroy({
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
            let response = await itemSchema.update(body, {
                where: { id: id }
            });
            return { status: "success", msg: "Item Updated successfully", result: response };
        } catch (error) {
            return { status: "error", error: error };
        }

    }


}


module.exports = new ItemController();