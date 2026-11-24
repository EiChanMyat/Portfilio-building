import { useState, type FormEvent } from 'react';
import { isPlaceholder, isUsableEmail, isUsableHttpUrl } from '../../data/portfolio';
import { useDesktop } from '../../hooks/useDesktop';
import { usePortfolio } from '../../hooks/usePortfolio';
import { IconCopy } from './PixelIcons';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const empty: FormState = { name: '', email: '', subject: '', message: '' };

export function ContactForm() {
  const { notify } = useDesktop();
  const { contactFormEndpoint, personalInfo, socialLinks } = usePortfolio();
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
        message: 'Set your email in Edit → Contact to enable mailto.',
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

  const copyValue = async (label: string, value: string, usable: boolean) => {
    if (!usable) {
      notify({
        title: `${label} not set`,
        message: `Set your ${label.toLowerCase()} in Edit first.`,
        tone: 'error',
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(value);
      notify({ title: 'Copied', message: `${label} copied to clipboard.`, tone: 'success' });
    } catch {
      notify({ title: 'Copy failed', message: `Select and copy the ${label.toLowerCase()} manually.`, tone: 'error' });
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_210px]">
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

      <aside className="space-y-3 font-body text-sm">
        <CopyRow
          label="Email"
          value={socialLinks.email}
          usable={isUsableEmail(socialLinks.email)}
          onCopy={() => void copyValue('Email', socialLinks.email, isUsableEmail(socialLinks.email))}
        />
        <CopyRow
          label="GitHub"
          value={socialLinks.github}
          usable={isUsableHttpUrl(socialLinks.github)}
          onCopy={() => void copyValue('GitHub', socialLinks.github, isUsableHttpUrl(socialLinks.github))}
        />
        <CopyRow
          label="LinkedIn"
          value={socialLinks.linkedin}
          usable={isUsableHttpUrl(socialLinks.linkedin)}
          onCopy={() => void copyValue('LinkedIn', socialLinks.linkedin, isUsableHttpUrl(socialLinks.linkedin))}
        />
        <CopyRow
          label="Location"
          value={personalInfo.location}
          usable={!isPlaceholder(personalInfo.location)}
          onCopy={() =>
            void copyValue('Location', personalInfo.location, !isPlaceholder(personalInfo.location))
          }
        />
      </aside>
    </div>
  );
}

function CopyRow({
  label,
  value,
  usable,
  onCopy,
}: {
  label: string;
  value: string;
  usable: boolean;
  onCopy: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <span className="font-display">{label}</span>
        <button
          type="button"
          className="copy-chip"
          aria-label={`Copy ${label}`}
          title={usable ? `Copy ${label}` : `${label} is not set yet`}
          disabled={!usable}
          onClick={onCopy}
        >
          <IconCopy size={14} />
        </button>
      </div>
      <p className="mt-0.5 break-all">{value}</p>
    </div>
  );
}

export function ContactWindow() {
  return <ContactForm />;
}
