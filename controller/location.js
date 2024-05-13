const db = require("../middleware/middleware");
const locationSchema = db.location;
const Op = db.Sequelize.Op;

class LocationController {


    async add(body) {
        try {
            let resCreate =  await locationSchema.create(body);
            let response = await locationSchema.findByPk(resCreate.id);
            return {
                status: "success", msg:"data Created successfully", result: response
            }
        } catch (err) {
            return {
                status: 'error',
                msg: 'Location creation failed'
            }
        }
    }



    async fetch(name) {
        try {

            var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

            let response = await locationSchema.findAll({ where: condition });
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
            let response = await locationSchema.findByPk(id);
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
            let response = await locationSchema.destroy({
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
            let updateresponse = await locationSchema.update(body, {
                where: { id: id }
            });
            let response = await locationSchema.findByPk(id);
            return { status: "success", msg: "Data Updated successfully", result: response };
        } catch (error) {
            return { status: "error", error: error };
        }

    }


}



module.exports = new LocationController();