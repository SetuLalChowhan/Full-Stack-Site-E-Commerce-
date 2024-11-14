import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, verifyUser } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { Alert, Spinner } from 'flowbite-react';
import { toast } from 'react-hot-toast';

const VerifyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading, error } = useSelector((state) => state.user.user);
  
  const formik = useFormik({
    initialValues: {
      email: '',
      code: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      code: Yup.string()
        .length(6, 'Code must be exactly 6 digits')
        .matches(/^[0-9]+$/, 'Code must be numeric')
        .required('Code is required'),
    }),
    onSubmit: (values) => {
      dispatch(verifyUser({ values, navigate, toast }));
    },
  });

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen relative overflow-hidden">
     
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md border border-gray-300">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Thank you for completing your registration!
          </h1>
          <p className="text-gray-600 mt-2">
            Please verify your account to enjoy our services.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-lg font-semibold text-gray-700">
              Email Address
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full text-lg rounded-lg border focus:ring focus:ring-blue-200 transition ${
                formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-gray-400'
              }`}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* 6-Digit Code Input */}
          <div className="space-y-2">
            <label htmlFor="code" className="block text-lg font-semibold text-gray-700">
              6-Digit Verification Code
            </label>
            <input
              required
              type="text"
              id="code"
              name="code"
              placeholder="Enter your 6-digit code"
              value={formik.values.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full text-lg rounded-lg border focus:ring focus:ring-blue-200 transition ${
                formik.errors.code && formik.touched.code ? 'border-red-500' : 'border-gray-400'
              }`}
            />
            {formik.errors.code && formik.touched.code && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.code}</p>
            )}
          </div>

          {error && (
            <div className="flex justify-center items-center text-2xl">
              <Alert color="failure">
                <span className="text-lg font-semibold">{error}</span>
              </Alert>
            </div>
          )}

          {/* Verify Button */}
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-teal-600 transition duration-300"
          >
            {loading ? <Spinner color="success" aria-label="Success spinner example" /> : 'Verify'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyPage;
