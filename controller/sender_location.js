const errorHandler = require('../utils/error.handler');
const db = require("../middleware/middleware");
const SenderLocationSchema = db.sender_location;
const Op = db.Sequelize.Op;

class SenderLocationController {


    async add(body) {
        try {
            await SenderLocationSchema.create(body);
            return {
                status: 'success',
                msg: 'SenderLocation created'
            }
        } catch (err) {
            return {
                status: 'error',
                msg: 'SenderLocation creation failed'
            }
        }
    }


    async fetch(name) {
        try {

            var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

            let response = await SenderLocationSchema.findAll({ where: condition });
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
            let response = await SenderLocationSchema.findByPk(id);
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
            let response = await SenderLocationSchema.destroy({
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
            let response = await SenderLocationSchema.update(body, {
                where: { id: id }
            });
            return { status: "success", msg: "SenderLocation Updated successfully", result: response };
        } catch (error) {
            return { status: "error", error: error };
        }

    }


}



module.exports = new SenderLocationController();