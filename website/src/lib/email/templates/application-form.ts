import type { ApplicationFormData } from '../resend'

/**
 * Email template for job application submissions
 * Matches Magnet brand colors and styling
 */
export function renderApplicationEmail(data: ApplicationFormData): string {
  const {
    jobTitle,
    sanityJobUrl,
    firstName,
    lastName,
    email,
    cellNumber,
    linkedinUrl,
    resumeUrl,
    timezone,
    locationPreference,
  } = data

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

  const safeJobTitle = escapeHtml(jobTitle)
  const safeSanityJobUrl = sanityJobUrl ? escapeHtml(sanityJobUrl) : ''
  const safeFirstName = escapeHtml(firstName)
  const safeLastName = escapeHtml(lastName)
  const safeEmail = escapeHtml(email)
  const safeCellNumber = escapeHtml(cellNumber)
  const safeLinkedinUrl = escapeHtml(linkedinUrl)
  const safeResumeUrl = resumeUrl ? escapeHtml(resumeUrl) : ''
  const safeTimezone = escapeHtml(timezone)
  const safeLocationPreference = escapeHtml(locationPreference)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New Job Application</title>
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
                      New Job Application
                    </h1>
                    <p style="margin: 12px 0 0 0; font-size: 16px; line-height: 1.5; color: #2A4144; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                      Application for <strong style="color: #F9432B;">${sanityJobUrl ? `<a href="${safeSanityJobUrl}" style="color: #F9432B; text-decoration: none;">${safeJobTitle}</a>` : safeJobTitle}</strong>
                    </p>
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

              <!-- Applicant Details -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <!-- Name -->
                <tr>
                  <td style="padding: 24px 0 0 0;">
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
                            ${safeFirstName} ${safeLastName}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Email -->
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

                <!-- Cell Number -->
                <tr>
                  <td style="padding: 0 0 20px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 0 0 8px 0;">
                          <p style="margin: 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #2A4144; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                            Cell Number
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px 0;">
                          <p style="margin: 0; font-size: 16px; line-height: 1.5; color: #220002; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                            <a href="tel:${safeCellNumber}" style="color: #F9432B; text-decoration: none; font-weight: 500;">${safeCellNumber}</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- LinkedIn -->
                <tr>
                  <td style="padding: 0 0 20px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 0 0 8px 0;">
                          <p style="margin: 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #2A4144; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                            LinkedIn
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px 0;">
                          <p style="margin: 0; font-size: 16px; line-height: 1.5; color: #220002; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                            <a href="${safeLinkedinUrl}" style="color: #F9432B; text-decoration: none; font-weight: 500;">${safeLinkedinUrl}</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                ${resumeUrl ? `
                <!-- Resume/Portfolio -->
                <tr>
                  <td style="padding: 0 0 20px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 0 0 8px 0;">
                          <p style="margin: 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #2A4144; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                            Resume / Portfolio
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px 0;">
                          <p style="margin: 0; font-size: 16px; line-height: 1.5; color: #220002; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                            <a href="${safeResumeUrl}" style="color: #F9432B; text-decoration: none; font-weight: 500;">${safeResumeUrl}</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ''}

                <!-- Timezone -->
                <tr>
                  <td style="padding: 0 0 20px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 0 0 8px 0;">
                          <p style="margin: 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #2A4144; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                            Timezone
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px 0;">
                          <p style="margin: 0; font-size: 16px; line-height: 1.5; color: #220002; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                            ${safeTimezone}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Location Preference -->
                <tr>
                  <td style="padding: 0 0 20px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding: 0 0 8px 0;">
                          <p style="margin: 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #2A4144; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                            Location Preference
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 16px; background-color: #F5F7F7; border-radius: 6px; border-left: 3px solid #F9432B;">
                          <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #220002; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                            ${safeLocationPreference}
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
                      This application was submitted from the Magnet careers page.
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

