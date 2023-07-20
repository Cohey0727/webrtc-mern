import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";
import createHttpError from "http-errors";
import { logger } from "./configs";
import routes from "./routes";

const app = express();

// ログ出力
app.use(morgan("tiny"));

// レスポンスヘッダーの自動設定
app.use(helmet());

// リクエストボディのパース
app.use(express.json());

// URLエンコードされたデータのパース
app.use(express.urlencoded({ extended: true }));

// MongoDBへのインジェクションを防ぐ
app.use(mongoSanitize());

// クッキーのパース
app.use(cookieParser());

// gzip圧縮
app.use(compression());

// ファイルアップロード
app.use(fileUpload({ useTempFiles: true }));

// CORS
app.use(cors({}));

// ルーティング
app.use("/api/v1", routes);

// エラーハンドリング
app.use(async (req, res, next) => {
  next(createHttpError.NotFound("This route does not exist."));
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error("Hello");
  if (error instanceof createHttpError.HttpError) {
    res.status(error.statusCode).send({ message: error.message });
  } else {
    logger.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export default app;
