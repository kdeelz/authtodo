import React from 'react';
import { useAuth } from '../controller/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../css/Registerform.css'; // Ensure the CSS file is correctly imported
import '../App.css';

const RegisterForm = () => {
  const { register, message } = useAuth();

  // Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Full Name is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  return (
    <Formik
      initialValues={{ name: '', username: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        register(values.username, values.password);
        setSubmitting(false); // Allow form submission
      }}
    >
      {({ isSubmitting }) => (
        <Form className="register-form">
          <h2 className="form-title">Register</h2>

          <div className="input-group">
            <Field
              type="text"
              name="name"
              className="form-input"
              placeholder="Full Name"
            />
            <ErrorMessage name="name" component="div" className="error-message" />
          </div>

          <div className="input-group">
            <Field
              type="text"
              name="username"
              className="form-input"
              placeholder="Username"
            />
            <ErrorMessage name="username" component="div" className="error-message" />
          </div>

          <div className="input-group">
            <Field
              type="password"
              name="password"
              className="form-input"
              placeholder="Password"
            />
            <ErrorMessage name="password" component="div" className="error-message" />
          </div>

          <button type="submit" className="form-button" disabled={isSubmitting}>
            Register
          </button>

          {message && (
            <p className={`message ${message.includes('success') ? 'success' : 'error'}`}>
              {message}
            </p>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
