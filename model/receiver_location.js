module.exports = (sequelize,Sequelize) => {
    const ReceiverLocation = sequelize.define('receiver_location', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true
        },
        street: {
            type: Sequelize.STRING,
            allowNull: true
        },
        city: {
            type: Sequelize.STRING,
            allowNull: true
        },
        town : {
            type: Sequelize.STRING,
            allowNull: true
        },
        shortcutTown : {
            type: Sequelize.STRING,
            allowNull: true
        },
        tamil_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tamil_address: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tamil_street: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tamil_city: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tamil_town : {
            type: Sequelize.STRING,
            allowNull: true
        }
    });

    return ReceiverLocation;
};