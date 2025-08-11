import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export const LandingPage = () => {
    const [currentCard, setCurrentCard] = useState(0);
    const [isVisible, setIsVisible] = useState({});

    const developerCards = [
        {
            name: "Alex Chen",
            role: "Full-Stack Developer",
            skills: ["React", "Node.js", "Python", "AWS"],
            experience: "3 years",
            location: "San Francisco",
            avatar: "bg-gradient-to-br from-blue-400 to-purple-500"
        },
        {
            name: "Sarah Kim",
            role: "Frontend Developer",
            skills: ["Vue.js", "TypeScript", "Tailwind", "Figma"],
            experience: "2 years",
            location: "New York",
            avatar: "bg-gradient-to-br from-pink-400 to-red-500"
        },
        {
            name: "Mike Johnson",
            role: "DevOps Engineer",
            skills: ["Docker", "Kubernetes", "Jenkins", "AWS"],
            experience: "5 years",
            location: "Austin",
            avatar: "bg-gradient-to-br from-green-400 to-teal-500"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentCard((prev) => (prev + 1) % developerCards.length);
        }, 4000);

        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({
                            ...prev,
                            [entry.target.id]: true
                        }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('[data-animate]').forEach((el) => {
            observer.observe(el);
        });

        return () => {
            clearInterval(interval);
            observer.disconnect();
        };
    }, []);

    const features = [
        {
            icon: "🎯",
            title: "Smart Skill Matching",
            description: "Our AI algorithm matches you with developers based on complementary or similar technical skills"
        },
        {
            icon: "💼",
            title: "Project Collaboration",
            description: "Find the perfect teammate for your next hackathon, side project, or startup idea"
        },
        {
            icon: "🌍",
            title: "Global Network",
            description: "Connect with developers worldwide and expand your professional circle beyond borders"
        },
        {
            icon: "⚡",
            title: "Instant Connections",
            description: "Swipe right on interesting profiles and get instant matches when the feeling is mutual"
        },
        {
            icon: "📈",
            title: "Career Growth",
            description: "Learn from experienced developers, find mentors, and discover new opportunities"
        },
        {
            icon: "🤝",
            title: "Community Driven",
            description: "Join a community that celebrates code, collaboration, and continuous learning"
        }
    ];

    const techStack = [
        { name: "JavaScript", color: "text-yellow-400", bg: "bg-yellow-400/10" },
        { name: "Python", color: "text-green-400", bg: "bg-green-400/10" },
        { name: "React", color: "text-blue-400", bg: "bg-blue-400/10" },
        { name: "Node.js", color: "text-green-500", bg: "bg-green-500/10" },
        { name: "TypeScript", color: "text-blue-500", bg: "bg-blue-500/10" },
        { name: "Vue.js", color: "text-green-300", bg: "bg-green-300/10" },
        { name: "Angular", color: "text-red-500", bg: "bg-red-500/10" },
        { name: "Docker", color: "text-blue-300", bg: "bg-blue-300/10" },
        { name: "AWS", color: "text-orange-400", bg: "bg-orange-400/10" },
        { name: "MongoDB", color: "text-green-600", bg: "bg-green-600/10" },
        { name: "PostgreSQL", color: "text-blue-600", bg: "bg-blue-600/10" },
        { name: "GraphQL", color: "text-pink-400", bg: "bg-pink-400/10" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-3/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Floating Code Snippets */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {['const match = await findDeveloper();', 'git clone friendship.git', 'npm install collaboration', 'docker run --name devs-unite'].map((code, i) => (
                    <div
                        key={i}
                        className="absolute text-gray-500/20 font-mono text-sm animate-bounce"
                        style={{
                            left: `${15 + i * 20}%`,
                            top: `${20 + i * 15}%`,
                            animationDelay: `${i * 2}s`,
                            animationDuration: '8s'
                        }}
                    >
                        {code}
                    </div>
                ))}
            </div>

            {/* Hero Section */}
            <section className="relative py-20 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                                    Swipe Right
                                </span>
                                <br />
                                <span className="text-white">on Amazing</span>
                                <br />
                                <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                                    Developers
                                </span>
                            </h1>
                            <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                                Connect with developers worldwide. Match based on skills, collaborate on projects, and build meaningful professional relationships.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/login"
                                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 text-center"
                            >
                                Start Matching
                            </Link>
                            <button className="px-8 py-4 border border-gray-600 rounded-full font-semibold text-lg hover:border-gray-400 hover:bg-gray-800/50 transition-all duration-300 text-center">
                                Watch Demo
                            </button>
                        </div>

                    </div>

                    {/* Developer Card Demo */}
                    <div className="flex justify-center">
                        <div className="relative">
                            {/* Phone Frame */}
                            <div className="w-80 h-[600px] bg-gray-800 rounded-[3rem] p-4 shadow-2xl">
                                <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-[2.5rem] p-6 relative overflow-hidden">

                                    {/* Developer Cards Stack */}
                                    <div className="relative h-full">
                                        {developerCards.map((dev, index) => (
                                            <div
                                                key={index}
                                                className={`absolute inset-0 bg-white rounded-3xl shadow-2xl transition-all duration-500 ${index === currentCard
                                                        ? 'z-30 transform rotate-0 scale-100'
                                                        : index === (currentCard + 1) % developerCards.length
                                                            ? 'z-20 transform rotate-2 scale-95 translate-y-4'
                                                            : 'z-10 transform rotate-6 scale-90 translate-y-8 opacity-50'
                                                    }`}
                                            >
                                                <div className="p-6 h-full flex flex-col">
                                                    <div className="flex-1 text-center space-y-4">
                                                        <div className={`w-24 h-24 ${dev.avatar} rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold`}>
                                                            {dev.name.split(' ').map(n => n[0]).join('')}
                                                        </div>

                                                        <div>
                                                            <h3 className="text-2xl font-bold text-gray-800">{dev.name}</h3>
                                                            <p className="text-gray-600 font-medium">{dev.role}</p>
                                                            <p className="text-sm text-gray-500">{dev.experience} • {dev.location}</p>
                                                        </div>

                                                        <div className="flex flex-wrap gap-2 justify-center">
                                                            {dev.skills.map((skill, i) => (
                                                                <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-center space-x-4 pt-6">
                                                        <button className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl hover:bg-gray-300 transition-colors">
                                                            ❌
                                                        </button>
                                                        <button className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center text-2xl text-white hover:from-pink-500 hover:to-red-500 transition-all">
                                                            ❤️
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Floating Action Indicators */}
                            <div className="absolute -right-8 top-1/3 animate-bounce">
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg">
                                    ✓
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" data-animate className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Why DevConnect?
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            The smartest way to network in tech. Find your next collaborator, mentor, or coding buddy.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                    }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className="py-20 px-6 bg-gray-800/30">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                            Match by Skills
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
                        Connect with developers who share your passion for specific technologies
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {techStack.map((tech, index) => (
                            <div
                                key={index}
                                className={`${tech.bg} border border-gray-700/50 rounded-xl p-4 hover:${tech.bg.replace('/10', '/20')} transition-all duration-300 hover:scale-105 cursor-pointer`}
                            >
                                <div className={`${tech.color} font-semibold`}>{tech.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                How It Works
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300">Simple steps to start building your developer network</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
                            <h3 className="text-2xl font-bold mb-4">Create Your Profile</h3>
                            <p className="text-gray-300">Showcase your skills, projects, and what you're looking for in your next collaboration</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
                            <h3 className="text-2xl font-bold mb-4">Discover & Swipe</h3>
                            <p className="text-gray-300">Browse through developer profiles, swipe right on those you'd like to connect with</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
                            <h3 className="text-2xl font-bold mb-4">Match & Collaborate</h3>
                            <p className="text-gray-300">When you both swipe right, start chatting and begin your next amazing project together</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Ready to Start Coding Together?
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join thousands of developers who are already building amazing connections and collaborating on incredible projects.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/signup"
                            className="px-12 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-bold text-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                        >
                            Join DevConnect Now
                        </Link>
                        <Link
                            to="/login"
                            className="px-12 py-4 border border-gray-600 rounded-full font-bold text-lg hover:border-gray-400 hover:bg-gray-800/50 transition-all duration-300"
                        >
                            Already a Member?
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-gray-800">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <span className="text-sm font-bold">{'</>'}</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            DevConnect
                        </span>
                    </div>
                    <p className="text-gray-400">
                        &copy; 2025 DevConnect. Connecting developers, one swipe at a time. Made with ❤️ by developers, for developers.

                    </p>
                    <Link to={"https://www.linkedin.com/in/rathin-mondal-a13246253/"} className="text-gray-400">
                        @ Rathin Mondal🫶🏻
                    </Link>
                </div>
            </footer>
        </div>
    );
};

