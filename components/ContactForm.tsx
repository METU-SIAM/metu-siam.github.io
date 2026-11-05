"use client";

import { useId, useState, type FormEvent } from "react";
import styles from "./ContactForm.module.css";

/**
 * Posts to Formspree when a form id is configured in content/data/site.yml;
 * until then it opens the reader's mail app with the message filled in.
 */
export function ContactForm({ email, formId, subject = "" }: { email: string; formId: string; subject?: string }) {
  const id = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const live = formId.trim() !== "";

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (!live) {
      const name = String(data.get("name") ?? "");
      const from = String(data.get("email") ?? "");
      const topic = String(data.get("subject") || "Message from the website");
      const body = `${name ? `Name: ${name}\n` : ""}${from ? `Email: ${from}\n\n` : ""}${data.get("message") ?? ""}`;
      window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(body)}`;
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className={styles.form} onSubmit={submit} noValidate={false}>
      <input type="hidden" name="_subject" value="METU SIAM website" />
      <div className={styles.hp} aria-hidden="true">
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>
      <div className={styles.row2}>
        <div className={styles.field}>
          <label htmlFor={`${id}-name`}>
            Name <span aria-hidden="true">*</span>
          </label>
          <input id={`${id}-name`} name="name" type="text" autoComplete="name" required />
        </div>
        <div className={styles.field}>
          <label htmlFor={`${id}-email`}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" required />
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor={`${id}-subject`}>Subject</label>
        <input id={`${id}-subject`} name="subject" type="text" defaultValue={subject} />
      </div>
      <div className={styles.field}>
        <label htmlFor={`${id}-message`}>
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea id={`${id}-message`} name="message" rows={6} required />
      </div>
      <div className={styles.actions}>
        <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : live ? "Send" : "Write the email"}
        </button>
        <p className={styles.status} role="status" aria-live="polite">
          {!live
            ? `Opens your mail app with a message to ${email}.`
            : status === "sent"
              ? "Thanks — your message was sent."
              : status === "error"
                ? `Something went wrong. Please write to ${email} directly.`
                : ""}
        </p>
      </div>
    </form>
  );
}
