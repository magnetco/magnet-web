import { Resend } from 'resend'
import { renderContactFormEmail } from './templates/contact-form'
import { renderApplicationEmail } from './templates/application-form'

// Lazy initialization to avoid build-time errors when RESEND_API_KEY is not set
let _resend: Resend | null = null

function getResend() {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY environment variable is not set')
    }
    _resend = new Resend(process.env.RESEND_API_KEY)
  }
  return _resend
}

export interface ContactFormData {
  name: string
  company?: string | null
  email: string
  message: string
}

export async function sendContactFormEmail(data: ContactFormData): Promise<void> {
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'team@email.magnet.co'
  const toEmail = process.env.RESEND_TO_EMAIL || 'gavin@magnet.co'
  const replyTo = process.env.RESEND_REPLY_TO || 'team@magnet.co'

  const subject = `New Contact Form Submission from ${data.name}`

  // Use branded HTML template
  const htmlBody = renderContactFormEmail(data)

  // Plain text fallback
  const textBody = `
New Contact Form Submission

Name: ${data.name}
${data.company ? `Company: ${data.company}` : ''}
Email: ${data.email}

Message:
${data.message}
  `.trim()

  try {
    await getResend().emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: replyTo,
      subject,
      html: htmlBody,
      text: textBody,
    })
  } catch (error) {
    console.error('Error sending email via Resend:', error)
    throw error
  }
}

export interface ApplicationFormData {
  jobId: string
  jobTitle: string
  sanityJobUrl?: string | null
  firstName: string
  lastName: string
  email: string
  cellNumber: string
  linkedinUrl: string
  resumeUrl?: string | null
  timezone: string
  locationPreference: string
}

export async function sendApplicationEmail(data: ApplicationFormData): Promise<void> {
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'team@email.magnet.co'
  const toEmail = process.env.RESEND_TO_EMAIL || 'gavin@magnet.co'
  const replyTo = process.env.RESEND_REPLY_TO || 'team@magnet.co'

  const subject = `New Application: ${data.jobTitle} - ${data.firstName} ${data.lastName}`

  // Use branded HTML template
  const htmlBody = renderApplicationEmail(data)

  // Plain text fallback
  const textBody = `
New Job Application

Position: ${data.jobTitle}
${data.sanityJobUrl ? `View in Sanity: ${data.sanityJobUrl}` : ''}

Applicant Details:
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Cell: ${data.cellNumber}
LinkedIn: ${data.linkedinUrl}
${data.resumeUrl ? `Resume/Portfolio: ${data.resumeUrl}` : ''}
Timezone: ${data.timezone}
Location Preference: ${data.locationPreference}
  `.trim()

  try {
    await getResend().emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: replyTo,
      subject,
      html: htmlBody,
      text: textBody,
    })
  } catch (error) {
    console.error('Error sending application email via Resend:', error)
    throw error
  }
}

