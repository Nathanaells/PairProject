const {User, Profile, HealthRecord, HealthRecordActivity, Activity} = require('../models');
const {Op} = require('sequelize');
const bcrypt = require('bcryptjs')
class Controller{


    static async home(req, res){
        try {
            res.render('home')
        } catch (error) {
            res.send(error);
        }
    }
    static async getRegister(req, res){
       try {
        res.render("register")
       } catch (error) {
        res.send(error)
       }
    }

    static async postRegister(req, res){
        try {
            const {username, email, password, role} = req.body;
            await User.create({
                username,
                email,
                password,
                role,
            })

            res.redirect('login')
        } catch (error) {
         res.send(error)
        }
     }

     static async getLogin(req, res){
        try {
            const {errors} = req.query;
            res.render("login", {errors})
        } catch (error) {
         res.send(error)
        }
     }

     static async postLogin(req, res){
        try {
            const {username, password} = req.body;

            if (!username || !password) {
                res.redirect(`/login?errors=Username dan password wajib diisi!`)
              }
            const data = await User.findOne({
                where: {
                    username
                }
            })
            if(data){
                const isValidPassword = await bcrypt.compareSync(password, data.password)
                    if(isValidPassword){
                        res.redirect('/home')
                    }
            }else{
                res.redirect(`/login?errors=User Tidak Ditemukan`)
            }     
        } catch (error) {
            console.log(error)
         res.send(error)
        }
     }
}


module.exports = Controller;