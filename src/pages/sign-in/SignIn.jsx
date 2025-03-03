import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import * as styles from './SignIn.module.scss'
const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = data => {
    console.log('Form Data:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Email */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Email address</label>
        <input
          type="email"
          placeholder="Enter email"
          {...register('email', { required: 'Email is required' })}
          className={styles.input}
        />
        <p className={styles.helperText}>
          We'll never share your email with anyone else.
        </p>
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Password</label>
        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: 'Password is required' })}
          className={styles.input}
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
      </div>

      {/* Кнопка Submit */}
      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  )
}

export default SignIn
