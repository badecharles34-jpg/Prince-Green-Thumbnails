import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'
import nodemailer from 'nodemailer';

async function sendEmailNotification({ name, email, message }: { name: string, email: string, message: string }) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true pour le port 465, false pour les autres
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"${name}" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER, // Vous recevez le mail sur votre propre adresse
    subject: "Nouveau message client - Miniamaker",
    text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
  });
}
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, project_type, budget, message } = body

    // Validate
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createServerSupabase()

    // Save to Supabase
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([{ name, email, project_type, budget, message, status: 'new' }])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      // Still return success to user even if DB fails
    }

    // Optional: Send email notification (requires nodemailer setup)
     await sendEmailNotification({ name, email, message })

    return NextResponse.json({ success: true, message: 'Submission received' })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  // Admin endpoint - check for admin auth header
  const authHeader = request.headers.get('x-admin-key')
  if (authHeader !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServerSupabase()
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}
