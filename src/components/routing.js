import React, { Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Preloader from './preloader/Preloader'
import { LazyAboutUs } from '../pages/about-us/AboutUs.lazy'
import NotFound from '../pages/not-found/NotFound'
import { LazyProfile } from '../pages/profile/Profile.lazy'
import { LazySignIn } from '../pages/sign-in/SignIn.lazy'

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/aboutus" />} />
      <Route
        path="aboutus"
        element={
          <Suspense fallback={<Preloader />}>
            <LazyAboutUs />
          </Suspense>
        }
      />
      <Route
        path="signin"
        element={
          <Suspense fallback={<Preloader />}>
            <LazySignIn />
          </Suspense>
        }
      />
      <Route
        path="profile"
        element={
          <Suspense fallback={<Preloader />}>
            <LazyProfile />
          </Suspense>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Routing
