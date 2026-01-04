import { DocumentCentered } from '@/components/sections/document-centered'
import { LoginForm } from '@/components/elements/login-form'

export default function LoginPage() {
  return (
    <DocumentCentered
      headline="Client Login"
      subheadline={
        <p>
          Enter your password to access your assets, reports, and documentation.
        </p>
      }
    >
      <LoginForm />
    </DocumentCentered>
  )
}

