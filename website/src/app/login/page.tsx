import { DocumentCentered } from '@/components/sections/document-centered'
import { LoginForm } from '@/components/elements/login-form'

export default function LoginPage() {
  return (
    <DocumentCentered
      headline="Client Login"
      subheadline={
        <p>
          Enter your email address and we'll send you a secure magic link to access your assets, reports, and documentation.
        </p>
      }
    >
      <LoginForm />
    </DocumentCentered>
  )
}

