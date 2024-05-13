const errorHandler = require('../utils/error.handler');
const db = require("../middleware/middleware");
const SenderLocationSchema = db.sender_location;
const Op = db.Sequelize.Op;

class SenderLocationController {


    async add(body) {
        try {
           let resCreate = await SenderLocationSchema.create(body);
            let response = await SenderLocationSchema.findByPk(resCreate.id);
            return {
                status: "success", msg:"data Created successfully", result: response
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
            return { status: "success",   msg:"data get successfully", result: response };

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
            return { status: "success",   msg:"data Deleted successfully", result: response };

        } catch (error) {
            return {
                status: "error",
                error: errorHandler.parseMongoError(error)
            };
        }
    }

    async update(id, body) {
        try {
            let updateresponse = await SenderLocationSchema.update(body, {
                where: { id: id }
            });
            let response = await SenderLocationSchema.findByPk(id);
            return { status: "success", msg: "Data Updated successfully", result: response };    
             } catch (error) {
            return { status: "error", error: error };
        }

    }


}



module.exports = new SenderLocationController();