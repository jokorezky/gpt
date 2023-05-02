import axios from "axios";

const url = "https://api.openai.com/v1/completions";

export default async (req: any, res: any) => {
  const prompt1 = `Question: ${req.body.question}?\nAnswer: ${req.body.answer}`;
  try {
    const response = await axios.post(
      url,
      {
        prompt: prompt1,
        max_tokens: 100,
        n: 1,
        stop: "\n",
        model: "text-davinci-003",
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const answer = response.data.choices[0].text.trim();

    const similarity = cosineSimilarity(
      "is the current President of the United States of America.",
      answer
    );

    // menghitung skor
    const score = Math.round(similarity * 100);

    console.log(`Jawaban: ${answer}\nSkor: ${score}`);

    res.status(200).json({ answer, score });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

function cosineSimilarity(a: any, b: any) {
  const vecA = a.toLowerCase().split(" ");
  const vecB = b.toLowerCase().split(" ");

  const intersection = vecA.filter((value: any) => vecB.includes(value));
  const union = [...(new Set([...vecA, ...vecB]) as any)];

  return intersection.length / union.length;
}
