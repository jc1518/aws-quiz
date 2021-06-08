import axios from "axios";
import cheerio from "cheerio";

export interface Quiz {
  question: string;
  answer: string;
}

export async function awsQuiz(): Promise<Quiz[]> {
  try {
    const url: string =
      "https://aws.amazon.com/premiumsupport/knowledge-center/";
    const response = await axios(url);
    let quizs: Array<Quiz> = [{ question: "", answer: "" }];
    const $ = cheerio.load(response.data);
    $("p").each(function (this: any) {
      const question: string = $(this).text();
      const answer: string | undefined = $(this).find("a").attr("href");
      if (answer !== undefined) {
        if (answer.includes("/premiumsupport/knowledge-center")) {
          const answerKey: string = answer.split("/")[3];
          quizs.push({
            question: question,
            answer: `${url}${answerKey}`,
          });
        }
      }
    });
    return quizs;
  } catch (err: any) {
    console.error(`Failed to initialize AWS Quiz: ${err.message}`);
    throw new Error(err);
  }
}
