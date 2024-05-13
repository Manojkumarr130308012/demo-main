const errorHandler = require('../utils/error.handler');
const db = require("../middleware/middleware");
const receiverLocationSchema = db.receiver_location;
const Op = db.Sequelize.Op;

class ReceiverLocationController {


    async add(body) {
        try {
            await receiverLocationSchema.create(body);
            return {
                status: 'success',
                msg: 'ReceiverLocation created'
            }
        } catch (err) {
            return {
                status: 'error',
                msg: 'ReceiverLocation creation failed'
            }
        }
    }


    async fetch(name) {
        try {

            var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

            let response = await receiverLocationSchema.findAll({ where: condition });
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
            let response = await receiverLocationSchema.findByPk(id);
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
            let response = await receiverLocationSchema.destroy({
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
            let response = await receiverLocationSchema.update(body, {
                where: { id: id }
            });
            return { status: "success", msg: "ReceiverLocation Updated successfully", result: response };
        } catch (error) {
            return { status: "error", error: error };
        }

    }


}



module.exports = new ReceiverLocationController();