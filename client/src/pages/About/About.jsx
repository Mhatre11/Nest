import React from 'react';

const About = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="py-12 px-4 mx-auto max-w-screen-xl lg:py-24">
        {/* Hero Section */}
        <div className="text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
            About Nest
          </h1>
          <p className="text-lg font-normal text-blue-100 lg:text-xl max-w-2xl mx-auto">
            Your trusted partner for online grocery shopping, bringing quality products to your doorstep
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 md:p-12 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-emerald-50 sm:text-lg">
                At Nest, we're committed to revolutionizing the way people shop for groceries online. 
                Our mission is to provide a seamless, convenient, and reliable shopping experience 
                that saves time and brings quality products directly to your doorstep.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-8 md:p-12 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-purple-50 sm:text-lg">
                We envision a future where grocery shopping is effortless and enjoyable. 
                By leveraging technology and focusing on customer satisfaction, we aim to 
                become the most trusted online grocery platform in the region.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl p-8 md:p-12 hover:shadow-2xl transition-all duration-300">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Why Choose Nest?</h2>
          <div className="grid md:grid-cols-2 gap-6 text-white">
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Fresh Quality</h3>
                  <p className="text-orange-50">We carefully select our products to ensure the highest quality for your family</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Fast Delivery</h3>
                  <p className="text-orange-50">Quick and reliable delivery right to your doorstep</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Wide Selection</h3>
                  <p className="text-orange-50">From fresh produce to household essentials, find everything you need</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">User-Friendly</h3>
                  <p className="text-orange-50">Smooth and enjoyable shopping experience from start to finish</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
