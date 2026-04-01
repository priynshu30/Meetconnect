import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../redux/slices/authSlice'
import { FiUser, FiPhone, FiCalendar, FiMail, FiEdit2, FiSave } from 'react-icons/fi'

export default function MyProfile() {
  const dispatch = useDispatch()
  const { user, loading } = useSelector((state) => state.auth)

  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: '', contactNumber: '', dob: '' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        contactNumber: user.contactNumber || '',
        dob: user.dob ? user.dob.split('T')[0] : '',
      })
    }
  }, [user])

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (form.contactNumber && !/^[0-9]{10}$/.test(form.contactNumber)) {
      errs.contactNumber = 'Enter a valid 10-digit phone number'
    }
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    const result = await dispatch(updateProfile(form))
    if (!result.error) setEditing(false)
  }

  const initials = user?.name?.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase() || 'U'

  return (
    <div className="page-container animate-fade-in max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="section-title flex items-center gap-3">
          <FiUser className="text-indigo-400" /> My Profile
        </h1>
        <p className="section-subtitle mb-0">Manage your account details</p>
      </div>

      {/* Profile card */}
      <div className="glass rounded-2xl p-8 shadow-xl shadow-black/20">
        {/* Avatar section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 pb-8 border-b border-slate-700/50">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-indigo-500/30 flex-shrink-0">
            {initials}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
            <p className="text-slate-400 text-sm mb-3">{user?.email}</p>
            <span className="badge-info">Student Account</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="profile-name" className="label flex items-center gap-1.5">
                <FiUser size={13} className="text-indigo-400" /> Full Name
              </label>
              <input
                id="profile-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={!editing}
                className={`input-field ${!editing ? 'opacity-60 cursor-not-allowed' : ''} ${errors.name ? 'input-error' : ''}`}
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>

            {/* Email (read-only) */}
            <div>
              <label htmlFor="profile-email" className="label flex items-center gap-1.5">
                <FiMail size={13} className="text-indigo-400" /> Email Address
                <span className="text-xs text-slate-600 ml-1">(non-editable)</span>
              </label>
              <input
                id="profile-email"
                type="email"
                value={user?.email || ''}
                disabled
                className="input-field opacity-50 cursor-not-allowed"
              />
            </div>

            {/* Contact */}
            <div>
              <label htmlFor="profile-contact" className="label flex items-center gap-1.5">
                <FiPhone size={13} className="text-indigo-400" /> Phone Number
              </label>
              <input
                id="profile-contact"
                type="tel"
                name="contactNumber"
                value={form.contactNumber}
                onChange={handleChange}
                disabled={!editing}
                placeholder="9876543210"
                className={`input-field ${!editing ? 'opacity-60 cursor-not-allowed' : ''} ${errors.contactNumber ? 'input-error' : ''}`}
              />
              {errors.contactNumber && <p className="error-text">{errors.contactNumber}</p>}
            </div>

            {/* DOB */}
            <div>
              <label htmlFor="profile-dob" className="label flex items-center gap-1.5">
                <FiCalendar size={13} className="text-indigo-400" /> Date of Birth
              </label>
              <input
                id="profile-dob"
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                disabled={!editing}
                className={`input-field ${!editing ? 'opacity-60 cursor-not-allowed' : ''}`}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-8">
            {editing ? (
              <>
                <button
                  id="save-profile-btn"
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex items-center gap-2"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <><FiSave size={15} /> Save Changes</>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => { setEditing(false); setErrors({}) }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                id="edit-profile-btn"
                type="button"
                onClick={() => setEditing(true)}
                className="btn-primary flex items-center gap-2"
              >
                <FiEdit2 size={15} /> Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
