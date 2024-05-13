module.exports = (sequelize,Sequelize) => {
    const Location = sequelize.define('location', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        shortcutTown : {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    });

    return Location;
};