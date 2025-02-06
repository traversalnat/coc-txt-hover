import {ExtensionContext, languages, Hover, Position, TextDocument, workspace, window, fetch} from 'coc.nvim';
import axios from 'xior';

// 查询英文单词含义的函数
async function getWordMeaning(word: string): Promise<string | null> {
    try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
            const meanings = data[0].meanings;
            let result = '';
            for (const meaning of meanings) {
                const partOfSpeech = meaning.partOfSpeech;
                const definitions = meaning.definitions;
                result += `**${partOfSpeech}**:\n`;
                for (let i = 0; i < definitions.length; i++) {
                    result += `${i + 1}. ${definitions[i].definition}\n`;
                }
            }
            return result;
        }
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
