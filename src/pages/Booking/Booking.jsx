// Booking.jsx
import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  onSnapshot,
  updateDoc
} from "firebase/firestore";
import { db } from "../ClientLogin/firebaseConfig";
import jsPDF from "jspdf";
import "./Booking.css";

const Booking = () => {
  // 1. Form and flow state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    package: "",
    message: "",
    paymentMode: ""
  });
  const [step, setStep] = useState(1);            // 1: form, 2: mode, 3: details, 4: success
  const [paymentDetails, setPaymentDetails] = useState({});
  const [bookingId, setBookingId] = useState("");
  const [bookingStatus, setBookingStatus] = useState("Confirmed");
  const [daysLeft, setDaysLeft] = useState(null);

  // 2. Real-time status listener
  useEffect(() => {
    if (!bookingId) return;
    const ref = doc(db, "bookings", bookingId);
    const unsubscribe = onSnapshot(ref, snap => {
      const data = snap.data();
      if (data?.status) {
        setBookingStatus(data.status);
      }
    });
    return unsubscribe;
  }, [bookingId]);

  // 3. Shoot date countdown
  useEffect(() => {
    if (!formData.date) return;
    const shoot = new Date(formData.date);
    const today = new Date();
    const diff = shoot - today;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    setDaysLeft(days > 0 ? days : 0);
  }, [formData.date]);

  // 4. Handlers
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const handlePaymentDetailChange = e => {
    const { name, value } = e.target;
    setPaymentDetails(p => ({ ...p, [name]: value }));
  };

  const proceedToPaymentMode = () => {
    console.log("proceedToPaymentMode:", formData);
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.date ||
      !formData.package
    ) {
      alert("Please fill all required fields!");
      return;
    }
    setStep(2);
  };

  const proceedToPaymentDetails = () => {
    if (!formData.paymentMode) {
      alert("Please select a payment mode!");
      return;
    }
    setStep(3);
  };

  const handleConfirmPayment = async () => {
    // 4.1 Validate paymentDetails for each mode
    if (["Credit Card", "Debit Card"].includes(formData.paymentMode)) {
      const cardNum = paymentDetails.cardNumber?.replace(/\s+/g, "");
      const cardRx = /^\d{16}$/;
      const expRx = /^(0[1-9]|1[0-2])\/\d{2}$/;
      const cvvRx = /^\d{3,4}$/;

      if (!cardNum || !cardRx.test(cardNum)) {
        return alert("Enter a valid 16-digit card number");
      }
      if (!paymentDetails.expiry || !expRx.test(paymentDetails.expiry)) {
        return alert("Enter expiry in MM/YY");
      }
      if (!paymentDetails.cvv || !cvvRx.test(paymentDetails.cvv)) {
        return alert("Enter a valid CVV");
      }

      // ensure not expired
      const [m, y] = paymentDetails.expiry.split("/").map(Number);
      if (new Date(2000 + y, m - 1) < new Date()) {
        return alert("Card expiry must be in the future");
      }
    }

    if (formData.paymentMode === "UPI") {
      const rx = /^[\w.-]+@[\w.-]+$/;
      if (!paymentDetails.upiId || !rx.test(paymentDetails.upiId)) {
        return alert("Enter a valid UPI ID");
      }
    }

    if (formData.paymentMode === "Wallet") {
      if (!paymentDetails.walletName) {
        return alert("Enter wallet name");
      }
      const otpRx = /^\d{6}$/;
      if (!paymentDetails.otp || !otpRx.test(paymentDetails.otp)) {
        return alert("Enter 6-digit OTP");
      }
    }

    if (formData.paymentMode === "Net Banking") {
      if (!paymentDetails.bankName) {
        return alert("Select your bank");
      }
    }

    // 4.2 Save booking to Firestore
    try {
      const ref = await addDoc(collection(db, "bookings"), {
        ...formData,
        paymentDetails,
        status: "Confirmed",
        createdAt: serverTimestamp()
      });
      setBookingId(ref.id);
      setStep(4);

      // play success audio
      new Audio("/Videos/Music.mp3").play().catch(() => {});
    } catch (err) {
      console.error(err);
      alert("Payment failed!");
    }
  };

  const downloadReceipt = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Wedding Photography Booking Receipt", 20, 20);
    doc.setFontSize(12);
    doc.text(`Booking ID: ${bookingId}`, 20, 40);
    doc.text(`Name: ${formData.name}`, 20, 50);
    doc.text(`Email: ${formData.email}`, 20, 60);
    doc.text(`Phone: ${formData.phone}`, 20, 70);
    doc.text(`Date: ${formData.date}`, 20, 80);
    doc.text(`Package: ${formData.package}`, 20, 90);
    doc.text(`Payment Mode: ${formData.paymentMode}`, 20, 100);
    doc.text(`Status: ${bookingStatus}`, 20, 110);
    doc.text("Thank you for booking with us!", 20, 130);
    doc.save(`Booking_Receipt_${bookingId}.pdf`);
  };

  const handleRebook = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      package: "",
      message: "",
      paymentMode: ""
    });
    setPaymentDetails({});
    setBookingId("");
    setBookingStatus("Confirmed");
    setDaysLeft(null);
    setStep(1);
  };

  const handleModifyBooking = async () => {
    if (!bookingId) return;
    try {
      const ref = doc(db, "bookings", bookingId);
      await updateDoc(ref, {
        ...formData,
        paymentDetails,
        updatedAt: serverTimestamp()
      });
      alert("Booking updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update booking.");
    }
  };

  // 5. Render
  return (
    <>
    <Helmet>
  <title>Book Your Shoot | AnMan Captures</title>
  <meta 
    name="description" 
    content="Reserve your date with Your Studio Name for premium wedding photography and cinematic videography services." 
  />
</Helmet>
    <section className="booking-section">
      <div className="booking-container">
        <h2>
          Book Your <span>Dream Wedding Shoot</span>
        </h2>

        {/* DEBUG: show current step */}
        <p>Current Step: {step}</p>

        {/* Step 1: Booking Form */}
        {step === 1 && (
          
          <form
            className="booking-form"
            onSubmit={e => e.preventDefault()}
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <select
              name="package"
              value={formData.package}
              onChange={handleChange}
              required
            >
              <option value="">Select Package</option>
              <option value="intimate">
                The Intimate Vows
              </option>
              <option value="grand">
                The Grand Celebration
              </option>
              <option value="royal">
                The Royal Affair
              </option>
            </select>
            <textarea
              name="message"
              placeholder="Any special requests?"
              value={formData.message}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={proceedToPaymentMode}
            >
              Proceed to Payment
            </button>
          </form>
        )}

        {/* Step 2: Payment Mode */}
        {step === 2 && (
          <div className="payment-mode">
            <h3>Select Payment Mode</h3>
            <select
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
            >
              <option value="">
                Select Payment Mode
              </option>
              <option value="Credit Card">
                Credit Card
              </option>
              <option value="Debit Card">
                Debit Card
              </option>
              <option value="UPI">UPI</option>
              <option value="Wallet">Wallet</option>
              <option value="Net Banking">
                Net Banking
              </option>
            </select>
            <button onClick={proceedToPaymentDetails}>
              Next
            </button>
            <button onClick={() => setStep(1)}>
              Back
            </button>
          </div>
        )}

        {/* Step 3: Payment Details */}
        {step === 3 && (
          <div className="payment-details">
            <h3>{formData.paymentMode} Payment</h3>

            {["Credit Card", "Debit Card"].includes(
              formData.paymentMode
            ) && (
              <>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  onChange={handlePaymentDetailChange}
                />
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  onChange={handlePaymentDetailChange}
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  onChange={handlePaymentDetailChange}
                />
              </>
            )}

            {formData.paymentMode === "UPI" && (
              <input
                type="text"
                name="upiId"
                placeholder="UPI ID"
                onChange={handlePaymentDetailChange}
              />
            )}

            {formData.paymentMode === "Wallet" && (
              <>
                <input
                  type="text"
                  name="walletName"
                  placeholder="Wallet Name"
                  onChange={handlePaymentDetailChange}
                />
                <input
                  type="text"
                  name="otp"
                  placeholder="OTP"
                  onChange={handlePaymentDetailChange}
                />
              </>
            )}

            {formData.paymentMode === "Net Banking" && (
              <select
                name="bankName"
                onChange={handlePaymentDetailChange}
              >
                <option value="">
                  Select Bank
                </option>
                <option value="HDFC">HDFC</option>
                <option value="SBI">SBI</option>
                <option value="ICICI">ICICI</option>
              </select>
            )}

            <button onClick={handleConfirmPayment}>
              Pay Now
            </button>
            <button onClick={() => setStep(2)}>
              Back
            </button>
          </div>
        )}

        {/* Step 4: Success & Extras */}
        {step === 4 && (
          <div className="payment-success">
            <h3>🎉 Payment Successful!</h3>
            <p>Booking ID: {bookingId}</p>
            <p>Name: {formData.name}</p>
            <p>Package: {formData.package}</p>
            <p>Payment Mode: {formData.paymentMode}</p>
            <p>
              Status: <strong>{bookingStatus}</strong>
            </p>
            {daysLeft !== null && (
              <p>📅 {daysLeft} days until your shoot!</p>
            )}

            <button onClick={downloadReceipt}>
              Download Receipt
            </button>
            <button onClick={handleModifyBooking}>
              Modify Booking
            </button>
            <button onClick={handleRebook}>
              Rebook
            </button>

            <div className="recommendations">
              <h4>You might also like:</h4>
              <div className="package-cards">
                <div className="card">
                  <h5>The Sunset Romance</h5>
                  <p>Perfect for golden hour</p>
                  <button onClick={() => setStep(1)}>
                    Book Now
                  </button>
                </div>
                <div className="card">
                  <h5>The Cinematic Love</h5>
                  <p>Drone + slow-mo package</p>
                  <button onClick={() => setStep(1)}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            <div className="track-status">
              <h4>Track Your Booking</h4>
              <progress
                value={
                  bookingStatus === "Confirmed"
                    ? 33
                    : bookingStatus === "In Progress"
                    ? 66
                    : 100
                }
                max="100"
              ></progress>
              <p>
                Next Step:{" "}
                {bookingStatus === "Confirmed"
                  ? "Photographer Assignment"
                  : bookingStatus === "In Progress"
                  ? "Shoot Preparation"
                  : "Completed"}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
    </>
  );
};

export default Booking;
