module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Contacts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            firstname: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            lastname: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            phone_number: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            address: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            rating: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        }),
    down: (queryInterface /* , Sequelize */ ) => queryInterface.dropTable('Contacts'),
};