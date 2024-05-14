const errorHandler = require('../utils/error.handler');
const db = require("../middleware/middleware");
const SenderLocationSchema = db.sender_location;
const Op = db.Sequelize.Op;
const multer = require('multer');
const exceljs = require('exceljs');
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

    async addSenderLocationExcel(path){
        if (!path) {
            return res.status(400).send('No file uploaded.');
          }
        
          const workbook = new exceljs.Workbook();
          workbook.xlsx.readFile(path)
            .then(() => {
              const worksheet = workbook.getWorksheet(1);
              worksheet.eachRow({ includeEmpty: false }, async (row, rowNumber) => {
                if (rowNumber !== 1) { 
                  const rowData = row.values;
                  const sender_location = new SenderLocationSchema({
                    name: rowData[1],
                    address: rowData[2],
                    street: rowData[3],
                    city: rowData[4],
                    town: rowData[5],
                    shortcutTown : rowData[6],
                    tamil_name : rowData[7],
                    tamil_address : rowData[8],
                    tamil_street : rowData[9],
                    tamil_city : rowData[10],
                    tamil_town : rowData[11]
                  });
                  sender_location.save()
                    .then(() => console.log(`Saved student: ${sender_location.name}`))
                    .catch(err => console.error(`Error saving student: ${err}`));
                }
              });
        
              return { status: "success",   msg:"File uploaded successfully."};
            })
            .catch(err => {
              console.error(`Error reading Excel file: ${err}`);
              return { status: "error",   msg:"Error processing file."};
            });
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