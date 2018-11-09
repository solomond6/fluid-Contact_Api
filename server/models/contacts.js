module.exports = (sequelize, DataTypes) => {
    const Contacts = sequelize.define("Contacts", {
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isUnique: function(value, next) {
                    Contacts.find({
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
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUnique: function(value, next) {
                    Contacts.find({
                            where: { phone_number: value },
                            attributes: ["id"]
                        })
                        .done(function(error, user) {
                            if (error)
                            // Some unexpected error occured with the find method.
                                return next(error);
                            if (user)
                            // We found a user with this email address.
                            // Pass the error to the next method.
                                return next("Phone Number already in use!");
                            // If we got this far, the email address hasn't been used yet.
                            // Call next with no arguments when validation is successful.
                            next();
                        });
                }
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rating: {
            type: DataTypes.TINYINT,
            allowNull: true,
        },
    });

    return Contacts;
};