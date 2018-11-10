module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUnique: function(value, next) {
                    Users.find({
                        where: { email: value },
                        attributes: ["id"]
                    })
                        .done(function(error, user) {
                            if (error)
                            // Some unexpected error occured with the find method.
                                return next(error);
                            if (user)
                            // We found a user with this email address.
                            // Pass the error to the next method.
                                return next("Email address already in use!");
                            // If we got this far, the email address hasn't been used yet.
                            // Call next with no arguments when validation is successful.
                            next();

                        });
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_login: {
            type: DataTypes.DATE,
        },
    });

    // Users.associate = (models) => {
    //     // Todo.hasMany(models.TodoItem, {
    //     //     foreignKey: 'todoId',
    //     //     as: 'todoItems',
    //     // });
    // };

    return Users;
};