import { useEffect, useRef, useState } from 'react';
import { validateAll, validateField, todayISO } from '../utils/validate.js';

const EMPTY = {
  fullName: '',
  email: '',
  phone: '',
  destination: '',
  visitors: '1',
  date: '',
  message: '',
};

const makeReference = () => `THB-${Date.now().toString(36).toUpperCase().slice(-6)}`;

const prettyDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export default function EnquiryForm({ attractions, initialDestination }) {
  const [values, setValues] = useState({ ...EMPTY, destination: initialDestination });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [confirmation, setConfirmation] = useState(null);
  const formRef = useRef(null);
  const confirmRef = useRef(null);

  // When the visitor arrives from "Enquire about this place", preselect that destination.
  useEffect(() => {
    if (initialDestination) setValues((v) => ({ ...v, destination: initialDestination }));
  }, [initialDestination]);

  // Move focus to the confirmation so screen readers announce it.
  useEffect(() => {
    if (confirmation) confirmRef.current?.focus();
  }, [confirmation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (touched[name]) setErrors((err) => ({ ...err, [name]: validateField(name, value) }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((err) => ({ ...err, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validateAll(values);
    setErrors(found);
    setTouched(Object.keys(EMPTY).reduce((acc, k) => ({ ...acc, [k]: true }), {}));

    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current?.elements[firstInvalid]?.focus();
      return;
    }
    setConfirmation({ ...values, reference: makeReference() });
  };

  const reset = () => {
    setValues({ ...EMPTY, destination: '' });
    setErrors({});
    setTouched({});
    setConfirmation(null);
  };

  const field = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    'aria-invalid': errors[name] ? 'true' : 'false',
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });

  const Err = ({ name }) =>
    errors[name] ? (
      <p className="field-error" id={`${name}-error`}>
        {errors[name]}
      </p>
    ) : null;

  if (confirmation) {
    const dest = attractions.find((a) => a.id === confirmation.destination);
    return (
      <div className="confirmation" role="status" tabIndex={-1} ref={confirmRef}>
        <h2>Enquiry received</h2>
        <p>
          Thank you, {confirmation.fullName.trim().split(/\s+/)[0]}. Your reference is{' '}
          <strong>{confirmation.reference}</strong>. A reply would go to {confirmation.email}.
        </p>
        <dl className="facts">
          <div>
            <dt>Destination</dt>
            <dd>{dest ? dest.name : 'Not selected'}</dd>
          </div>
          <div>
            <dt>Visitors</dt>
            <dd>{confirmation.visitors}</dd>
          </div>
          <div>
            <dt>Preferred date</dt>
            <dd>{prettyDate(confirmation.date)}</dd>
          </div>
        </dl>
        <p className="demo-note">This is a demo. Nothing was sent, and no data leaves your browser.</p>
        <button type="button" className="btn" onClick={reset}>
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="enquiry-form" ref={formRef} onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="fullName">Full name</label>
        <input type="text" autoComplete="name" {...field('fullName')} />
        <Err name="fullName" />
      </div>

      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input type="email" autoComplete="email" {...field('email')} />
        <Err name="email" />
      </div>

      <div className="form-field">
        <label htmlFor="phone">Phone number</label>
        <input type="tel" autoComplete="tel" placeholder="+266 5812 3456" {...field('phone')} />
        <Err name="phone" />
      </div>

      <div className="form-field">
        <label htmlFor="destination">Selected destination</label>
        <select {...field('destination')}>
          <option value="">Choose a destination</option>
          {attractions.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
        <Err name="destination" />
      </div>

      <div className="form-field">
        <label htmlFor="visitors">Number of visitors</label>
        <input type="number" inputMode="numeric" min="1" max="50" {...field('visitors')} />
        <Err name="visitors" />
      </div>

      <div className="form-field">
        <label htmlFor="date">Preferred visit date</label>
        <input type="date" min={todayISO()} {...field('date')} />
        <Err name="date" />
      </div>

      <div className="form-field form-wide">
        <label htmlFor="message">Message</label>
        <textarea rows="5" placeholder="Tell us what you would like to do and any questions you have." {...field('message')} />
        <p className="field-count">{values.message.trim().length} of 500 characters</p>
        <Err name="message" />
      </div>

      <div className="form-wide form-actions">
        <button type="submit" className="btn btn-primary">
          Send enquiry
        </button>
      </div>
    </form>
  );
}
