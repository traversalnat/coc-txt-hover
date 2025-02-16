import {ExtensionContext, languages, Hover, Position, TextDocument, window, fetch, Range} from 'coc.nvim';
import nlp from "compromise";

/**
 * 获取单词的原型（词干）
 * @param word 输入的单词
 * @returns 还原后的单词
 */
function getWordPrototype(word: string): string {
  const doc = nlp(word);
  return doc.verbs().toInfinitive().out() || 
         doc.nouns().toSingular().out() || 
         word;
}

async function queryWordMeaning(wordToQuery: string): Promise<string> {
    const sqlite3 = require('sqlite3').verbose();
    // 定义数据库文件路径
    const dbPath = __dirname + '/vocab.db';

    return new Promise((resolve, reject) => {
        // 打开数据库连接
        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                reject(new Error('数据库连接失败: ' + err.message));
                return;
            }

            // 构建 SQL 查询语句
            const sql = `SELECT word, trans FROM dictionary WHERE word LIKE '${wordToQuery}' LIMIT 1`;

            // 执行查询
            db.get(sql, [], (err, row) => {
                if (err) {
                    reject(new Error('查询出错: ' + err.message));
                } else if (row) {
                    resolve(`word: ${row.word}\n` + "trans" + row.trans);
                } else {
                    const wordPrototype = getWordPrototype(wordToQuery);
                    const sqlPrototype = `SELECT word, trans FROM dictionary WHERE word LIKE '${wordPrototype}' LIMIT 1`;
                    db.get(sqlPrototype, [], (err, row) => {
                        if (err) {
                            reject(new Error('查询出错: ' + err.message));
                        }
                        else if (row) {
                            resolve(`word: ${row.word}\n` + "trans" + row.trans);
                        }
                        else {
                            resolve(`未找到单词 "${wordPrototype}" 的含义`);
                        }
                    });
                }
                // 关闭数据库连接
                db.close((err) => {
                    if (err) {
                        console.error('关闭数据库连接出错:', err.message);
                    }
                });
            });
        });
    });
}

// 查询英文单词含义的函数
async function getWordMeaning(word: string): Promise<string | null> {
    try {
        const data = await queryWordMeaning(word);
        return data;
    } catch (error) {
        const message = `error meaning ${error}`
        window.showInformationMessage(message)
    }
    return null;
}

function getWordRangeAtPosition(document: {getText: () => string}, position: {character: number; line: number}): {start: {character: number; line: number}; end: {character: number; line: number}} | null {
    const text = document.getText();
    const lines = text.split('\n');
    if (position.line >= lines.length) {
        return null;
    }
    const line = lines[position.line];
    let start = position.character;
    let end = position.character;

    // 向左查找单词起始位置
    while (start > 0 && /\w/.test(line[start - 1])) {
        start--;
    }

    // 向右查找单词结束位置
    while (end < line.length && /\w/.test(line[end])) {
        end++;
    }

    if (start === end) {
        return null;
    }

    return {
        start: {character: start, line: position.line},
        end: {character: end, line: position.line}
    };
}

// 处理 doHover 请求的函数
async function doHover(document: TextDocument, position: Position): Promise<Hover | null> {
    // window.showInformationMessage('coc-dict works!');
    const wordRange = getWordRangeAtPosition(document, position);
    if (!wordRange) return null;
    const word = document.getText(wordRange);
    const meaning = await getWordMeaning(word);
    if (meaning) {
        return {
            contents: [meaning]
        };
    }
    return null;
}

export async function activate(context: ExtensionContext): Promise<void> {
    const provider = {
        provideHover: doHover
    };

    // 注册 hover 提供者，仅对 txt 文件生效
    const disposable = languages.registerHoverProvider(['txt'], provider);
    context.subscriptions.push(disposable);
}
