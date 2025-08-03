"use client";

import { useState, useEffect } from "react";
import DotGrid from "./components/DotGrid";
import RotatingText from "./components/RotatingText";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const projectImages = [
    {
      src: "./Comm Building.jpg",
      caption: "Comm Design",
      alt: "",
    },
    {
      src: "./Eco township.jpg",
      caption: "Township Design",
      alt: "",
    },
    {
      src: "./Resort Design1.jpg",
      caption: "Resort Design",
      alt: "",
    },
    {
      src: "./resort_design.jpg",
      caption: "Resort Design",
      alt: "",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Image carousel auto-advance
  useEffect(() => {
    if (isUserInteracting) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % projectImages.length
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [projectImages.length, isUserInteracting]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToPreviousImage = () => {
    setIsUserInteracting(true);
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? projectImages.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setIsUserInteracting(true);
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % projectImages.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-slate-200/50 py-2"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h2
                className={`font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent transition-all duration-300 ${
                  isScrolled ? "text-xl" : "text-2xl"
                }`}
              >
                Build-Climatic
              </h2>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-1">
                {[
                  { label: "Projects", section: "projects" },
                  { label: "Principles", section: "about" },
                  { label: "Services", section: "services" },
                ].map((item) => (
                  <button
                    key={item.section}
                    onClick={() => scrollToSection(item.section)}
                    className="relative text-slate-700 hover:text-blue-600 px-4 py-2 text-lg font-medium transition-all duration-300 rounded-lg hover:bg-blue-50 group"
                  >
                    {item.label}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection("contact")}
                  className="ml-4 bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2.5 rounded-full text-lg font-medium hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-green-700"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* DotGrid Background */}
        <div className="absolute inset-0 opacity-30">
          <DotGrid
            dotSize={10}
            gap={15}
            baseColor="#f2f2f2"
            activeColor="#3b82f6"
            proximity={120}
            shockRadius={220}
            shockStrength={8}
            className="w-full h-full"
          />
        </div>

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

        <div className="relative text-center px-6 max-w-6xl mx-auto z-10">
          <div className="mb-8">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-slate-900 mb-6 tracking-tight leading-none">
              Build-Climatic
            </h1>
            {/* <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 mx-auto rounded-full mb-8 shadow-lg"></div> */}

            <div className="text-2xl text-slate-700 mx-auto leading-relaxed flex flex-wrap items-center justify-center gap-2 font-medium">
              <span>Design and build a</span>
              <RotatingText
                texts={[
                  "corporate office",
                  "luxury resort",
                  "sustainable hotel",
                  "modern home",
                  "eco township",
                  "mixed-use development",
                ]}
                mainClassName="px-3 sm:px-4 md:px-5 bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold overflow-hidden py-1 sm:py-1.5 md:py-2 justify-center rounded-lg shadow-lg"
                staggerFrom="center"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                staggerDuration={0.02}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2500}
              />
              <span>that harmonizes with nature</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
            <button
              onClick={() => scrollToSection("projects")}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-blue-800 border border-blue-600/20"
            >
              Explore Our Work
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-300 hover:shadow-lg hover:bg-white/50 backdrop-blur-sm"
            >
              Our Services
            </button>
          </div>
        </div>
      </section>

      <main className="relative">
        {/* Projects Section */}
        <section id="projects" className="py-24 bg-white">
          {/* Section Header */}
          <div className="max-w-7xl mx-auto px-6 text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Our Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Showcasing our sustainable design implementations across diverse
              building types and locations
            </p>
          </div>

          {/* Full Width Image Carousel */}
          <div className="w-full">
            <div className="flex items-center justify-center px-6">
              <div className="relative w-full max-w-6xl bg-white rounded-3xl overflow-hidden border border-slate-200">
                {/* Left Navigation Button */}
                <button
                  onClick={goToPreviousImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <div className="relative h-96 md:h-[500px]">
                  <img
                    src={projectImages[currentImageIndex].src}
                    alt={projectImages[currentImageIndex].alt}
                    className="w-full h-full object-cover transition-opacity duration-500 grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                  {/* Watermark */}
                  <div className="absolute top-6 left-6">
                    <p className="text-white/80 italic bg-black/20 px-3 py-1 rounded-md backdrop-blur-sm">
                      © Build-Climatic 2025
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white text-lg font-medium leading-relaxed">
                      {projectImages[currentImageIndex].caption}
                    </p>
                  </div>

                  {/* Navigation Dots */}
                  <div className="absolute bottom-4 right-6 flex space-x-2">
                    {projectImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setIsUserInteracting(true);
                          setCurrentImageIndex(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex
                            ? "bg-white"
                            : "bg-white/50 hover:bg-white/75"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Right Navigation Button */}
                <button
                  onClick={goToNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* Full Width Horizontal Scrolling Carousel */}
          <div className="mt-20 overflow-hidden">
            <div className="flex animate-scroll-x-fast space-x-6 px-6">
              {/* Duplicate the array for infinite scroll effect */}
              {[...Array(2)].map((_, arrayIndex) =>
                [
                  {
                    title: "Resort Hotel",
                    location: "Goa",
                    type: "Resort",
                  },
                  {
                    title: "Resort Hotel",
                    location: "Kerala",
                    type: "Resort",
                  },
                  {
                    title: "Resort Hotel",
                    location: "Mahaballipuram",
                    type: "Resort",
                  },
                  {
                    title: "3 Star Hotel",
                    location: "Dubai",
                    type: "Hospitality",
                  },
                  {
                    title: "5 Star Hotel Renovation",
                    location: "Mumbai",
                    type: "Renovation",
                  },
                  {
                    title: "Eco Design Township",
                    location: "Bangalore",
                    type: "Township",
                  },
                  {
                    title: "Garden Township",
                    location: "Dubai",
                    type: "Township",
                  },
                  {
                    title: "Tourism Development Scheme",
                    location: "Kerala",
                    type: "Development",
                  },
                  {
                    title: "Premium Service Apartments",
                    location: "Chennai",
                    type: "Residential",
                  },
                  {
                    title: "Mixed-use Development",
                    location: "Brunei",
                    type: "Mixed-Use",
                  },
                ].map((project, index) => (
                  <div
                    key={`${arrayIndex}-${index}`}
                    className="flex-shrink-0 w-80 bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {project.type}
                      </span>
                      <svg
                        className="w-6 h-6 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 font-medium flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {project.location}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
        {/* About Section */}
        <section id="about" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                Climate Responsive Design
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full mb-8"></div>
              <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
                We integrate climatology principles with innovative design
                approaches to create sustainable, energy-efficient built
                environments that harmonize with their natural surroundings.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group bg-white p-8 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Climatology Principles
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Use climatology principles in design of built spaces for
                  optimal environmental integration
                </p>
              </div>
              <div className="group bg-white p-8 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Vernacular Design
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Vernacular design approaches that suit regional socio-economic
                  fabric and cultural context
                </p>
              </div>
              <div className="group bg-white p-8 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9V3"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Eco-Based Materials
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Strategic use of local and eco-based materials for sustainable
                  construction practices
                </p>
              </div>
              <div className="group bg-white p-8 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Renewable Energy
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Integrate renewable energy systems (Solar, wind, bio)
                  seamlessly into building design
                </p>
              </div>
              <div className="group bg-white p-8 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 md:col-span-2 lg:col-span-1">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Landscape Design
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Thoughtful landscape design for optimal micro climate control
                  and environmental harmony
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                Our Services
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full mb-8"></div>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Comprehensive solutions for sustainable architecture and
                engineering excellence
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl shadow-2xl p-12 border border-slate-200">
              <div className="grid lg:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-6">
                        Advisory Services
                      </h3>
                      <ul className="space-y-4 text-lg text-slate-700">
                        <li className="flex items-start">
                          <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                          Large developments consultation
                        </li>
                        <li className="flex items-start">
                          <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                          Architecture & Interior Design
                        </li>
                        <li className="flex items-start">
                          <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                          Space Planning & Urban Design
                        </li>
                        <li className="flex items-start">
                          <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                          Material selection & Project Management
                        </li>
                        <li className="flex items-start">
                          <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                          Sustainability Certifications
                        </li>
                        <li className="flex items-start">
                          <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                          Building Performance Simulations (BPS)
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-6">
                        Engineering Services
                      </h3>
                      <ul className="space-y-4 text-lg text-slate-700">
                        <li className="flex items-start">
                          <span className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                          Structural Engineering
                        </li>
                        <li className="flex items-start">
                          <span className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                          Electrical Systems
                        </li>
                        <li className="flex items-start">
                          <span className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                          Mechanical Systems
                        </li>
                        <li className="flex items-start">
                          <span className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                          Plumbing Systems
                        </li>
                        <li className="flex items-start">
                          <span className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                          Building Management Systems (BMS)
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Build-Climatic
            </h3>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Design & Build Passive Systems - Climate Responsive Design
            </p>
            <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 mx-auto rounded-full mb-8"></div>

            {/* Contact Information */}
            <div className="mt-12 mb-8">
              <h4 className="text-2xl font-semibold text-white mb-4">
                Get In Touch
              </h4>
              <div className="space-y-3">
                <a
                  href="mailto:buildclimatic@gmail.com"
                  className="inline-block text-blue-400 hover:text-blue-300 text-lg font-medium transition-colors duration-300 hover:underline"
                >
                  buildclimatic@gmail.com
                </a>
                <div className="flex items-center justify-center text-slate-300 text-lg">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Bangalore, India
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-700">
              <p className="text-slate-500 text-sm">
                © 2025 Build-Climatic. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
