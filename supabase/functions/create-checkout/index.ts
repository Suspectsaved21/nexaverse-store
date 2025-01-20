import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  )

  try {
    // Get the session or user object
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data } = await supabaseClient.auth.getUser(token)
    const user = data.user
    const email = user?.email

    if (!email) {
      throw new Error('No email found')
    }

    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
    if (!stripeKey) {
      console.error('Stripe secret key is missing')
      throw new Error('Stripe secret key not configured')
    }

    if (!stripeKey.startsWith('sk_test_') && !stripeKey.startsWith('sk_live_')) {
      console.error('Invalid Stripe key format')
      throw new Error('Invalid Stripe key format')
    }

    console.log('Initializing Stripe...')
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
    })

    const { items } = await req.json()
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error('No items provided for checkout')
    }

    console.log('Creating payment session...')
    console.log('Cart items:', items)
    
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.name,
            images: item.product.image_url ? [item.product.image_url] : undefined,
          },
          unit_amount: Math.round(item.product.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment', // One-time payment
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/cancel`,
    })

    console.log('Payment session created:', session.id)
    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error creating payment session:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})