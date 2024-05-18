const db = require("../middleware/middleware");
const billingHistorySchema = db.billingHistory;
const Op = db.Sequelize.Op;

class BillingController {


    async add(body) {
        try {
            let resCreate =  await billingHistorySchema.create(body);
            let response = await billingHistorySchema.findByPk(resCreate.id);
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
            let response = await billingHistorySchema.findAll();
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
            let response = await billingHistorySchema.findByPk(id);
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
            let response = await billingHistorySchema.destroy({
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
            let updateresponse = await billingHistorySchema.update(body, {
                where: { id: id }
            });
            let response = await billingHistorySchema.findByPk(id);
            return { status: "success", msg: "Data Updated successfully", result: response };
        } catch (error) {
            return { status: "error", error: error };
        }

    }


}


module.exports = new BillingController();