import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function GET() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/app?paid=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
  });
  return NextResponse.redirect(session.url!);
}