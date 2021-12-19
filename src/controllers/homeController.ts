import { Request, Response } from 'express';
import { title } from 'process';
import { Op } from 'sequelize';
import { sequelize } from '../instances/mysql';

import { Product } from '../models/Product';
import { User } from '../models/user';

export const home = async (req: Request, res: Response) => {
    try {
        // --- add data   
        // const newUser = await User.build({ name: "Sequelize build", age: 99 });
        // newUser.save()
        // console.log("newUser ADD ", newUser)


        // ---  remove data
        // await User.destroy({
        //     where: {
        //         id: 10
        //     }
        // })
        // console.log("deletado")

        await User.u({
            where: {
                id: 10
            }
        })
        console.log("deletado")

    }
    catch (err) { console.log(err); }

    const users = await User.findAll({
        where: {
            id: {
                [Op.eq]: 4
            }
        }
    });

    console.log("All users:", JSON.stringify(users, null, 2));
    try {
        await sequelize.authenticate()
        console.log("conexao")
    } catch (e) {
        console.log("error BD", e)
    }
    let age: number = 90;
    let showOld: boolean = false;

    if (age > 50) {
        showOld = true;
    }

    let list = Product.getAll();
    let expensiveList = Product.getFromPriceAfter(12);

    res.render('pages/home', {
        name: 'Bonieky',
        lastName: 'Lacerda',
        showOld,
        products: list,
        expensives: expensiveList,
        frasesDoDia: []
    });
};