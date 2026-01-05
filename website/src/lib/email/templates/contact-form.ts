import { ContactFormData } from '../resend'

/**
 * Email template for contact form submissions
 * Matches Magnet brand colors and styling
 */
export function renderContactFormEmail(data: ContactFormData): string {
  const { name, company, email, message, intent, services, subOptions } = data

  // Escape HTML to prevent XSS
  const escapeHtml = (text: string): string => {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    }
    return text.replace(/[&<>"']/g, (m) => map[m])
  }

  // Service ID to label mapping
  const serviceLabels: Record<string, string> = {
    'retainer': 'Full-Service Retainer',
    'branding': 'Branding',
    'websites': 'Websites',
    'paid-media': 'Paid Media',
    'search-marketing': 'Search Marketing',
  }

  // Sub-option ID to label mapping
  const subOptionLabels: Record<string, string> = {
    'brand-essentials': 'Brand Essentials',
    'brand-comprehensive': 'Brand Comprehensive',
    'marketing-website': 'Marketing Website',
    'ecommerce-website': 'Ecommerce Website',
    'custom-software': 'Custom Software',
    'google-ads': 'Google Ads',
    'meta-ads': 'Meta Ads',
    'linkedin-ads': 'LinkedIn Ads',
    'youtube-ads': 'YouTube Ads',
    'technical-seo': 'Technical SEO',
    'content-marketing': 'Content Marketing',
    'link-building': 'Link Building',
    'local-seo': 'Local SEO',
  }

  // Intent labels
  const intentLabels: Record<string, string> = {
    'prospect': 'Looking to hire Magnet',
    'vendor': 'Vendor inquiry',
    'partnership': 'Partnership opportunities',
    'careers': 'Join our team',
  }

  const safeName = escapeHtml(name)
  const safeCompany = company ? escapeHtml(company) : ''
  const safeEmail = escapeHtml(email)
  // Preserve line breaks in message
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')

  // Build services HTML
  const buildServicesHtml = (): string => {
    if (!services || services.length === 0) return ''
    
    let html = `
                <tr>
                  <td style="padding: 0 0 20px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 0 0 8px 0;">
                          <p style="margin: 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #2A4144; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                            Services Requested
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px 0;">
                          <ul style="margin: 0; padding: 0 0 0 20px; font-size: 16px; line-height: 1.6; color: #220002; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">`

    for (const serviceId of services) {
      const label = serviceLabels[serviceId] || serviceId
      const serviceSubOptions = subOptions?.[serviceId]
      
      html += `
                            <li style="margin-bottom: 8px;"><strong>${escapeHtml(label)}</strong>`
      
      if (serviceSubOptions && serviceSubOptions.length > 0) {
        html += `
                              <ul style="margin: 4px 0 0 0; padding: 0 0 0 16px; font-size: 14px; color: #2A4144;">`
        for (const subOptId of serviceSubOptions) {
          const subOptLabel = subOptionLabels[subOptId] || subOptId
          html += `
                                <li style="margin-bottom: 4px;">${escapeHtml(subOptLabel)}</li>`
        }
        html += `
                              </ul>`
      }
      
      html += `</li>`
    }

    html += `
                          </ul>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>`
    
    return html
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New Contact Form Submission</title>
  <!--[if mso]>
  <style type="text/css">
    table {border-collapse:collapse;border-spacing:0;margin:0;}
    div, td {padding:0;}
    div {margin:0;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #F5F7F7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <!-- Wrapper -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F5F7F7;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <!-- Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #FFFFFF; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 30px 40px; background-color: #FFFFFF; border-radius: 8px 8px 0 0;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td>
                    <h1 style="margin: 0; font-size: 28px; font-weight: 600; line-height: 1.2; color: #220002; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                      New Contact Form Submission
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 0 40px 40px 40px; background-color: #FFFFFF;">
              <!-- Divider -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 0 0 30px 0; border-bottom: 2px solid #DDE6E7;">
                  </td>
                </tr>
              </table>

              <!-- Contact Details -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 0 0 20px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 0 0 8px 0;">
                          <p style="margin: 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #2A4144; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                            Name
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px 0;">
                          <p style="margin: 0; font-size: 16px; line-height: 1.5; color: #220002; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                            ${safeName}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                ${company ? `
                <tr>
                  <td style="padding: 0 0 20px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 0 0 8px 0;">
                          <p style="margin: 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #2A4144; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                            Company
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px 0;">
                          <p style="margin: 0; font-size: 16px; line-height: 1.5; color: #220002; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                            ${safeCompany}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ''}

                ${intent ? `
                <tr>
                  <td style="padding: 0 0 20px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 0 0 8px 0;">
                          <p style="margin: 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #2A4144; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                            Intent
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px 0;">
                          <p style="margin: 0; font-size: 16px; line-height: 1.5; color: #220002; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                            <span style="display: inline-block; padding: 4px 12px; background-color: #F9432B; color: #FFFFFF; border-radius: 4px; font-weight: 500; font-size: 14px;">
                              ${escapeHtml(intentLabels[intent] || intent)}
                            </span>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ''}

                ${buildServicesHtml()}

                <tr>
                  <td style="padding: 0 0 20px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 0 0 8px 0;">
                          <p style="margin: 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #2A4144; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                            Email
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px 0;">
                          <p style="margin: 0; font-size: 16px; line-height: 1.5; color: #220002; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                            <a href="mailto:${safeEmail}" style="color: #F9432B; text-decoration: none; font-weight: 500;">${safeEmail}</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 0 0 20px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 0 0 8px 0;">
                          <p style="margin: 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #2A4144; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                            Message
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 16px; background-color: #F5F7F7; border-radius: 6px; border-left: 3px solid #F9432B;">
                          <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #220002; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                            ${safeMessage}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #F5F7F7; border-radius: 0 0 8px 8px; border-top: 1px solid #DDE6E7;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #2A4144; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                      This email was sent from the Magnet website contact form.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

