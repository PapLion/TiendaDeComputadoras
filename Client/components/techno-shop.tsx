
'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ChevronDown, User, ChevronLeft, ChevronRight, Laptop, Cpu, Monitor, HardDrive, Mouse, Speaker, Smartphone, Headphones, ArrowLeft, ShoppingCart, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PayPalButtons } from "@paypal/react-paypal-js"
import Image from 'next/image'

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface Invoice {
  id: string;
  customerInfo: {
    name: string;
    email: string;
    address: string;
  };
  items: Product[];
  total: number;
  date: string;
}

const products = [
  { name: 'Laptops', icon: Laptop, description: 'Portátiles potentes para trabajo y juego' },
  { name: 'Componentes', icon: Cpu, description: 'CPUs, GPUs, y más para tu PC' },
  { name: 'Monitores', icon: Monitor, description: 'Pantallas de alta resolución' },
  { name: 'Almacenamiento', icon: HardDrive, description: 'SSDs y HDDs de gran capacidad' },
  { name: 'Periféricos', icon: Mouse, description: 'Teclados, ratones y más' },
  { name: 'Audio', icon: Speaker, description: 'Altavoces y sistemas de sonido' },
  { name: 'Móviles', icon: Smartphone, description: 'Smartphones y tablets' },
  { name: 'Accesorios', icon: Headphones, description: 'Complementos para tus dispositivos' },
]

const brands = {
  Laptops: ['Dell', 'HP', 'Lenovo', 'Apple', 'Asus'],
  Componentes: ['Intel', 'AMD', 'NVIDIA', 'Corsair', 'ASUS'],
  Monitores: ['LG', 'Samsung', 'Dell', 'BenQ', 'AOC'],
  Almacenamiento: ['Western Digital', 'Seagate', 'Samsung', 'Crucial', 'Kingston'],
  Periféricos: ['Logitech', 'Razer', 'Corsair', 'SteelSeries', 'HyperX'],
  Audio: ['Bose', 'Sony', 'Sennheiser', 'JBL', 'Audio-Technica'],
  Móviles: ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'OnePlus'],
  Accesorios: ['Anker', 'Belkin', 'Logitech', 'Microsoft', 'AmazonBasics'],
}

const sampleProducts = [
  { id: 1, name: 'Product 1', price: 999, image: '/placeholder.svg?height=200&width=200' },
  { id: 2, name: 'Product 2', price: 799, image: '/placeholder.svg?height=200&width=200' },
  { id: 3, name: 'Product 3', price: 1299, image: '/placeholder.svg?height=200&width=200' },
  { id: 4, name: 'Product 4', price: 599, image: '/placeholder.svg?height=200&width=200' },
  { id: 5, name: 'Product 5', price: 1499, image: '/placeholder.svg?height=200&width=200' },
  { id: 6, name: 'Product 6', price: 899, image: '/placeholder.svg?height=200&width=200' },
  { id: 7, name: 'Product 7', price: 1099, image: '/placeholder.svg?height=200&width=200' },
  { id: 8, name: 'Product 8', price: 699, image: '/placeholder.svg?height=200&width=200' },
  { id: 9, name: 'Product 9', price: 1199, image: '/placeholder.svg?height=200&width=200' },
]

const aboutUsItems = [
  {
    title: 'Nuestra Misión',
    description: 'Proporcionar tecnología de vanguardia y soluciones informáticas excepcionales a nuestros clientes, impulsando la innovación y el progreso en el mundo digital.'
  },
  {
    title: 'Nuestra Visión',
    description: 'Ser líderes en el mercado de tecnología, ofreciendo productos y servicios de alta calidad que superen las expectativas de nuestros clientes.'
  },
  {
    title: 'Nuestros Valores',
    description: 'Compromiso, innovación, calidad y servicio al cliente son los pilares que guían nuestras acciones y decisiones.'
  }
];

