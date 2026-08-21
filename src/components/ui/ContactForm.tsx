import { useState, type FormEvent } from 'react';
import {
  contactFormEndpoint,
  isUsableEmail,
  personalInfo,
  socialLinks,
} from '../../data/portfolio';
import { useDesktop } from '../../hooks/useDesktop';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const empty: FormState = { name: '', email: '', subject: '', message: '' };

export function ContactForm() {
  const { notify } = useDesktop();
  const [values, setValues] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validate = () => {
    const next: Partial<FormState> = {};
    if (values.name.trim().length < 2) next.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Enter a valid email.';
    if (!values.subject.trim()) next.subject = 'Add a subject.';
    if (values.message.trim().length < 10) next.message = 'Message should be at least 10 characters.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus('idle');
    if (!validate()) return;

    if (contactFormEndpoint) {
      try {
        const response = await fetch(contactFormEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error('Request failed');
        setStatus('success');
        setValues(empty);
        notify({
          title: 'Message sent',
          message: 'Thanks — I will get back to you soon.',
          tone: 'success',
        });
      } catch {
        setStatus('error');
        notify({
          title: 'Send failed',
          message: 'The form service is unavailable. Try email instead.',
          tone: 'error',
        });
      }
      return;
    }

    if (!isUsableEmail(socialLinks.email)) {
      setStatus('error');
      notify({
        title: 'Email missing',
        message: 'Add your email in src/data/portfolio.ts to enable mailto.',
        tone: 'error',
      });
      return;
    }

    const body = `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`;
    const href = `mailto:${socialLinks.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setStatus('success');
    notify({
      title: 'Message prepared',
      message: 'Message prepared successfully! Your email application will now open.',
      tone: 'success',
    });
  };

  const copyEmail = async () => {
    if (!isUsableEmail(socialLinks.email)) {
      notify({
        title: 'Email missing',
        message: 'Replace [YOUR EMAIL] in src/data/portfolio.ts first.',
        tone: 'error',
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(socialLinks.email);
      notify({ title: 'Copied', message: 'Email address copied to clipboard.', tone: 'success' });
    } catch {
      notify({ title: 'Copy failed', message: 'Select and copy the email manually.', tone: 'error' });
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_180px]">
      <form className="space-y-3" onSubmit={onSubmit} noValidate>
        <div>
          <label className="font-display text-sm" htmlFor="contact-name">
            Name
          </label>
          <input
            id="contact-name"
            className="retro-input mt-1"
            value={values.name}
            onChange={(event) => setValues({ ...values, name: event.target.value })}
            autoComplete="name"
          />
          {errors.name && <p className="field-error">{errors.name}</p>}
        </div>
        <div>
          <label className="font-display text-sm" htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            className="retro-input mt-1"
            type="email"
            value={values.email}
            onChange={(event) => setValues({ ...values, email: event.target.value })}
            autoComplete="email"
          />
          {errors.email && <p className="field-error">{errors.email}</p>}
        </div>
        <div>
          <label className="font-display text-sm" htmlFor="contact-subject">
            Subject
          </label>
          <input
            id="contact-subject"
            className="retro-input mt-1"
            value={values.subject}
            onChange={(event) => setValues({ ...values, subject: event.target.value })}
          />
          {errors.subject && <p className="field-error">{errors.subject}</p>}
        </div>
        <div>
          <label className="font-display text-sm" htmlFor="contact-message">
            Message
          </label>
          <textarea
            id="contact-message"
            className="retro-textarea mt-1"
            value={values.message}
            onChange={(event) => setValues({ ...values, message: event.target.value })}
          />
          {errors.message && <p className="field-error">{errors.message}</p>}
        </div>
        {!contactFormEndpoint && (
          <p className="font-body text-xs leading-relaxed text-[var(--muted-text)]">
            No backend is configured, so Send opens your email application with a prepared message.
          </p>
        )}
        <button type="submit" className="retro-btn retro-btn-primary w-full">
          Send
        </button>
        {status === 'success' && (
          <p className="border-2 border-[var(--dark-outline)] bg-[var(--success-green)] p-2 font-body text-sm text-[#1a1222]">
            {contactFormEndpoint
              ? 'Thanks — your message was sent.'
              : 'Message prepared successfully! Your email application will now open.'}
          </p>
        )}
        {status === 'error' && (
          <p className="border-2 border-[var(--dark-outline)] bg-[var(--error-red)] p-2 font-body text-sm text-[#fffdf3]">
            The message could not be delivered from this site. Use the email on the right.
          </p>
        )}
      </form>

      <aside className="space-y-2 font-body text-sm">
        <p>
          <span className="font-display">Email</span>
          <br />
          {socialLinks.email}
        </p>
        <p>
          <span className="font-display">GitHub</span>
          <br />
          {socialLinks.github}
        </p>
        <p>
          <span className="font-display">LinkedIn</span>
          <br />
          {socialLinks.linkedin}
        </p>
        <p>
          <span className="font-display">Location</span>
          <br />
          {personalInfo.location}
        </p>
        <button type="button" className="retro-btn w-full" onClick={() => void copyEmail()}>
          Copy Email
        </button>
      </aside>
    </div>
  );
}

export function ContactWindow() {
  return <ContactForm />;
}
