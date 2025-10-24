const { User, Profile, HealthRecord, Activity } = require("../models");
const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");
const { setHeigth, setYear, setWeigth } = require("../helper/helper");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

class Controller {
  static async home(req, res) {
    try {
      const { msg } = req.query;
      const { id } = req.params;
      const data = await User.findUser(id, HealthRecord, Profile);
      res.render("home", { data, setHeigth, setYear, setWeigth, msg });
    } catch (error) {
      res.send(error);
    }
  }

  static async listActivities(req, res) {
    try {
      const { userId } = req.session.user;
      const { search } = req.query;
      let query = {};

      if (search) {
        query = {
          where: {
            name: {
              [Op.iLike]: `%${search}%`,
            },
          },
        };
      }
      const data = await Activity.findAll(query);
      res.render("activities", { data, userId });
    } catch (error) {
      res.send(error);
    }
  }

  static async getAdmin(req, res) {
    try {
      const { errors } = req.query;
      const { id } = req.params;
      res.render("admin", { id, errors });
    } catch (error) {
      res.send(error);
    }
  }
  static async postAdmin(req, res) {
    const { id } = req.params;
    try {
      const { name, caloriesBurned } = req.body;
      await Activity.create({
        name,
        caloriesBurned,
      });

      res.redirect(`admin/${id}`);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        error = error.errors.map((el) => el.message);
        res.redirect(`/admin/${id}?errors=${error}`);
      }
      res.send(error);
    }
  }
  static async getRegister(req, res) {
    try {
      const { errors, error } = req.query;
      res.render("register", { errors, error });
    } catch (error) {
      res.send(error);
    }
  }

  static async postRegister(req, res) {
    try {
      const { username, email, password, role } = req.body;

      const findUser = await User.findOne({
        where: {
          username,
        },
      });

      if (findUser) {
        res.redirect("/register?errors=User Sudah Ada");
      } else {
        await User.create({
          username,
          email,
          password,
          role,
        });
        res.redirect("login");
      }
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        error = error.errors.map((el) => el.message);
        res.redirect(`/register?errors=${error}`);
      }
      res.send(error);
    }
  }

  static async getLogin(req, res) {
    try {
      const { errors } = req.query;
      res.render("login", { errors });
    } catch (error) {
      res.send(error);
    }
  }

  static async postLogin(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.redirect(`/login?errors=Username dan password wajib diisi!`);
      }
      const data = await User.findOne({
        where: {
          username,
        },
      });
      if (data) {
        const isValidPassword = bcrypt.compareSync(password, data.password);
        if (isValidPassword) {
          const data = await User.findOne({
            where: {
              username,
            },
          });

          req.session.user = { userId: data.id, role: data.role };
          res.redirect(`/home/${data.id}`);
        }
      } else {
        res.redirect(`/login?errors=User Tidak Ditemukan`);
      }
    } catch (error) {
      res.send(error);
    }
  }

  static async logOut(req, res) {
    try {
      await req.session.destroy((err) => {
        if (err) {
          console.log("Gagal Hapus Session");
        } else {
          res.redirect("/login");
        }
      });
    } catch (error) {
      res.send(error);
    }
  }

  static async getAddProfile(req, res) {
    try {
      const { errors } = req.query;
      const { userId } = req.session.user;
      res.render("addProfile", { userId, errors });
    } catch (error) {
      res.send(error);
    }
  }

  static async postAddProfile(req, res) {
    try {
      const { userId } = req.session.user;
      const { age, heigth, weigth, bloodType } = req.body;
      await Profile.create({
        userId,
        age,
        heigth,
        weigth,
        bloodType,
      });

      res.redirect(`/home/${userId}`);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        error = error.errors.map((el) => el.message);
        res.redirect(`/home/addProfile?errors=${error}`);
      }
      res.send(error);
    }
  }

  static async getEditProfile(req, res) {
    try {
      const { errors } = req.query;
      const { userId } = req.session.user;
      const { id } = req.params;
      const data = await Profile.findByPk(id);
      res.render("editProfile", { data, errors, userId });
    } catch (error) {
      res.send(error);
    }
  }
  static async postEditProfile(req, res) {
    const { id } = req.params;
    try {
      const { age, heigth, weigth, bloodType } = req.body;
      const profile = await Profile.findByPk(id);
      await profile.update({
        age,
        heigth,
        weigth,
        bloodType,
      });

      res.redirect(`/home/${profile.userId}`);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        error = error.errors.map((el) => el.message);
        res.redirect(`/home/editProfile/${id}?errors=${error}`);
      }
      res.send(error);
    }
  }

  static async getAddHR(req, res) {
    try {
      const { errors } = req.query;
      const { userId } = req.session.user;
      const activities = await Activity.findAll();
      res.render("addHR", { userId, activities, errors });
    } catch (error) {
      res.send(error);
    }
  }

  static async postAddHR(req, res) {
    try {
      const { userId } = req.session.user;
      const { date, bloodPressure, sugarLevel, note } = req.body;

      const idsRaw = req.body["activityIds[]"]; 
      const newHR = await HealthRecord.create({
        date,
        bloodPressure,
        sugarLevel,
        userId,
        note,
      });

      if (idsRaw) {
        const ids = Array.isArray(idsRaw)
          ? idsRaw.map(Number)
          : [Number(idsRaw)];
        await newHR.addActivities(ids);
      }

      res.redirect(`/home/${userId}`);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        error = error.errors.map((el) => el.message);
        res.redirect(`/home/addHR?errors=${error}`);
      }

      res.send(error);
    }
  }

  static async getUpdateHR(req, res) {
    try {
      const { errors } = req.query;
      const { id } = req.params;
      const data = await HealthRecord.findByPk(id);
      res.render("addNote", { data, errors });
    } catch (error) {
      res.send(error);
    }
  }

  static async postUpdateHR(req, res) {
    const { id } = req.params;
    try {
      const { note } = req.body;
      const { userId } = req.session.user;
      const hr = await HealthRecord.findByPk(id);
      await hr.update({
        note,
      });

      res.redirect(`/home/${userId}`);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        error = error.errors.map((el) => el.message);
        res.redirect(`/healthrecords/${id}/addNote?errors=${error}`);
      }
      res.send(error);
    }
  }

  static async delete(req, res) {
    try {
      const { userId } = req.session.user;
      const { id } = req.params;
      const hr = await HealthRecord.findByPk(id);
      await hr.destroy();
      res.redirect(`/home/${userId}?msg= ${hr.setDate}`);
    } catch (error) {
      res.send(error);
    }
  }

  static async generateHealthReport(req, res) {
    try {
      const { userId } = req.session.user;
      const userData = await User.findByPk(userId, {
        include: [
          {
            model: HealthRecord,
            include: [Activity],
          },
        ],
      });

      if (!userData) {
        return res.status(404).send("User not found");
      }

      const doc = new PDFDocument();
      const chunks = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", async () => {
        const pdfBuffer = Buffer.concat(chunks);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          "inline; filename=health-report.pdf"
        );
        res.send(pdfBuffer);
      });

      doc.fontSize(18).text("Health Report", { align: "center" });
      doc.moveDown();

      doc.fontSize(14).text(`User: ${userData.username}`);
      doc.moveDown();

      for (const record of userData.HealthRecords) {
        doc.fontSize(12).text(`Tanggal: ${record.setDate}`);
        doc.text(`Tekanan Darah: ${record.setBloodPressure}`);
        doc.text(`Gula Darah: ${record.setSugarLevel}`);
        if (record.note) doc.text(`Catatan: ${record.note}`);
        doc.moveDown();

        if (record.Activities.length) {
          doc.text("Aktivitas:");
          record.Activities.forEach((act, i) => {
            doc.text(`  ${i + 1}. ${act.name} (${act.caloriesBurned} kcal)`);
          });
        } else {
          doc.text("Tidak ada aktivitas terkait.");
        }

        doc.moveDown();

        const qrText = `http://localhost:3000/healthrecords/${record.id}`;
        const qrImage = await QRCode.toDataURL(qrText);
        const qr = qrImage.replace(/^data:image\/png;base64,/, "");
        const qrBuffer = Buffer.from(qr, "base64");

        doc.image(qrBuffer, { width: 100, align: "center" });
        doc.moveDown(2);
        doc.moveTo(doc.x, doc.y).lineTo(550, doc.y).stroke();
        doc.moveDown(1);
      }

      doc.end();
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = Controller;
