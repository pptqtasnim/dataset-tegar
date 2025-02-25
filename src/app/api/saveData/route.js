import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const jsonFilePath = path.join(process.cwd(), "public/data.json");
const csvFilePath = path.join(process.cwd(), "public/data.csv");

export async function POST(request) {
  const data = await request.json();

  try {
    const savedData = await prisma.dataset.create({
      data: {
        instruction: data.instruction,
        question: data.question,
        answer: data.answer,
      },
    });

    // let jsonData = [];
    // if (fs.existsSync(jsonFilePath)) {
    //   const fileData = fs.readFileSync(jsonFilePath);
    //   jsonData = JSON.parse(fileData);
    // }
    // jsonData.push(data);
    // fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

    // const csvData = `${data.instruction},${data.question},${data.answer}\n`;
    // fs.appendFileSync(csvFilePath, csvData);

    return new Response(
      JSON.stringify({ message: "Data saved successfully!", savedData }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to save data." }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } finally {
    await prisma.$disconnect();
  }
}
