import React from "react";

const NewsletterSection = () => {
  return (
    <section className="py-12 bg-green-50 dark:bg-green-900  my-8">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-800 dark:text-green-100">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-green-700 dark:text-green-200 mb-6 max-w-lg mx-auto">
          Stay updated with our latest social development events, volunteer opportunities, and community activities.
        </p>
        <form className="max-w-md mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-green-800 dark:border-green-600 dark:text-white"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;