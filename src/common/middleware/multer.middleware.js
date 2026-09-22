import multer from "multer";
import crypto from "crypto";
import path from "path";

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "public/upload");
    },

    filename: function (req, file, cb) {

        crypto.randomBytes(16, function (err, raw) {

            if (err) {
                return cb(err);
            }

            const ext = path.extname(file.originalname);

            cb(
                null,
                file.fieldname + "-" + raw.toString("hex") + ext
            );
        });
    }
});

const fileFilter = (req, file, cb) => {

    const allowed = [
        "image/png",
        "image/jpeg",
        "application/pdf"
    ];

    if (allowed.includes(file.mimetype)) {
        return cb(null, true);
    }

    return cb(new Error("File not supported"), false);
};

export const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter
});