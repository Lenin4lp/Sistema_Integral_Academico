import { Request, Response } from "express";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

export const uploaded = upload.single('myFile');

export const uploadFile = (req: Request, res: Response) => {
    const fileLocation = req.file?.path;
    res.send({location: fileLocation});
}