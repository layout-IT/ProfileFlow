import React from 'react'
import { useForm } from 'react-hook-form'

import * as styles from './Form.module.scss'

const Form = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Email address</label>
        <input
          type="email"
          placeholder="Enter email"
          {...register('email', { required: 'Email is required' })}
          className={styles.input}
          autoComplete="new-password"
        />
        <p className={styles.helperText}>
          We&apos;ll never share your email with anyone else.
        </p>
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Password</label>
        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: 'Password is required' })}
          className={styles.input}
          autoComplete="new-password"
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
      </div>

      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  )
}

export default Form
