import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import pLimit from 'p-limit';

const prismaClient = new PrismaClient();

let locales = ['fr', 'de', 'it', 'ru', 'pt', 'zh', 'ko', 'ja'];

//Fetch the report From the database
async function getFAQS(id: number) {
  try {
    const faq = await prismaClient.cmi_cmifaq.findFirst({
      where: {
        rid: id,
      },
    });

    return faq;
  } catch (err) {
    console.log('Unable to fetch the Report!');
  }
}

//Translate the Single Report
async function translateReport(rid: number, lang: string) {
  //Precheck if the report is already translated
  const isPresent = await isReportTraslated(rid, lang);
  if (isPresent) {
    console.log('Faqs with ID ' + rid + ' is already translated!');
    return;
  }

  //fetch the report from Database
  const faqs = await getFAQS(rid);

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
      const res = await axios.post('http://52.89.187.86/translate', data);

      //Taking the translatedText array from the response
      const translatedFaqs = res.data.translatedText;

      console.log(
        'Successfully Translated Faqs of reportId ' + rid + ' to ',
        lang
      );

      //Save the translated Text to the specific language table
      try {
        switch (lang) {
          case 'fr':
            await prismaClient.cmi_cmifaq_translation_fr.create({
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
            console.log(
              'Translated Faqs of reportid ' +
                rid +
                ' Saved Successfully to ' +
                lang +
                ' table!'
            );
            break;
          case 'de':
            await prismaClient.cmi_cmifaq_translation_de.create({
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
            console.log(
              'Translated Faqs of reportid ' +
                rid +
                ' Saved Successfully to ' +
                lang +
                ' table!'
            );
            break;
          case 'it':
            await prismaClient.cmi_cmifaq_translation_it.create({
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
            console.log(
              'Translated Faqs of reportid ' +
                rid +
                ' Saved Successfully to ' +
                lang +
                ' table!'
            );
            break;
          case 'ru':
            await prismaClient.cmi_cmifaq_translation_ru.create({
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
            console.log(
              'Translated Faqs of reportid ' +
                rid +
                ' Saved Successfully to ' +
                lang +
                ' table!'
            );
            break;
          case 'ja':
            await prismaClient.cmi_cmifaq_translation_ja.create({
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
            console.log(
              'Translated Faqs of reportid ' +
                rid +
                ' Saved Successfully to ' +
                lang +
                ' table!'
            );
            break;
          case 'zh':
            await prismaClient.cmi_cmifaq_translation_zh.create({
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
            console.log(
              'Translated Faqs of reportid ' +
                rid +
                ' Saved Successfully to ' +
                lang +
                ' table!'
            );
            break;
          case 'ko':
            await prismaClient.cmi_cmifaq_translation_ko.create({
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
            console.log(
              'Translated Faqs of reportid ' +
                rid +
                ' Saved Successfully to ' +
                lang +
                ' table!'
            );
            break;
          case 'pt':
            await prismaClient.cmi_cmifaq_translation_pt.create({
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
            console.log(
              'Translated Faqs of reportid ' +
                rid +
                ' Saved Successfully to ' +
                lang +
                ' table!'
            );
            break;
          default:
            console.log('No Locale was matched!');
            break;
        }
      } catch (err) {
        console.log(err);
        console.log('Got error while saving the translated faqs to database!');
      }
    } catch (err) {
      console.log(err);
      console.log(
        'Unable to Translate the Faqs of reportId ' + rid + ' to ' + lang
      );
    }
  } else {
    console.log('There is No FAQs received to translate!');
    return null;
  }
}

async function isReportTraslated(reportId: number, locale: string) {
  try {
    let report;
    switch (locale) {
      case 'fr':
        report = await prismaClient.cmi_cmifaq_translation_fr.findFirst({
          where: { rid: reportId },
        });
        break;
      case 'it':
        report = await prismaClient.cmi_cmifaq_translation_it.findFirst({
          where: { rid: reportId },
        });
        break;
      case 'de':
        report = await prismaClient.cmi_cmifaq_translation_de.findFirst({
          where: { rid: reportId },
        });
        break;
      case 'zh':
        report = await prismaClient.cmi_cmifaq_translation_zh.findFirst({
          where: { rid: reportId },
        });
        break;
      case 'ru':
        report = await prismaClient.cmi_cmifaq_translation_ru.findFirst({
          where: { rid: reportId },
        });
        break;
      case 'ko':
        report = await prismaClient.cmi_cmifaq_translation_ko.findFirst({
          where: { rid: reportId },
        });
        break;
      case 'ja':
        report = await prismaClient.cmi_cmifaq_translation_ja.findFirst({
          where: { rid: reportId },
        });
        break;
      case 'pt':
        report = await prismaClient.cmi_cmifaq_translation_pt.findFirst({
          where: { rid: reportId },
        });
        break;
      default:
        return false;
    }

    if (report === null) {
      return false;
    }

    return true;
  } catch (err) {
    console.log({
      message:
        'Got error while checking if Faqs are alredy translated -> ' + err,
      level: 'error',
    });
  }
}

async function sendToTranslate(rid: number) {
  const limit = pLimit(8);

  const promises = locales.map((locale) =>
    limit(() => translateReport(rid, locale))
  );
  return await Promise.all(promises);
}

async function translate() {
  //Create the Request Limit
  const limit = pLimit(1);
  console.log('Translation is Started !');
  try {
    const faqIds = await prismaClient.cmi_cmifaq.findMany({
      select: {
        rid: true,
      },
    });

    //Creating the Concurrent Request Promises for the Single Locale
    const promises = faqIds.map((id: any) =>
      limit(() => sendToTranslate(id.rid))
    );

    await Promise.all(promises);
    console.log('All faqs are translated in all languages!');
  } catch (err) {
    throw new Error('Error while Running Script! Please Try Again :' + err);
  }
}

translate();
