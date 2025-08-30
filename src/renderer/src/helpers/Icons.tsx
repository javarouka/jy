import { AlertTriangle, CheckCircle2, Clock } from 'lucide-react'

export const getStatusIcon = (status) => {
  switch (status) {
    case 'completed': return <CheckCircle2 size={16} className="text-green-600" />
    case 'warning': return <AlertTriangle size={16} className="text-yellow-600" />
    case 'required': return <AlertTriangle size={16} className="text-red-600" />
    case 'in_progress': return <Clock size={16} className="text-blue-600" />
    default: return <Clock size={16} className="text-gray-400" />
  }
}
