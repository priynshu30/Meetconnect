import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register, googleLogin } from '../redux/slices/authSlice'
import { validateSignupForm } from '../utils/validators'
import { FiUser, FiMail, FiLock, FiPhone, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'

export default function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.auth)

  const [form, setForm] = useState({ name: '', email: '', password: '', contactNumber: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validateSignupForm(form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    const result = await dispatch(register(form))
    if (!result.error) navigate('/dashboard')
  }

  const handleGoogleLogin = async () => {
    const mockGoogleData = {
      name: 'Test Google User',
      email: `google_user_${Math.floor(Math.random() * 1000)}@test.com`,
      googleId: 'google_123456789'
    }
    const result = await dispatch(googleLogin(mockGoogleData))
    if (!result.error) navigate('/dashboard')
  }

  const fields = [
    { id: 'signup-name', name: 'name', label: 'Full Name', type: 'text', icon: <FiUser size={16} />, placeholder: 'Jane Smith' },
    { id: 'signup-email', name: 'email', label: 'Email', type: 'email', icon: <FiMail size={16} />, placeholder: 'you@example.com' },
    { id: 'signup-contact', name: 'contactNumber', label: 'Phone Number (optional)', type: 'tel', icon: <FiPhone size={16} />, placeholder: '9876543210' },
  ]

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 hero-bg">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md animate-slide-up">
        <div className="glass rounded-2xl p-8 shadow-2xl shadow-black/40">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/40">
              <span className="text-white font-black text-2xl">M</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Create your account</h1>
            <p className="text-slate-400 text-sm">Start your interview prep journey today</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {fields.map(({ id, name, label, type, icon, placeholder }) => (
              <div key={name}>
                <label htmlFor={id} className="label">{label}</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">{icon}</span>
                  <input
                    id={id}
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={`input-field pl-11 ${errors[name] ? 'input-error' : ''}`}
                    autoComplete={name === 'email' ? 'email' : name === 'name' ? 'name' : 'off'}
                  />
                </div>
                {errors[name] && <p className="error-text">{errors[name]}</p>}
              </div>
            ))}

            {/* Password */}
            <div>
              <label htmlFor="signup-password" className="label">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className={`input-field pl-11 pr-11 ${errors.password ? 'input-error' : ''}`}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>

            <button
              id="signup-submit-btn"
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Create Account <FiArrowRight /></>
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700/50"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-500">Or continue with</span>
            </div>
          </div>

          <button
            id="google-signup-btn"
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 glass-light rounded-xl hover:bg-slate-700/50 transition-all font-medium text-slate-200"
          >
            <FcGoogle size={20} /> Google
          </button>

          <p className="text-center text-slate-400 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" id="goto-login-link" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
