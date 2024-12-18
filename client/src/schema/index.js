import * as Yup from "yup";

// Enhanced password validation with stricter rules
const passwordRules = Yup.string()
  .min(8, "Password must be at least 8 characters long")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(/[^\w]/, "Password must contain at least one special character")
  .required("Please enter your password");

export const signUpSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(25, "Name cannot exceed 25 characters")
    .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces")
    .required("Please enter your name"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email"),

  password: passwordRules,

  confirm_password: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),

 
});

export const signInSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email"),
  password: passwordRules,
});

export const resetPasswordSchema = Yup.object({
  password: passwordRules,
});

export const passwordChangeSchema = Yup.object({
  oldPassword: Yup.string().required("Please enter your old password"),
  newPassword: passwordRules, // Applying the advanced password rules
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Please confirm your new password"),
});

export const editSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),

  email: Yup.string().email("Invalid email address"),


});

export const createProductSchema = Yup.object({
  name: Yup.string()
    .min(2, "Product name must be at least 2 characters")
    .max(50, "Product name cannot exceed 50 characters")
    .required("Please enter the product name"),

  price: Yup.number()
    .typeError("Price must be a number")
    .min(1, "Price must be at least 1")
    .max(100000, "Price cannot exceed 100,000")
    .required("Please enter the price"),

  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description cannot exceed 1000 characters")
    .required("Please enter the product description"),

  category: Yup.string()
    .oneOf(["men", "women", "kids"], "Please select a valid category")
    .required("Please select a category"),

  type: Yup.string()
    .oneOf(
      ["topwear", "bottomwear", "winterwear"],
      "Please select a valid type"
    )
    .required("Please select a type"),
  sizes: Yup.array()
    .of(
      Yup.object().shape({
        size: Yup.string()
          .min(1, "Size cannot be empty")
          .max(20, "Size cannot exceed 20 characters"), // Optional, adjust as needed

        stock: Yup.number()
          .typeError("Stock must be a number")
          .min(1, "Stock must be at least 1")
          .max(10000, "Stock cannot exceed 10,000")
          .required("Stock is required"),
      })
    )
    .required("At least one size-stock pair is required")
    .min(1, "At least one size-stock pair is required"),
});

export const editProdcutSchema = Yup.object({
  name: Yup.string()
    .min(2, "Product name must be at least 2 characters")
    .max(50, "Product name cannot exceed 50 characters"),

  price: Yup.number()
    .typeError("Price must be a number")
    .min(1, "Price must be at least 1")
    .max(100000, "Price cannot exceed 100,000"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description cannot exceed 1000 characters"),
  category: Yup.string().oneOf(
    ["men", "women", "kids"],
    "Please select a valid category"
  ),
  type: Yup.string().oneOf(
    ["topwear", "bottomwear", "winterwear"],
    "Please select a valid type"
  ),

  sizes: Yup.array()
    .of(
      Yup.object().shape({
        size: Yup.string()
          .min(1, "Size cannot be empty")
          .max(20, "Size cannot exceed 20 characters"), // Optional, adjust as needed

        stock: Yup.number()
          .typeError("Stock must be a number")
          .min(0, "Stock must be at least 1")
          .max(10000, "Stock cannot exceed 10,000"),
      })
    )
    .required("At least one size-stock pair is required")
    .min(1, "At least one size-stock pair is required"),
});

export const orderValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name can't be longer than 50 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  shippingAddress: Yup.object().shape({
    address: Yup.string()
      .min(5, "Address must be at least 5 characters long")
      .max(100, "Address can't be longer than 100 characters")
      .required("Address is required"),

    city: Yup.string()
      .min(2, "City must be at least 2 characters long")
      .required("City is required"),

    postalCode: Yup.string()
      .matches(/^\d{4}$/, "Postal Code must be 4 digits")
      .required("Postal Code is required"),

    country: Yup.string()
      .min(2, "Country must be at least 2 characters long")
      .required("Country is required"),

    phone: Yup.string()
      .matches(
        /^[0-9]{10,15}$/,
        "Phone number must be between 10 and 15 digits"
      )
      .required("Phone number is required"),
  }),
});
