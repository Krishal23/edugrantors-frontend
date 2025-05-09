"use client"

import type React from "react"
import { useState } from "react"
import Heading from "../utils/Heading"
import Header from "../components/Header"
import Footer from "../components/Footer"

const PrivacyPolicy: React.FC = () => {
  const [route, setRoute] = useState("Login")
  const [open, setOpen] = useState(false)

  return (
    <>
      <Heading
        title="Privacy Policy - EDU GRANTORS"
        description="Privacy Policy for EDU GRANTORS services."
        keywords="Privacy, Policy, EDU GRANTORS, Education"
      />
      <Header open={open} setOpen={setOpen} activeItem={5} setRoute={setRoute} route={route} />

      <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-300 p-4 sm:p-8 space-y-12">
        {/* Header Section */}
        <header className="text-center space-y-4 mb-16">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-slate-300 mb-4">Privacy Policy</h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-gray-700 dark:text-gray-400">
            This Privacy Policy describes how EduGrantors collects, uses, and protects your information when you use our
            services.
          </p>
        </header>

        {/* Privacy Policy Content */}
        <section className="max-w-4xl mx-auto space-y-8">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              1. Interpretation and Definitions
            </h2>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Interpretation</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The words with initial capital letters have meanings defined under the following conditions. These
              definitions apply to both the singular and plural forms.
            </p>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Definitions</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>You</strong> means the individual accessing or using the Service, or the entity on behalf of
                which the individual is accessing or using the Service.
              </li>
              <li>
                <strong>Company</strong> ("We", "Us", "Our") refers to EduGrantors, which offers personalized mentorship
                services for JEE, NEET, and other competitive exams, as well as school education for students in Class 8
                and above.
              </li>
              <li>
                <strong>Affiliate</strong> means an entity that controls, is controlled by, or is under common control
                with EduGrantors.
              </li>
              <li>
                <strong>Account</strong> refers to the unique account created for you to access our services.
              </li>
              <li>
                <strong>Service</strong> refers to the website, online courses, mentorship services, mock tests, PDFs,
                and video resources provided by EduGrantors.
              </li>
              <li>
                <strong>Personal Data</strong> means any information that can identify an individual, such as name,
                email, phone number, etc.
              </li>
              <li>
                <strong>Usage Data</strong> refers to data collected automatically when using the Service, such as
                device information, IP address, pages visited, and time spent on the platform.
              </li>
              <li>
                <strong>Cookies</strong> are small files stored on your device that track your usage of our services.
              </li>
            </ul>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">2. Types of Data Collected</h2>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Personal Data</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Email address</li>
              <li>First and last name</li>
              <li>Phone number</li>
              <li>Educational background and exam information (e.g., JEE, NEET, Class 8+)</li>
            </ul>
            <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200">Usage Data</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                Information such as your device's Internet Protocol (IP) address, browser type, browser version, pages
                visited, and duration of visits.
              </li>
              <li>
                Information collected from mobile devices, including device type, mobile operating system, and
                diagnostic data.
              </li>
            </ul>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              3. Tracking Technologies and Cookies
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We use cookies and similar tracking technologies to enhance and analyze our Service. Cookies help us store
              your preferences, login status, and other essential features.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Cookies may be either:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Session Cookies:</strong> Deleted once you close your browser.
              </li>
              <li>
                <strong>Persistent Cookies:</strong> Stored on your device until you manually delete them.
              </li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              You can configure your browser to refuse all cookies or to notify you when a cookie is being sent.
              However, disabling cookies may limit your ability to use some parts of the Service.
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              4. Use of Your Personal Data
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We may use your Personal Data for the following purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>To Provide and Maintain Our Service: Including monitoring and improving the Service.</li>
              <li>To Manage Your Account: To register and provide access to personalized mentorship and courses.</li>
              <li>
                To Communicate With You: To send updates, reminders, newsletters, or marketing communications related to
                your enrolled courses, exams, or services.
              </li>
              <li>To Provide and Enhance Educational Content: Such as mock tests, PDFs, and video resources.</li>
              <li>
                To Respond to Your Requests: Including customer support or inquiries about the courses or mentorship
                services.
              </li>
            </ul>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              5. Sharing of Your Personal Data
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We may share your Personal Data in the following situations:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                With Service Providers: We may share data with third-party providers that help us with services such as
                payment processing, analytics, marketing, or technical support.
              </li>
              <li>
                In Business Transactions: If EduGrantors is involved in a merger, acquisition, or sale of assets, your
                data may be transferred to the new owner.
              </li>
              <li>
                With Affiliates: We may share data with our affiliates who are obligated to adhere to this Privacy
                Policy.
              </li>
              <li>
                For Legal Requirements: We may disclose your Personal Data when required to do so by law or in response
                to lawful requests by public authorities (e.g., a court or government agency).
              </li>
            </ul>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              6. Retention of Your Personal Data
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              We retain your Personal Data only as long as necessary for the purposes outlined in this Privacy Policy.
              We may retain and use your data to comply with legal obligations or to resolve disputes.
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              7. Transfer of Your Personal Data
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Your data may be transferred to and maintained on servers located outside of your country. By using our
              services, you consent to the transfer of data to other locations with different data protection laws.
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              8. Security of Your Personal Data
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              While we use commercially acceptable methods to protect your Personal Data, no method of transmission over
              the Internet or electronic storage is entirely secure. We cannot guarantee absolute security, but we are
              committed to ensuring your data is protected.
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">9. Children's Privacy</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our services are not intended for children under the age of 13. We do not knowingly collect Personal Data
              from children under 13. If you are a parent or guardian and believe that your child has provided us with
              Personal Data, please contact us to request the removal of that data.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              We may also restrict the services available to users between 13 and 18 years old, based on applicable
              legal requirements.
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              10. Links to Other Websites
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Our Service may contain links to other websites that are not operated by EduGrantors. We are not
              responsible for the privacy practices or content of those websites. We encourage you to review the privacy
              policy of any third-party website you visit.
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              11. Changes to this Privacy Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the
              "Last updated" date will be revised accordingly. We will notify you via email or through a prominent
              notice on our Service before the change takes effect.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting
              your personal data.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}

export default PrivacyPolicy

