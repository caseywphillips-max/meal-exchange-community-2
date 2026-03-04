import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6">Last updated: January 7, 2026</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing and using Knoshr ("the Service"), you accept and agree to be bound by the terms 
              and provisions of this agreement. If you do not agree to abide by these terms, please do not 
              use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Description of Service</h2>
            <p className="text-gray-600 mb-4">
              Knoshr is a community platform that connects people who want to share meal preparation 
              activities. The service allows users to create and join "tables" (meal prep groups), 
              share recipes, coordinate schedules, and split costs for shared meals.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Accounts</h2>
            <p className="text-gray-600 mb-4">
              To use certain features of the Service, you must register for an account. You agree to:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your password and accept all risks of unauthorized access</li>
              <li>Notify us immediately if you discover any security breaches</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. User Conduct</h2>
            <p className="text-gray-600 mb-4">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
              <li>Violate any local, state, national, or international law</li>
              <li>Harass, abuse, or harm another person</li>
              <li>Impersonate any person or entity</li>
              <li>Post false, misleading, or fraudulent content</li>
              <li>Interfere with or disrupt the Service or servers</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Food Safety</h2>
            <p className="text-gray-600 mb-4">
              Knoshr is a platform for connecting users and does not prepare, cook, or handle any food. 
              Users are solely responsible for ensuring food safety when participating in meal prep activities. 
              We recommend following all local health guidelines and food safety best practices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              Knoshr shall not be liable for any indirect, incidental, special, consequential, or punitive 
              damages resulting from your use of or inability to use the Service, including but not limited 
              to foodborne illness, allergic reactions, or disputes between users.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Changes to Terms</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to modify these terms at any time. We will notify users of any material 
              changes by posting the new Terms of Service on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-gray-600">
              Email: legal@knoshr.com<br />
              Or visit our <Link to="/support" className="text-orange-600 hover:underline">Support page</Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
