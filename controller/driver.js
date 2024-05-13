const errorHandler = require('../utils/error.handler');
const db = require("../middleware/middleware");
const driverSchema = db.driver;
const Op = db.Sequelize.Op;

class DriverController {


    async add(body) {
        try {
            await driverSchema.create(body);
            return {
                status: 'success',
                msg: 'Driver created'
            }
        } catch (err) {
            return {
                status: 'error',
                msg: 'Driver creation failed'
            }
        }
    }



    async fetch(name) {
        try {

            var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

            let response = await driverSchema.findAll({ 
                include :[{
                    model : db.lorry,
                }],
                where: condition });
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
            let response = await driverSchema.findByPk(id);
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
            let response = await driverSchema.destroy({
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
            let response = await driverSchema.update(body, {
                where: { id: id }
            });
            return { status: "success", msg: "Driver Updated successfully", result: response };
        } catch (error) {
            return { status: "error", error: error };
        }

    }


}

db.lorry.hasMany(driverSchema, {
    foreignKey: "lorry_id",
    targetKey: "id",
});

driverSchema.belongsTo(db.lorry, {
    foreignKey: "lorry_id",
    targetKey: "id",
});

module.exports = new DriverController();