'use strict';
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        teamOne: {
            type: DataTypes.STRING
        },
        teamTwo: {
            type: DataTypes.STRING
        },
        teamThree: {
            type: DataTypes.STRING
        }
    }, {
        classMethods: {
            validPassword: function(password, passwd, done, user) {
                bcrypt.compare(password, passwd, function(err, isMatch) {
                    if (err) console.log(err)
                    if (isMatch) {
                        return done(null, user)
                    } else {
                        return done(null, false)
                    }
                });
            }
        }
    }, {
        dialect: 'mysql'
    });
    return User;
};