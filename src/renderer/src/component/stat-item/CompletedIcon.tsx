import { CheckCircle, XCircle } from 'lucide-react'

type Props = {
  isSuccess?: boolean
  size?: number
}

export default function CompletedIcon({ isSuccess, size = 16 }: Props) {
  return isSuccess ? <CheckCircle size={size} /> : <XCircle size={size} />
}
