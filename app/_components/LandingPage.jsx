"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Sparkles, Shield, Zap, Users } from 'lucide-react';



// Header Component con efecto de scroll
const HeaderC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'pt-3' : 'pt-5'}`}>
      <div className={`mx-auto transition-all duration-300 rounded-full border max-w-[1200px] ${
        scrolled 
        ? 'bg-white/80 backdrop-blur-md py-1.5 px-4' 
        : 'bg-white/90 py-3 px-4'
      }`}>
        <div className="flex justify-between items-center">
          <div className={`flex items-center ${scrolled ? 'gap-1 mr-3' : 'gap-2 mr-5'}`}>
            <svg className="text-blue-600 transition-all duration-300" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 7L12 12L4 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className={`font-bold transition-all duration-300 ${scrolled ? 'text-lg' : 'text-xl'}`}>SkyAgent</span>
          </div>
          <nav className={`hidden md:flex items-center transition-all duration-300 ${scrolled ? 'gap-3 text-sm' : 'gap-5 text-base'}`}>
            <a href="#" className="font-medium text-gray-600 hover:text-primary transition-colors">Home</a>
            <a href="#features" className="font-medium text-gray-600 hover:text-primary transition-colors">How it Works</a>
            <a href="#pricing" className="font-medium text-gray-600 hover:text-primary transition-colors">Features</a>
            <a href="#testimonials" className="font-medium text-gray-600 hover:text-primary transition-colors">Pricing</a>
          </nav>
          <div className={`flex items-center transition-all duration-300 ${scrolled ? 'gap-2 ml-3' : 'gap-3 ml-5'}`}>
            <Button 
              className={`bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-300 ${
                scrolled ? 'px-4 py-1 text-sm' : 'px-5 py-1.5'
              }`}
            >
              Try for free
            </Button>
            <button className={`rounded-full bg-gray-100 flex items-center justify-center transition-all duration-300 ${
              scrolled ? 'p-1.5' : 'p-2'
            }`}>
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor"/>
                <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Hero Section
const Hero = () => {
  return (
    <section className="pt-32 pb-20 overflow-hidden relative">
      {/* Background grid pattern */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-grid-small-white/[0.2] -z-10" />
        <div className="absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 opacity-0 animate-fade-in">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary font-medium mb-4">
              ✨ La mejor plataforma de coaching con IA
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Mejora tus habilidades con un coach de IA personalizado
            </h1>
            <p className="text-xl text-gray-600">
              Recibe retroalimentación instantánea, consejos personalizados y aprende a tu propio ritmo con nuestros coaches virtuales impulsados por IA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="text-base group relative overflow-hidden" size="lg">
                <span className="absolute inset-0 w-0 bg-white/25 transition-all duration-[400ms] ease-out group-hover:w-full"></span>
                <span className="relative">Comenzar gratis <ArrowRight className="ml-2 h-4 w-4 inline" /></span>
              </Button>
              <Button variant="outline" size="lg" className="text-base">
                Ver demostración
              </Button>
            </div>
            <div className="flex items-center gap-2 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-medium">
                    {i}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  Más de 1,000 usuarios satisfechos
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative opacity-0 animate-fade-in">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-purple-500/20 blur-xl opacity-60 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-white rounded-xl overflow-hidden border shadow-xl p-1">
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <img 
                  src="/api/placeholder/800/450" 
                  alt="Platform Preview" 
                  className="w-full h-full object-cover"
                />
                {/* Hero Video Dialog trigger */}
                <div className="absolute inset-0 flex items-center justify-center cursor-pointer">
                  <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                    <svg 
                      className="w-6 h-6 text-white ml-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features Section
const Features = () => {
  const features = [
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Feedback instantáneo",
      description: "Recibe retroalimentación en tiempo real mientras practicas y conversas con nuestros coaches de IA."
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Coaches expertos",
      description: "Elige entre varios coaches especializados en diferentes áreas de conocimiento y habilidades."
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Privacidad garantizada",
      description: "Tus conversaciones están seguras y protegidas, manteniendo tu privacidad en todo momento."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 animate-fade-in">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary font-medium mb-4">
            Características
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Potencia tu aprendizaje con IA avanzada</h2>
          <p className="text-xl text-gray-600">
            Nuestra plataforma ofrece herramientas innovadoras para maximizar tu desarrollo personal y profesional.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl border shadow-sm hover:shadow-md transition-all opacity-0 animate-fade-in" 
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Pricing Section
const Pricing = () => {
  const plans = [
    {
      name: "Plan Gratuito",
      price: "0",
      description: "Perfecto para comenzar y probar la plataforma",
      features: [
        "5,000 tokens incluidos",
        "Acceso a coaches básicos",
        "Hasta 3 sesiones por día",
        "Feedback básico"
      ],
      cta: "Comenzar gratis",
      highlight: false
    },
    {
      name: "Plan Pro",
      price: "10",
      description: "Para usuarios que buscan un aprendizaje continuo",
      features: [
        "50,000 tokens incluidos",
        "Acceso a todos los coaches",
        "Sesiones ilimitadas",
        "Feedback detallado y notas",
        "Historiales y análisis de progreso"
      ],
      cta: "Obtener Pro",
      highlight: true
    }
  ];

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 animate-fade-in">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary font-medium mb-4">
            Planes y Precios
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Planes flexibles para tus necesidades</h2>
          <p className="text-xl text-gray-600">
            Elige el plan que mejor se adapte a tu ritmo de aprendizaje y objetivos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative group ${plan.highlight ? 'transform-gpu transition-all duration-700 hover:scale-105' : ''}`}
            >
              {/* Magic Card effect para el plan destacado */}
              {plan.highlight && (
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              )}
              <div className={`bg-white p-8 rounded-xl border ${plan.highlight ? 'border-primary shadow-lg ring-1 ring-primary/20' : 'shadow-sm'} relative`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-600 ml-2">/mes</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {/* Shiny Button o Interactive Hover Button según sea destacado o no */}
                {plan.highlight ? (
                  <Button className="w-full relative overflow-hidden group">
                    <div className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700"></div>
                    <span className="relative">{plan.cta}</span>
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full">{plan.cta}</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const Testimonials = () => {
  const testimonials = [
    {
      name: "Carlos Mendoza",
      role: "Estudiante de programación",
      content: "AI Coach me ha ayudado a mejorar mis habilidades de programación rápidamente. Las sesiones son muy personalizadas y el feedback es valioso."
    },
    {
      name: "Ana López",
      role: "Profesional de marketing",
      content: "Gracias a las sesiones diarias con mi coach de IA, he mejorado significativamente mis habilidades de presentación y comunicación."
    },
    {
      name: "Miguel Torres",
      role: "Emprendedor",
      content: "La flexibilidad de poder practicar en cualquier momento con diferentes coaches me ha permitido optimizar mi tiempo de aprendizaje."
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 pt-10">
        <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 animate-fade-in">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary font-medium mb-4">
            Testimonios
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Lo que dicen nuestros usuarios</h2>
          <p className="text-xl text-gray-600">
            Miles de personas están mejorando sus habilidades con nuestros coaches de IA.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl border shadow-sm hover:shadow-md transition-shadow opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <span className="text-xl font-medium text-gray-600">{testimonial.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTA = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary to-purple-600 rounded-3xl p-12 text-white text-center max-w-5xl mx-auto relative overflow-hidden opacity-0 animate-fade-in">
          {/* Animated Beam background */}
          <div className="absolute inset-0 w-[400%] translate-x-[-50%] opacity-20 h-full transform-gpu bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent animate-slowbeam"></div>
          
          {/* Ripple Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="absolute inset-0 scale-[0.8] rounded-full bg-white/5 animate-ripple"></div>
            <div className="absolute inset-0 scale-[0.9] rounded-full bg-white/5 animate-ripple delay-300"></div>
          </div>
          
          <div className="relative z-10">
            {/* Sparkles Text */}
            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
              Comienza tu viaje de aprendizaje hoy
              <div className="absolute -top-6 -right-6 w-12 h-12 text-yellow-300 animate-ping opacity-75">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.2 7.4L20 8.2L16 12.3L17.2 18L12 15.4L6.8 18L8 12.3L4 8.2L9.8 7.4L12 2Z" />
                </svg>
              </div>
            </h2>
            
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Únete a miles de personas que están mejorando sus habilidades con nuestros coaches virtuales. 
              Prueba AI Coach gratis y descubre una nueva forma de aprender.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 relative group overflow-hidden">
                <span className="absolute inset-0 w-0 bg-gray-200/25 transition-all duration-[400ms] ease-out group-hover:w-full"></span>
                <span className="relative">Comenzar gratis <ArrowRight className="ml-2 h-4 w-4 inline" /></span>
              </Button>
              
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Ver planes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">AI Coach</span>
            </div>
            <p className="text-gray-600 mb-4">
              Mejora tus habilidades con coaches virtuales impulsados por IA.
            </p>
            <div className="flex gap-4">
              {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                <a key={social} href="#" className="text-gray-400 hover:text-primary">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="sr-only">{social}</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          {['Producto', 'Recursos', 'Soporte'].map((category, index) => (
            <div key={index}>
              <h3 className="font-bold text-lg mb-4">{category}</h3>
              <ul className="space-y-3">
                {[1, 2, 3, 4].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                      {category} {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600">© 2025 AI Coach. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-600 hover:text-primary text-sm">Términos</a>
            <a href="#" className="text-gray-600 hover:text-primary text-sm">Privacidad</a>
            <a href="#" className="text-gray-600 hover:text-primary text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page
const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes beam {
          100% { transform: translateX(100%); }
        }
        
        @keyframes slowbeam {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1); opacity: 0; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        
        .animate-beam {
          animation: beam 2s infinite;
        }
        
        .animate-slowbeam {
          animation: slowbeam 8s linear infinite;
        }
        
        .animate-ripple {
          animation: ripple 3s infinite;
        }
        
        .animate-ping {
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
        
        .bg-grid-small-white {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
      <HeaderC />
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;