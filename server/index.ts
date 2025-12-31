import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, '../wisdom.db'));

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS quotes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    q TEXT UNIQUE,
    a TEXT,
    ko_q TEXT,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.VITE_GEMINI_API_KEY;

const fetchHighResImage = async (author: string) => {
    try {
        const searchRes = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(author)}`);
        const data = searchRes.data;
        return data.originalimage?.source || data.thumbnail?.source || "";
    } catch (error) {
        console.error(`Image fetch failed for ${author}`);
        return "";
    }
};

const translateWithGemini = async (text: string) => {
    if (!API_KEY) throw new Error("Gemini API key missing");
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `당신은 세계적인 문학 번역가입니다. 다음 영어 명언을 한국어 정서에 어울리는 매우 시적이고 깊이 있는 우아한 문체로 번역해 주세요. 다른 설명 없이 오직 번역된 문장만 출력하세요.\n\n명언: "${text}"`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text().trim().replace(/^"|"$/g, '');
};

app.get('/api/wisdom', async (req, res) => {
    try {
        // 1. Fetch a random quote from ZenQuotes
        const zenRes = await axios.get('https://zenquotes.io/api/random');
        const zenData = zenRes.data[0];

        // 2. Check if exists in DB
        const existing = db.prepare('SELECT * FROM quotes WHERE q = ?').get(zenData.q) as any;

        if (existing) {
            console.log("Found in DB:", existing.a);
            return res.json({
                q: existing.q,
                a: existing.a,
                ko_q: existing.ko_q,
                image_url: existing.image_url,
                cached: true
            });
        }

        // 3. New quote -> Translate and Get Image
        console.log("New quote, processing with AI:", zenData.a);
        const [ko_q, image_url] = await Promise.all([
            translateWithGemini(zenData.q).catch(() => ""),
            fetchHighResImage(zenData.a)
        ]);

        // 4. Save to DB
        const stmt = db.prepare('INSERT INTO quotes (q, a, ko_q, image_url) VALUES (?, ?, ?, ?)');
        stmt.run(zenData.q, zenData.a, ko_q, image_url);

        res.json({
            q: zenData.q,
            a: zenData.a,
            ko_q: ko_q,
            image_url: image_url,
            cached: false
        });
    } catch (error: any) {
        console.error("Wisdom API Error:", error.message);
        res.status(500).json({ error: "Failed to fetch wisdom" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
