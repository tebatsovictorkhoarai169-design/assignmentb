// Form validation for the visitor enquiry. Each rule returns an error string or ''.

export const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

const rules = {
  fullName: (v) => {
    const name = v.trim();
    if (!name) return 'Enter your full name.';
    if (!/^[\p{L}][\p{L}\s'.-]*$/u.test(name)) return 'Use letters only in your name.';
    if (name.split(/\s+/).length < 2) return 'Enter your first and last name.';
    return '';
  },
  email: (v) => {
    const email = v.trim();
    if (!email) return 'Enter your email address.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return 'Enter an email like name@example.com.';
    return '';
  },
  phone: (v) => {
    const phone = v.replace(/[\s()-]/g, '');
    if (!phone) return 'Enter your phone number.';
    if (!/^\+?\d{8,15}$/.test(phone)) return 'Use 8 to 15 digits, for example +266 5812 3456.';
    return '';
  },
  destination: (v) => (v ? '' : 'Choose a destination.'),
  visitors: (v) => {
    if (String(v).trim() === '') return 'Enter the number of visitors.';
    const n = Number(v);
    if (!Number.isInteger(n) || n < 1 || n > 50) return 'Enter a whole number from 1 to 50.';
    return '';
  },
  date: (v) => {
    if (!v) return 'Choose a preferred visit date.';
    if (v < todayISO()) return 'Choose today or a later date.';
    return '';
  },
  message: (v) => {
    const m = v.trim();
    if (!m) return 'Write a short message.';
    if (m.length < 10) return 'Write at least 10 characters so we can help.';
    if (m.length > 500) return 'Keep your message under 500 characters.';
    return '';
  },
};

export const validateField = (name, value) => rules[name](value);

export const validateAll = (values) => {
  const errors = {};
  Object.keys(rules).forEach((key) => {
    const msg = rules[key](values[key] ?? '');
    if (msg) errors[key] = msg;
  });
  return errors;
};
