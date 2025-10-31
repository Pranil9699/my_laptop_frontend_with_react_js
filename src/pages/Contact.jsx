import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col items-center justify-center p-10 fade-in">
        <div className="card-glass p-10 text-center w-full max-w-md">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Contact Us</h1>
          <p className="text-gray-700 mb-2">📧 support@mylaptop.com</p>
          <p className="text-gray-700 mb-2">📞 +91 98765 43210</p>
          <p className="text-gray-500 mt-4 text-sm">
            We're here to help you 24/7. Feel free to reach out!
          </p>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
