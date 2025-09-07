import { CheckCircle, XCircle } from 'lucide-react'

type Props = {
  isSuccess?: boolean
}

export default function CompletedIcon({ isSuccess }: Props) {
  return isSuccess ? <CheckCircle /> : <XCircle />
}
