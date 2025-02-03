"use client"

import type React from "react"
import { useState } from "react"
import Heading from "../utils/Heading"
import Header from "../components/Header"
import Footer from "../components/Footer"


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

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Intellectual Property</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                All content, including but not limited to course materials, PDFs, videos, graphics, logos, and
                trademarks, is owned by or licensed to EduGrantors. You may not reproduce, distribute, or use any
                content without our permission, except for personal, non-commercial use.
              </li>
              <li>
                All trademarks, service marks, and logos displayed on the website are the property of EduGrantors or
                third-party entities. You may not use or reproduce any of these without proper authorization.
              </li>
            </ul>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Links to Third-Party Websites
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                EduGrantors may include links to third-party websites for your convenience or additional information.
                These links do not imply that we endorse the linked websites, and we are not responsible for the content
                or privacy practices of these third-party sites.
              </li>
              <li>
                You may not create a link to this website from another website or document without obtaining prior
                written consent from EduGrantors.
              </li>
            </ul>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Prohibited Conduct</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">You agree not to:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Use the website and services for any unlawful or fraudulent purposes.</li>
              <li>
                Attempt to disrupt or interfere with the functionality or security of the website or any services
                provided.
              </li>
              <li>
                Engage in any conduct that could damage, disable, or impair the website or the services provided by
                EduGrantors.
              </li>
            </ul>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Payment and Subscription Terms
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                Access to some services on the website may require a subscription or purchase. When you make a purchase
                or subscribe to any of our services, you agree to provide accurate and up-to-date payment information.
              </li>
              <li>
                Credit card payments or payments via payment gateways will be processed upon receiving authorization
                from the respective payment gateway companies. You are responsible for ensuring that the payment
                information you provide is correct and complete.
              </li>
              <li>
                EduGrantors reserves the right to modify pricing or subscription terms at any time, with prior notice to
                users.
              </li>
            </ul>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Account Responsibility</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                You are responsible for maintaining the confidentiality of your account credentials and for all
                activities that occur under your account.
              </li>
              <li>
                If you suspect unauthorized access to your account or any security breach, you should notify EduGrantors
                immediately.
              </li>
            </ul>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Termination of Access</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                We reserve the right to suspend or terminate your access to our services or website at our discretion,
                particularly if we believe you have violated these Terms and Conditions.
              </li>
              <li>
                Upon termination, you must stop using the website and any related services, and we may remove or disable
                your account.
              </li>
            </ul>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Limitation of Liability</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                To the fullest extent permitted by law, EduGrantors is not liable for any direct, indirect, incidental,
                special, consequential, or punitive damages arising from your use of the website or services.
              </li>
              <li>
                EduGrantors does not guarantee the uninterrupted availability of the website or services and is not
                liable for any interruptions, errors, or issues that may occur.
              </li>
            </ul>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Indemnification</h2>
            <p className="text-gray-700 dark:text-gray-300">
              You agree to indemnify and hold EduGrantors, its affiliates, employees, and partners harmless from any
              claims, losses, damages, liabilities, and expenses arising from your use of the website or services,
              including any violation of these Terms and Conditions.
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Governing Law and Disputes</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>These Terms and Conditions are governed by and construed in accordance with the laws of India.</li>
              <li>
                Any disputes arising from your use of the website or services shall be resolved through arbitration or
                mediation in accordance with applicable Indian laws.
              </li>
            </ul>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Amendments to Terms and Conditions
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              EduGrantors reserves the right to update or change these Terms and Conditions at any time. We will notify
              you of any changes by posting the updated Terms on this page and updating the "Last Updated" date. You are
              encouraged to review these Terms periodically for any changes.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}

export default TermsAndConditions