export default function TechnoShop() {
  const [currentSection, setCurrentSection] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [cart, setCart] = useState<Product[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState(0)
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', address: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const cartRef = useRef<HTMLDivElement>(null)
  const [currentAboutUsIndex, setCurrentAboutUsIndex] = useState(0)

  const productsPerPage = 6
  const sections = ['Presentation', 'Home', 'Members', 'Who are Us', 'Products', 'Contact Us']

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        setCurrentSection(prev => Math.min(prev + 1, sections.length - 1))
      } else {
        setCurrentSection(prev => Math.max(prev - 1, 0))
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false)
      }
    }

    window.addEventListener('wheel', handleWheel)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('wheel', handleWheel)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [sections.length])

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    setSelectedBrand('')
    setCurrentPage(1)
  }

  const handleBrandClick = (brand: string) => {
    setSelectedBrand(brand)
    setCurrentPage(1)
  }

  const handleBackClick = () => {
    if (selectedBrand) {
      setSelectedBrand('')
    } else if (selectedCategory) {
      setSelectedCategory('')
    }
    setCurrentPage(1)
  }

  const addToCart = (product: Product) => {
    setCart([...cart, product])
  }

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const handleCheckout = () => {
    setIsCartOpen(true)
    setCheckoutStep(1)
  }

  const handleCustomerInfoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCheckoutStep(2)
  }

  const handlePaymentSuccess = (details: any) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      const newInvoice = {
        id: details.id,
        customerInfo,
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price, 0),
        date: new Date().toLocaleString()
      }
      setInvoice(newInvoice)
      setCheckoutStep(3)
      setCart([])
      // Send email notification
      sendEmailNotification(newInvoice)
    }, 2000)
  }

  const sendEmailNotification = async (invoice: Invoice) => {
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'couriers.dev@gmail.com',
          subject: 'New Purchase Notification',
          text: `A new purchase has been made. Order ID: ${invoice.id}, Total: $${invoice.total}`
        }),
      })
    } catch (error) {
      console.error('Failed to send email notification:', error)
    }
  }

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = sampleProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleNext = () => {
    setCurrentAboutUsIndex((prevIndex) => (prevIndex + 1) % aboutUsItems.length);
  };

  const handlePrev = () => {
    setCurrentAboutUsIndex((prevIndex) => (prevIndex - 1 + aboutUsItems.length) % aboutUsItems.length);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden font-sans">
      <aside className="w-64 bg-gray-800 flex flex-col justify-between p-6">
        <div>
          <h1 className="text-2xl font-bold mb-8">Techno Shop</h1>
        </div>
        <nav>
          <ul className="space-y-2">
            {sections.map((section, index) => (
              <li key={section}>
                <button
                  className={`w-full text-left py-2 px-4 rounded ${currentSection === index ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                  onClick={() => setCurrentSection(index)}
                >
                  {section}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="text-sm text-gray-400">©Copyright by Dani.Dev</div>
      </aside>
      <main className="flex-1 overflow-hidden relative">
        <button
          className="absolute top-4 right-4 z-10 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart className="inline-block mr-2" />
          Cart ({cart.length})
        </button>
        <div className="h-full transition-transform duration-500 ease-in-out" style={{ transform: `translateY(-${currentSection * 100}%)` }}>
          <section className="h-full flex flex-col justify-center items-center p-12">
            <h1 className="text-6xl font-bold mb-4">Techno Shop</h1>
            <p className="text-xl mb-4">Una tienda de ventas de componentes y computadores.</p>
            <ChevronDown className="animate-bounce" size={32} />
          </section>

          <section className="h-full flex items-center p-12">
            <div className="flex-1 pr-12">
              <h2 className="text-4xl font-bold mb-6">Bienvenido a Techno Shop</h2>
              <p className="text-lg">
                En Techno Shop, somos tu destino confiable para todo lo relacionado con componentes de computación. Desde procesadores y tarjetas gráficas hasta periféricos y accesorios, ofrecemos una amplia gama de productos de alta calidad para que encuentres exactamente lo que necesitas.
              </p>
            </div>
            <div className="flex-1">
              <Image src="/placeholder.svg?height=400&width=600" alt="Techno Shop" className="rounded-lg shadow-2xl" width={600} height={400} />
            </div>
          </section>

          <section className="h-full p-12">
            <h2 className="text-4xl font-bold mb-6 text-center">Integrantes</h2>
            <p className="text-lg text-center mb-8">En Techno Shop, nuestro equipo está compuesto por profesionales dedicados que trabajan juntos para ofrecer las mejores soluciones tecnológicas. ¡Tú podrías ser el próximo en unirte a nosotros!</p>
            <div className="grid grid-cols-3 gap-8">
              {['Founder', 'Co-Founder', 'CEO', 'Manager', 'Developer', 'Designer'].map(role => (
                <div key={role} className="bg-gray-800 p-6 rounded-lg text-center">
                  <User size={48} className="mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{role}</h3>
                  <p className="text-gray-400">Descripción del rol y responsabilidades.</p>
                </div>
              ))}
            </div>
          </section>

          <section className="h-full flex items-center justify-center p-12">
            <div className="max-w-4xl">
              <h2 className="text-4xl font-bold mb-6 text-center">Sobre nosotros</h2>
              <div className="bg-gray-800 p-8 rounded-lg flex items-center">
                <ChevronLeft size={24} className="cursor-pointer" onClick={handlePrev} />
                <div className="flex-1 px-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentAboutUsIndex}
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-2xl font-semibold mb-4">{aboutUsItems[currentAboutUsIndex].title}</h3>
                      <p className="text-lg">{aboutUsItems[currentAboutUsIndex].description}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <ChevronRight size={24} className="cursor-pointer" onClick={handleNext} />
              </div>
            </div>
          </section>

          <section className="h-full p-12 overflow-y-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Nuestros Productos</h2>
            <AnimatePresence mode="wait">
              {!selectedCategory && (
                <motion.div
                  key="categories"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {products.map((product) => (
                    <div key={product.name} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors">
                      <product.icon className="w-12 h-12 mb-4 text-blue-400" />
                      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                      <p className="text-gray-400 mb-4">{product.description}</p>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
                        onClick={() => handleCategoryClick(product.name)}
                      >
                        Ver {product.name}
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}

              {selectedCategory && !selectedBrand && (
                <motion.div
                  key="brands"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <button onClick={handleBackClick} className="mb-4 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded">
                    <ArrowLeft className="inline-block mr-2" /> Volver a categorías
                  </button>
                  <h3 className="text-2xl font-bold mb-4">Marcas de {selectedCategory}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {brands[selectedCategory as keyof typeof brands].map((brand: string) => (
                      <button key={brand} onClick={() => handleBrandClick(brand)} className="bg-gray-800 hover:bg-gray-700 text-white py-4 px-6 rounded">
                        {brand}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {selectedCategory && selectedBrand && (
                <motion.div
                  key="products"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <button onClick={handleBackClick} className="mb-4 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded">
                    <ArrowLeft className="inline-block mr-2" /> Volver a marcas
                  </button>
                  <h3 className="text-2xl font-bold mb-4">{selectedBrand} {selectedCategory}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentProducts.map((product) => (
                      <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden">
                        <Image src={product.image} alt={product.name} className="w-full h-48 object-cover" width={200} height={200} />
                        <div className="p-4">
                          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                          <p className="text-2xl font-bold mb-4">${product.price}</p>
                          <button
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
                            onClick={() => addToCart(product)}
                          >
                            Añadir al carrito
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-6">
                    {Array.from({ length: Math.ceil(sampleProducts.length / productsPerPage) }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        className={`mx-1 py-2 px-4 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          <section className="h-full flex items-center justify-center p-12">
            <div className="max-w-2xl w-full">
              <h2 className="text-4xl font-bold mb-6 text-center">Contáctanos</h2>
              <form className="space-y-6" action="mailto:couriers.dev@gmail.com" method="POST">
                <input type="email" name="email" placeholder="Email" className="w-full p-3 bg-gray-800 rounded" required />
                <input type="text" name="subject" placeholder="Tema de la consulta" className="w-full p-3 bg-gray-800 rounded" required />
                <textarea name="message" placeholder="Comentarios" rows={6} className="w-full p-3 bg-gray-800 rounded" required></textarea>
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded">Enviar</button>
              </form>
            </div>
          </section>
        </div>
      </main>

      {/* Shopping Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            ref={cartRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed top-0 right-0 h-full w-96 bg-gray-800 p-6 overflow-y-auto"
          >
            <button className="absolute top-4 right-4 text-gray-400 hover:text-white" onClick={() => setIsCartOpen(false)}>
              <X />
            </button>
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            <p className="text-sm text-gray-400 mb-4">
              Disclaimer: No se venden computadoras reales aún. Cualquier compra que se haga se tomará como donación a A1 o, si lo desea, puede solicitar un reembolso.
            </p>
            {checkoutStep === 0 && (
              <>
                {cart.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  <>
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center mb-4">
                        <div>
                          <h3>{item.name}</h3>
                          <p>${item.price}</p>
                        </div>
                        <button className="text-red-500 hover:text-red-600" onClick={() => removeFromCart(item.id)}>Remove</button>
                      </div>
                    ))}
                    <div className="mt-4">
                      <p className="text-xl font-bold">Total: ${cart.reduce((sum, item) => sum + item.price, 0)}</p>
                      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4" onClick={handleCheckout}>Proceed to Checkout</button>
                    </div>
                  </>
                )}
              </>
            )}
            {checkoutStep === 1 && (
              <form onSubmit={handleCustomerInfoSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  className="w-full p-3 bg-gray-700 rounded"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                  className="w-full p-3 bg-gray-700 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  className="w-full p-3 bg-gray-700 rounded"
                  required
                />
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Continue to Payment</button>
                <button onClick={() => setCheckoutStep(0)} className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded mt-2">Back to Cart</button>
              </form>
            )}
            {checkoutStep === 2 && (
              <div>
                <h3 className="text-xl font-bold mb-4">Payment</h3>
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{
                        amount: {
                          currency_code: 'USD',
                          value: cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)
                        }
                      }],
                      intent: 'CAPTURE'
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order!.capture().then((details) => {
                      handlePaymentSuccess(details);
                    });
                  }}
                />
                <button onClick={() => setCheckoutStep(1)} className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded mt-4">Back to Customer Info</button>
              </div>
            )}
            {checkoutStep === 3 && (
              <div>
                <h3 className="text-xl font-bold mb-4">Invoice</h3>
                {invoice && (
                  <div>
                    <p>Order ID: {invoice.id}</p>
                    <p>Date: {invoice.date}</p>
                    <p>Name: {invoice.customerInfo.name}</p>
                    <p>Email: {invoice.customerInfo.email}</p>
                    <p>Address: {invoice.customerInfo.address}</p>
                    <h4 className="font-bold mt-4">Items:</h4>
                    {invoice.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.name}</span>
                        <span>${item.price}</span>
                      </div>
                    ))}
                    <p className="font-bold mt-4">Total: ${invoice.total}</p>
                    <button onClick={() => {setCheckoutStep(0); setIsCartOpen(false);}} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4">Close</button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  )
}