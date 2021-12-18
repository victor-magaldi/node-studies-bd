import { Request, Response } from 'express';
import { sequelize } from '../instances/mysql';

import { Product } from '../models/Product';
import { User } from '../models/user';

export const home = async (req: Request, res: Response) => {
    const users = await User.findAll();
    console.log(users.every(user => user instanceof User)); // true
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