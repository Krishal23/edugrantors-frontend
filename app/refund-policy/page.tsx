"use client"

import type React from "react"
import { useState } from "react"
import Heading from "../utils/Heading"
import Header from "../components/Header"
import Footer from "../components/Footer"

const RefundPolicy: React.FC = () => {
  const [route, setRoute] = useState("Login")
  const [open, setOpen] = useState(false)

  return (
    <>
      <Heading
        title="Refund and Cancellation Policy - EDU GRANTORS"
        description="Refund and Cancellation Policy for EDU GRANTORS services."
        keywords="Refund, Cancellation, Policy, EDU GRANTORS, Education"
      />
      <Header open={open} setOpen={setOpen} activeItem={5} setRoute={setRoute} route={route} />

      <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-300 p-4 sm:p-8 space-y-12">
        {/* Header Section */}
        <header className="text-center space-y-4 mb-16">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-slate-300 mb-4">
            Refund and Cancellation Policy
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-gray-700 dark:text-gray-400">
            Please read our refund and cancellation policy carefully before making a purchase.
          </p>
        </header>

        {/* Refund and Cancellation Policy Content */}
        <section className="max-w-4xl mx-auto space-y-8">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Refund Eligibility</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You are entitled to a refund under the following circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                The purchased course is not assigned to you within the expiration date from your date of purchase.
              </li>
              <li>You have paid twice for the same course.</li>
            </ul>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Non-Refundable Circumstances
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Under any other circumstances, we will not consider refund requests. This policy is in place because:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Our courses are digital products.</li>
              <li>Once purchased, you have immediate access to the course content.</li>
              <li>The nature of digital content makes it impossible to "return" once it has been accessed.</li>
            </ul>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Refund Process</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you believe you are eligible for a refund based on the criteria mentioned above:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Contact our customer support team within 7 days of your purchase.</li>
              <li>Provide your order number and the reason for requesting a refund.</li>
              <li>Our team will review your request and respond within 3-5 business days.</li>
              <li>If approved, the refund will be processed to the original method of payment.</li>
            </ol>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Cancellation Policy</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Due to the immediate access provided to our digital courses:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>We do not offer a cancellation option for purchases once they are completed.</li>
              <li>All sales are considered final unless they meet the refund eligibility criteria.</li>
            </ul>
          </div>

        </section>
      </div>

      <Footer />
    </>
  )
}

export default RefundPolicy

