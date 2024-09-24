import { Response,Request } from 'express'


class IndexController{
    index(req:Request,res:Response){
        res.send('Hola Mundo')
    }
}

export const indexController =new IndexController();