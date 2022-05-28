import { Request, Response } from "express";
import { Op } from "sequelize";
import { sequelize } from "../instances/mysql";

import { Product } from "../models/Product";
import { User } from "../models/user";

export const home = async (req: Request, res: Response) => {
    try {
        // --- add data with Build and save in BD
        // const newUser = await User.build({ name: "outro teste", age: 99 });
        // newUser.save();
        // console.log("newUser ADD ", newUser);
        // --- add data with Build and save in BD
        // const newUser = await User.create({ name: "outro teste", age: 99 });
        // console.log("newUser ADD ", newUser);
        // ---  remove data
        // await User.destroy({
        //     where: {
        //         id: 10
        //     }
        // })
        // console.log("deletado")
        // await User.update({
        //     where: {
        //         id: 10,
        //     },
        // });
        // console.log("deletado");
    } catch (err) {
        console.log(err);
    }

    // const users = await User.findAll();
    // console.log("capture all", users);

    // const users = await User.findAll({ offset: 3, limit: 3 });
    // console.log("capture filtered 3-6", users);

    // find user by primary key
    // const userByPK = await User.findByPk(6);
    // if (userByPK === null) {
    //     console.log("Not found!");
    // } else {
    //     console.log(userByPK instanceof User); // true
    //     // Its primary key is 123
    //     console.log(userByPK);
    // }

    // find user by primary key and update
    // const userByPK = await User.findByPk(6);
    // userByPK?.update({ name: "id 6 update", age: 87 });

    try {
        await sequelize.authenticate();
        console.log("conexao");
    } catch (e) {
        console.log("error BD", e);
    }
    let age: number = 90;
    let showOld: boolean = false;

    if (age > 50) {
        showOld = true;
    }

    let list = Product.getAll();
    let expensiveList = Product.getFromPriceAfter(12);

    res.render("pages/home", {
        name: "Bonieky",
        lastName: "Lacerda",
        showOld,
        products: list,
        expensives: expensiveList,
        frasesDoDia: [],
    });
};
