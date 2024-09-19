'use client'

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import TechnoShop from '../components/techno-shop'

const initialOptions = {
    clientId: "test",
    currency: "USD",
    intent: "capture",
};

export default function Home() {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <TechnoShop />
    </PayPalScriptProvider>
  )
}