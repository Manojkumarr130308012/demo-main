const db = require("../middleware/middleware");
const locationSchema = db.location;
const Op = db.Sequelize.Op;

class LocationController {


    async add(body) {
        try {
            await locationSchema.create(body);
            return {
                status: 'success',
                msg: 'Location created'
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
            let response = await locationSchema.update(body, {
                where: { id: id }
            });
            return { status: "success", msg: "Location Updated successfully", result: response };
        } catch (error) {
            return { status: "error", error: error };
        }

    }


}



module.exports = new LocationController();