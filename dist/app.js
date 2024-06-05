var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import pLimit from 'p-limit';
const prismaClient = new PrismaClient();
let locales = ['fr', 'de', 'it', 'ru', 'pt', 'zh', 'ko', 'ja'];
//Fetch the report From the database
function getFAQS(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const faq = yield prismaClient.cmi_cmifaq.findFirst({
                where: {
                    rid: id,
                },
            });
            return faq;
        }
        catch (err) {
            console.log('Unable to fetch the Report!');
        }
    });
}
//Translate the Single Report
function translateReport(rid, lang) {
    return __awaiter(this, void 0, void 0, function* () {
        //fetch the report from Database
        const faqs = yield getFAQS(rid);
        console.log('Translating the Faqs in :', lang);
        if (faqs) {
            const Values = Object.values(faqs);
            Values.shift();
            Values.shift();
            const data = {
                q: Values,
                source: 'en',
                target: lang,
                format: 'html',
            };
            try {
                //Send the report text for the translation and await on request
                const res = yield axios.post('http://52.89.187.86/translate', data);
                //Taking the translatedText array from the response
                const translatedFaqs = res.data.translatedText;
                console.log('Successfully Translated Faqs of reportId ' + rid + ' to ', lang);
                //Save the translated Text to the specific language table
                try {
                    switch (lang) {
                        case 'fr':
                            yield prismaClient.cmi_cmifaq_translation_fr.create({
                                data: {
                                    rid: rid,
                                    q1: translatedFaqs[0],
                                    q2: translatedFaqs[1],
                                    q3: translatedFaqs[2],
                                    q4: translatedFaqs[3],
                                    q5: translatedFaqs[4],
                                    q6: translatedFaqs[5],
                                    a1: translatedFaqs[6],
                                    a2: translatedFaqs[7],
                                    a3: translatedFaqs[8],
                                    a4: translatedFaqs[9],
                                    a5: translatedFaqs[10],
                                    a6: translatedFaqs[11],
                                },
                            });
                            console.log('Translated Faqs of reportid ' +
                                rid +
                                ' Saved Successfully to ' +
                                lang +
                                ' table!');
                            break;
                        case 'de':
                            yield prismaClient.cmi_cmifaq_translation_de.create({
                                data: {
                                    rid: rid,
                                    q1: translatedFaqs[0],
                                    q2: translatedFaqs[1],
                                    q3: translatedFaqs[2],
                                    q4: translatedFaqs[3],
                                    q5: translatedFaqs[4],
                                    q6: translatedFaqs[5],
                                    a1: translatedFaqs[6],
                                    a2: translatedFaqs[7],
                                    a3: translatedFaqs[8],
                                    a4: translatedFaqs[9],
                                    a5: translatedFaqs[10],
                                    a6: translatedFaqs[11],
                                },
                            });
                            console.log('Translated Faqs of reportid ' +
                                rid +
                                ' Saved Successfully to ' +
                                lang +
                                ' table!');
                            break;
                        case 'it':
                            yield prismaClient.cmi_cmifaq_translation_it.create({
                                data: {
                                    rid: rid,
                                    q1: translatedFaqs[0],
                                    q2: translatedFaqs[1],
                                    q3: translatedFaqs[2],
                                    q4: translatedFaqs[3],
                                    q5: translatedFaqs[4],
                                    q6: translatedFaqs[5],
                                    a1: translatedFaqs[6],
                                    a2: translatedFaqs[7],
                                    a3: translatedFaqs[8],
                                    a4: translatedFaqs[9],
                                    a5: translatedFaqs[10],
                                    a6: translatedFaqs[11],
                                },
                            });
                            console.log('Translated Faqs of reportid ' +
                                rid +
                                ' Saved Successfully to ' +
                                lang +
                                ' table!');
                            break;
                        case 'ru':
                            yield prismaClient.cmi_cmifaq_translation_ru.create({
                                data: {
                                    rid: rid,
                                    q1: translatedFaqs[0],
                                    q2: translatedFaqs[1],
                                    q3: translatedFaqs[2],
                                    q4: translatedFaqs[3],
                                    q5: translatedFaqs[4],
                                    q6: translatedFaqs[5],
                                    a1: translatedFaqs[6],
                                    a2: translatedFaqs[7],
                                    a3: translatedFaqs[8],
                                    a4: translatedFaqs[9],
                                    a5: translatedFaqs[10],
                                    a6: translatedFaqs[11],
                                },
                            });
                            console.log('Translated Faqs of reportid ' +
                                rid +
                                ' Saved Successfully to ' +
                                lang +
                                ' table!');
                            break;
                        case 'ja':
                            yield prismaClient.cmi_cmifaq_translation_ja.create({
                                data: {
                                    rid: rid,
                                    q1: translatedFaqs[0],
                                    q2: translatedFaqs[1],
                                    q3: translatedFaqs[2],
                                    q4: translatedFaqs[3],
                                    q5: translatedFaqs[4],
                                    q6: translatedFaqs[5],
                                    a1: translatedFaqs[6],
                                    a2: translatedFaqs[7],
                                    a3: translatedFaqs[8],
                                    a4: translatedFaqs[9],
                                    a5: translatedFaqs[10],
                                    a6: translatedFaqs[11],
                                },
                            });
                            console.log('Translated Faqs of reportid ' +
                                rid +
                                ' Saved Successfully to ' +
                                lang +
                                ' table!');
                            break;
                        case 'zh':
                            yield prismaClient.cmi_cmifaq_translation_zh.create({
                                data: {
                                    rid: rid,
                                    q1: translatedFaqs[0],
                                    q2: translatedFaqs[1],
                                    q3: translatedFaqs[2],
                                    q4: translatedFaqs[3],
                                    q5: translatedFaqs[4],
                                    q6: translatedFaqs[5],
                                    a1: translatedFaqs[6],
                                    a2: translatedFaqs[7],
                                    a3: translatedFaqs[8],
                                    a4: translatedFaqs[9],
                                    a5: translatedFaqs[10],
                                    a6: translatedFaqs[11],
                                },
                            });
                            console.log('Translated Faqs of reportid ' +
                                rid +
                                ' Saved Successfully to ' +
                                lang +
                                ' table!');
                            break;
                        case 'ko':
                            yield prismaClient.cmi_cmifaq_translation_ko.create({
                                data: {
                                    rid: rid,
                                    q1: translatedFaqs[0],
                                    q2: translatedFaqs[1],
                                    q3: translatedFaqs[2],
                                    q4: translatedFaqs[3],
                                    q5: translatedFaqs[4],
                                    q6: translatedFaqs[5],
                                    a1: translatedFaqs[6],
                                    a2: translatedFaqs[7],
                                    a3: translatedFaqs[8],
                                    a4: translatedFaqs[9],
                                    a5: translatedFaqs[10],
                                    a6: translatedFaqs[11],
                                },
                            });
                            console.log('Translated Faqs of reportid ' +
                                rid +
                                ' Saved Successfully to ' +
                                lang +
                                ' table!');
                            break;
                        case 'pt':
                            yield prismaClient.cmi_cmifaq_translation_pt.create({
                                data: {
                                    rid: rid,
                                    q1: translatedFaqs[0],
                                    q2: translatedFaqs[1],
                                    q3: translatedFaqs[2],
                                    q4: translatedFaqs[3],
                                    q5: translatedFaqs[4],
                                    q6: translatedFaqs[5],
                                    a1: translatedFaqs[6],
                                    a2: translatedFaqs[7],
                                    a3: translatedFaqs[8],
                                    a4: translatedFaqs[9],
                                    a5: translatedFaqs[10],
                                    a6: translatedFaqs[11],
                                },
                            });
                            console.log('Translated Faqs of reportid ' +
                                rid +
                                ' Saved Successfully to ' +
                                lang +
                                ' table!');
                            break;
                        default:
                            console.log('No Locale was matched!');
                            break;
                    }
                }
                catch (err) {
                    console.log(err);
                    console.log('Got error while saving the translated faqs to database!');
                }
            }
            catch (err) {
                console.log(err);
                console.log('Unable to Translate the Faqs of reportId ' + rid + ' to ' + lang);
            }
        }
        else {
            console.log('There is No FAQs received to translate!');
            return null;
        }
    });
}
function sendToTranslate(rid) {
    return __awaiter(this, void 0, void 0, function* () {
        const limit = pLimit(8);
        const promises = locales.map((locale) => limit(() => translateReport(rid, locale)));
        return yield Promise.all(promises);
    });
}
function translate() {
    return __awaiter(this, void 0, void 0, function* () {
        //Create the Request Limit
        const limit = pLimit(1);
        console.log('Translation is Started !');
        try {
            const faqIds = yield prismaClient.cmi_cmifaq.findMany({
                select: {
                    rid: true,
                },
                where: {
                    rid: {
                        lte: 5,
                    },
                },
            });
            //Creating the Concurrent Request Promises for the Single Locale
            const promises = faqIds.map((id) => limit(() => sendToTranslate(id.rid)));
            yield Promise.all(promises);
            console.log('All faqs are translated in all languages!');
        }
        catch (err) {
            throw new Error('Error while Running Script! Please Try Again :' + err);
        }
    });
}
translate();
