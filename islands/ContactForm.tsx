// islands/ContactForm.tsx
import { KeyboardEventHandler } from "preact";
import { useState } from "preact/hooks";
import { signal } from "@preact/signals";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface Status {
  type: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      // Replace 'YOUR_FORM_ID' with your actual Formspree form ID
      const response = await fetch("https://formspree.io/f/mjklbpqj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: "Something went wrong. Please try again.",
        });
      }
    } catch (_error) {
      setStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleShortcuts: KeyboardEventHandler<HTMLElement> = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <div class="card max-w-3xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-4xl font-bold text-fg-bright mb-2">
          Let's Work Together
        </h2>
        <p class="text-fg-light text-lg">
          Got a challenging testing problem? Building something that needs to
          scale? Let's talk.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        onKeyDown={handleShortcuts}
        class="flex flex-col gap-6"
      >
        <div>
          <label
            htmlFor="name"
            class="block text-fg-mid text-sm font-medium mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autocomplete={signal("on")}
            class="input-field"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            class="block text-fg-mid text-sm font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required={signal(true)}
            autocomplete={signal("on")}
            class="input-field"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            class="block text-fg-mid text-sm font-medium mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required={signal(true)}
            rows={6}
            class="input-field resize-y font-sans"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          class="btn-primary text-lg"
        >
          {submitting ? "Sending..." : "Send Message"}
        </button>

        {status.message && (
          <div
            class={`p-4 rounded-lg text-center border ${
              status.type === "success"
                ? "bg-status-green/10 border-status-green text-status-green"
                : "bg-status-red/10 border-status-red text-status-red"
            }`}
          >
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
}
