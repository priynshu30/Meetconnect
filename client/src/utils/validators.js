export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePassword = (password) => {
  if (!password) return 'Password is required'
  if (password.length < 6) return 'Password must be at least 6 characters'
  return null
}

export const validatePhone = (phone) => {
  if (!phone) return null // optional
  if (!/^[0-9]{10}$/.test(phone)) return 'Enter a valid 10-digit phone number'
  return null
}

export const validateName = (name) => {
  if (!name || !name.trim()) return 'Name is required'
  if (name.trim().length < 2) return 'Name must be at least 2 characters'
  return null
}

export const validateLoginForm = ({ email, password }) => {
  const errors = {}
  if (!email) errors.email = 'Email is required'
  else if (!validateEmail(email)) errors.email = 'Enter a valid email address'
  const pwErr = validatePassword(password)
  if (pwErr) errors.password = pwErr
  return errors
}

export const validateSignupForm = ({ name, email, password, contactNumber }) => {
  const errors = {}
  const nameErr = validateName(name)
  if (nameErr) errors.name = nameErr
  if (!email) errors.email = 'Email is required'
  else if (!validateEmail(email)) errors.email = 'Enter a valid email address'
  const pwErr = validatePassword(password)
  if (pwErr) errors.password = pwErr
  const phoneErr = validatePhone(contactNumber)
  if (phoneErr) errors.contactNumber = phoneErr
  return errors
}

export const validateInterviewForm = ({ type, date, time, interviewer }) => {
  const errors = {}
  if (!type) errors.type = 'Please select interview type'
  if (!date) errors.date = 'Please select a date'
  if (!time) errors.time = 'Please select a time'
  if (!interviewer) errors.interviewer = 'Please select an interviewer'
  if (date) {
    const selected = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (selected < today) errors.date = 'Date cannot be in the past'
  }
  return errors
}
