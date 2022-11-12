import { Request, Response } from "express";
import Users from "../models/schemas/user.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import BroadModels from "../models/schemas/Broad.schema";
import WorkSpace from "../models/schemas/WorkSpace.schema";

dotenv.config();
export class UserController {
  static async uploadAvatar(req: Request, res: Response) {
    let idUser = req.body.id;
    let image = req.body.image;
    Users.findOneAndUpdate(
      { _id: idUser },
      { $set: { image: image } },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log(err);
        }
        res.status(200).json({
          message: "update thành công!",
        });
      }
    );
  }
  static async broadUpdate(req: Request, res: Response) {
    const idBroad = req.body._id;

    let newData = {
      title: req.body.title,
      mode: req.body.mode,
      columnOrder: req.body.columnOrder,
      columns: req.body.columns,
    };
    await BroadModels.findOneAndUpdate({ _id: idBroad }, newData);

    let newBroad = await BroadModels.findOne({
      _id: idBroad,
    });
  }
  static async broad(req: Request, res: Response) {
    const idUser = req.params.id;

    if (idUser) {
      let user = await Users.findById(idUser);
      let listBroad = await BroadModels.find({
        _id: user.listIdBroad,
      });
      let listWorkSpace = await WorkSpace.find({
        _id: user.listIdWorkSpace,
      });
      res.status(200).json({
        data: listBroad,
        listWorkSpace: listWorkSpace,
      });
    }
  }
  static async broadData(req: Request, res: Response) {
    const idBroad = req.params.id;

    const broadData = await BroadModels.findOne({
      _id: idBroad,
    });

    res.status(200).json({
      broad: broadData,
    });
  }
  static async imageUser(req: Request, res: Response) {
    let id = req.params.id;
    let user = await Users.findOne({ _id: id });

    if (user.image) {
      return res.json({ message: user.image });
    } else {
      return res.json({ message: "Không có ảnh!" });
    }
  }
  static async createWordSpace(req: Request, res: Response) {
    let data = req.body;
    let id = data.idUser;
    let workspaces = await WorkSpace.create({ name: data.name, des: data.des });
    let user = await Users.findOne({ _id: id });
    user.listIdWorkSpace.push(workspaces._id);
    await user.save();
    return res.status(200).json({ data: workspaces._id });
  }
  static async findUser(req: Request, res: Response) {
    let user = await Users.find();
    let email = [];
    user.forEach((item) => {
      email.push(item.email);
    });

    return res.status(200).json({ email: email });
  }
  static async sendEmail(req: Request, res: Response) {
    let emailMember = req.body.email;
    let emailAdmin = req.body.emailIdUser;
    let idBroad = req.body.idbroad;
    let dataIdbroad = await BroadModels.findById({ _id: idBroad });
    let workspace = await WorkSpace.findById({ _id: req.body.idWorkSpace });
    let data = {
      name: workspace.name,
      des: workspace.des,
    };

    let uerMember = await Users.findOne({ email: emailMember });
    let arr = [];

    if (uerMember.listIdWorkSpace.length > 0) {
      for (let index = 0; index < uerMember.listIdWorkSpace.length; index++) {
        let user = await WorkSpace.findOne({
          _id: uerMember.listIdWorkSpace[index],
        });
        arr.push(user.name);
        if (user.name === data.name) {
          if (uerMember.listIdBroad.includes(dataIdbroad._id)) {
            return res.status(200).json();
          } else {
            console.log(1);
            uerMember.listIdBroad.push(dataIdbroad._id);
            uerMember.save();
            let workspaceMember = await WorkSpace.findById({
              _id: uerMember.listIdWorkSpace[index],
            });
            workspaceMember.id_listIdBroad.push(dataIdbroad._id);
            workspaceMember.save();
            let broad = await BroadModels.findById({ _id: idBroad });
            broad.useId.push(emailMember);
            broad.useId.push(emailAdmin);
            broad.save();
            return res.status(200).json();
          }
        } else {
          console.log(2);
          let WS = await WorkSpace.create({
            name: data.name,
            des: data.des,
            id_listIdBroad: dataIdbroad._id,
          });
          await WS.save();
          uerMember.listIdWorkSpace.push(WS._id);
          uerMember.listIdBroad.push(dataIdbroad._id);
          await uerMember.save();
          let broad = await BroadModels.findById({ _id: idBroad });
          broad.useId.push(emailMember);
          broad.useId.push(emailAdmin);
          broad.save();
          return res.status(200).json();
        }
      }
      console.log(arr);
    } else {
      let WS = await WorkSpace.create({
        name: data.name,
        des: data.des,
        id_listIdBroad: dataIdbroad._id,
      });
      await WS.save();
      uerMember.listIdWorkSpace.push(WS._id);
      uerMember.listIdBroad.push(dataIdbroad._id);
      await uerMember.save();
      let broad = await BroadModels.findById({ _id: idBroad });
      broad.useId.push(emailMember);
      broad.useId.push(emailAdmin);

      broad.save();
    }

    //showIMg
    let broad = await BroadModels.findById({ _id: idBroad });
    broad.useId.push(emailMember);
    broad.useId.push(emailAdmin);
    broad.save();
    return res.status(200).json({ message: "add member success!" });
  }

  static async dataMember(req: Request, res: Response) {
    let id = req.params.id;
    let broad = await BroadModels.findById({ _id: id });
    let UserID = broad.useId;
    let dataUser = [];
    for (let index = 0; index < UserID.length; index++) {
      let user = await Users.findOne({ email: UserID[index] });
      dataUser.push(user);
    }

    return res.status(200).json({ user: dataUser });
  }
}

export default new UserController();
