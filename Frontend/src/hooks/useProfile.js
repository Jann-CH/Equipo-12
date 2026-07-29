import { useState, useEffect } from 'react'
import { getUserProfile, updateSubjects } from '../services/profile/profileService'

export function useProfile() {
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    getUserProfile()
      .then(data => setProfile(data))
      .finally(() => setIsLoading(false))
  }, [])

  const removeSubject = async (subjectToRemove) => {
    const updated = profile.subjects.filter(s => s !== subjectToRemove)
    setProfile(prev => ({ ...prev, subjects: updated }))
    await updateSubjects(updated)
  }

  const addSubject = async (newSubject) => {
    if (!newSubject.trim() || profile.subjects.includes(newSubject)) return
    const updated = [...profile.subjects, newSubject]
    setProfile(prev => ({ ...prev, subjects: updated }))
    await updateSubjects(updated)
  }

  return {
    profile,
    isLoading,
    isEditing,
    setIsEditing,
    removeSubject,
    addSubject,
  }
}