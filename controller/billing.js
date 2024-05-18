const db = require("../middleware/middleware");
const billingSchema = db.billing;
const Op = db.Sequelize.Op;

class BillingController {


    async add(body) {
        try {
            let resCreate =  await billingSchema.create(body);
            let response = await billingSchema.findByPk(resCreate.id);
            return {
                status: "success", msg:"data Created successfully", result: response
            }
        } catch (err) {
            console.log("err",err);
            return {
                status: 'error',
                msg: 'Item creation failed'
            }
        }
    }



    async fetch() {
        try {
            let response = await billingSchema.findAll();
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
            let response = await billingSchema.findByPk(id);
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
            let response = await billingSchema.destroy({
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
            let updateresponse = await billingSchema.update(body, {
                where: { id: id }
            });
            let response = await billingSchema.findByPk(id);
            return { status: "success", msg: "Data Updated successfully", result: response };
        } catch (error) {
            return { status: "error", error: error };
        }

    }


}


module.exports = new BillingController();