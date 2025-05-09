"use client"

import type React from "react"
import { useState } from "react"
import Header from "../Header"
import Footer from "../Footer"
import Heading from "../../utils/Heading"

const TermsAndConditions: React.FC = () => {
  const [route, setRoute] = useState("Login")
  const [open, setOpen] = useState(false)

  return (
    <>
      <Heading
        title="Terms and Conditions - EDU GRANTORS"
        description="Terms and Conditions for using EDU GRANTORS services."
        keywords="Terms, Conditions, EDU GRANTORS, Education"
      />
      <Header open={open} setOpen={setOpen} activeItem={5} setRoute={setRoute} route={route} />

      <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-300 p-4 sm:p-8 space-y-12">
        {/* Header Section */}
        <header className="text-center space-y-4 mb-16">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-slate-300 mb-4">
            Terms and Conditions
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-gray-700 dark:text-gray-400">
            Please read these terms and conditions carefully before using our services.
          </p>
        </header>

        {/* Terms and Conditions Content */}
        <section className="max-w-4xl mx-auto space-y-8">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Welcome to EduGrantors</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              By accessing and using our website and services, you agree to comply with and be bound by the following
              terms and conditions, along with our Privacy Policy, which governs the relationship between you and
              EduGrantors in relation to this website and the services provided.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The terms "EduGrantors," "we," "us," or "our" refer to the owner of this website. The term "you" refers to
              the user or viewer of this website.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              By accessing or using the services provided by EduGrantors, including our online courses, mock tests,
              personalized mentorship, and other educational content, you acknowledge and agree to be bound by these
              Terms and Conditions and all applicable laws and regulations. If you do not agree to these terms, you must
              not use the website or services.
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Use of the Website and Services
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                The content provided on EduGrantors is for your general information and educational use only. It is
                subject to change without notice.
              </li>
              <li>
                We do not guarantee the accuracy, completeness, timeliness, or suitability of the information provided.
                We expressly disclaim any liability for errors or inaccuracies in the content.
              </li>
              <li>
                Your use of the website and any services offered, including online courses, resources, mock tests, and
                mentorship, is entirely at your own risk. We are not liable for any damage or loss resulting from your
                reliance on the information provided on the website.
              </li>
              <li>
                You are responsible for ensuring that the products, services, or information available through this
                website meet your specific needs and requirements.
              </li>
            </ul>
          </div>

          {/* Add more sections for Intellectual Property, Links to Third-Party Websites, etc. */}
        </section>

        {/* You can add more sections following the same pattern */}
      </div>

      <Footer />
    </>
  )
}

export default TermsAndConditions

