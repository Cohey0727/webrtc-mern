import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test", (req, res) => {
  res.send(req.body);
});

export default app;
