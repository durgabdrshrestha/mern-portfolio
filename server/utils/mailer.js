import { Resend } from "resend";

const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[character]));

export const sendContactReply = async ({ to, subject, body }) => {
  if (!process.env.RESEND_API_KEY) {
    const error = new Error("RESEND_API_KEY is not configured.");
    error.code = "EMAIL_NOT_CONFIGURED";
    throw error;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const safeBody = escapeHtml(body).replace(/\r?\n/g, "<br>");

  const { data, error } = await resend.emails.send({
    from:
      process.env.RESEND_FROM ||
      "Portfolio <onboarding@resend.dev>",
    to: [to],
    subject: subject.replace(/[\r\n]+/g, " "),
    text: body,
    html: `<p>${safeBody}</p>`,
  });

  if (error) {
    console.error("Resend email error:", error);

    const emailError = new Error(
      error.message || "Failed to send email."
    );

    emailError.code = "EMAIL_SEND_FAILED";
    emailError.details = error;

    throw emailError;
  }

  console.log("Email sent successfully:", data?.id);

  return data;
};