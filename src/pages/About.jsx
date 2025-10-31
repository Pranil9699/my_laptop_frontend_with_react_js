import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 fade-in">
        <section className="gradient-bg text-center py-20 px-6">
          <h1 className="text-4xl font-bold mb-3">About My Laptop Rental</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Making laptop rentals easier, faster, and more affordable for everyone.
          </p>
        </section>

        <section className="p-10 flex justify-center">
          <div className="card-glass max-w-3xl p-8 text-gray-700">
            <p className="text-lg leading-relaxed">
              My Laptop Rental is a platform designed for students, professionals,
              and developers to access high-quality laptops at affordable rates. Our
              goal is to make technology accessible and hassle-free.
            </p>
          </div>
        </section>
      </div>
      {/* <Footer /> */}
    </>
  );
}
