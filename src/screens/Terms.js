import React from 'react'
import Navbar from '../components/Navbar'

export default function Terms() {
  return (
    <div>
        <div> <Navbar/> </div>
        <div className="container mt-5 mb-5">
        <div className="card shadow-lg border-0 p-5 rounded-4">
          <h1 className="text-center mb-4  mt-5">Terms & Conditions</h1>
          <p className="text-muted text-center mb-5">Effective Date: May 1, 2025</p>

          <section className="mb-4">
            <h4>1. Introduction</h4>
            <p>
              Welcome to Magnum These Terms & Conditions govern your use of our website and services, including online ordering, account creation, and delivery. By accessing our website or placing an order, you agree to be bound by these terms.
            </p>
          </section>

          <section className="mb-4">
            <h4>2. Products & Allergies</h4>
            <p>
              We offer a variety of dairy and non-dairy ice cream products. Although we strive to avoid cross-contamination, products may contain or come into contact with allergens such as milk, nuts, gluten, and soy. Customers with food allergies are responsible for reviewing ingredient information or contacting us before placing an order.
            </p>
          </section>

          <section className="mb-4">
            <h4>3. Online Orders</h4>
            <ul>
              <li>Orders can be placed online through our website.</li>
              <li>All orders are subject to availability and confirmation.</li>
              <li>Prices are subject to change without notice.</li>
            </ul>
          </section>

          <section className="mb-4">
            <h4>4. Delivery & Pickup</h4>
            <p>
              We offer delivery within selected areas and pickup at designated locations. While we aim to deliver within the specified time frame, delays may occur due to traffic or weather. Delivery fees and minimum order values may apply.
            </p>
          </section>

          <section className="mb-4">
            <h4>5. Refunds & Cancellations</h4>
            <p>
              Due to the perishable nature of our products, all sales are final. If your order is incorrect, damaged, or not delivered, please contact our customer support within 24 hours for resolution. We may offer store credit or a replacement at our discretion.
            </p>
          </section>

          <section className="mb-4">
            <h4>6. Account & User Responsibilities</h4>
            <ul>
              <li>Customers must provide accurate contact and delivery information.</li>
              <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
              <li>We reserve the right to suspend or terminate accounts for abuse or violation of these terms.</li>
            </ul>
          </section>

          <section className="mb-4">
            <h4>7. Intellectual Property</h4>
            <p>
              All content on this website — including logos, images, and text — is the property of Magnum and may not be reused without permission.
            </p>
          </section>

          <section className="mb-4">
            <h4>8. Modifications</h4>
            <p>
              We reserve the right to update these Terms & Conditions at any time. Changes will be posted on this page, and continued use of the website indicates your acceptance.
            </p>
          </section>

          <section className="mb-4">
            <h4>9. Contact Us</h4>
            <p>
              For any questions regarding these Terms, please contact us at <a href="mailto:support@icecreambrand.com">support@icecreambrand.com</a>.
            </p>
          </section>

          <p className="text-end text-muted mt-5 mb-0">Last Updated: May 1, 2025</p>
        </div>
      </div>
    </div>
  )
}
