
import nodemailer from "nodemailer";


export async function POST(request: Request) {
  try {
    const { name, email, need, budget, message } =
      await request.json();

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim() ||
      name.length > 100 ||
      email.length > 254 ||
      message.length > 5000
    ) {
      return Response.json(
        { error: "Please check the required fields." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    if (
      (need != null && (typeof need !== "string" || need.length > 200)) ||
      (budget != null && (typeof budget !== "string" || budget.length > 100))
    ) {
      return Response.json(
        { error: "Invalid form data." },
        { status: 400 }
      );
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      throw new Error("Gmail environment variables are missing.");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      replyTo: email.trim(),
      subject: `New project inquiry from ${name.trim()}`,
      text: `
NEW PROJECT INQUIRY

Name: ${name.trim()}
Email: ${email.trim()}

What do you need?
${need || "Not specified"}

Approximate budget:
${budget || "Not specified"}

PROJECT DESCRIPTION:
${message.trim()}
      `,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error("Inquiry email error:", error);

    return Response.json(
      { error: "Unable to send your inquiry. Please try again." },
      { status: 500 }
    );
  }
}

