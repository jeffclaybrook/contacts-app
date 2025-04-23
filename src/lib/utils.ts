export function formatPhoneNumber(phone: string): string {
 const digits = phone.replace(/\D/g, "")
 if (digits.length !== 10) return phone

 const area = digits.slice(0, 3)
 const middle = digits.slice(3, 6)
 const last = digits.slice(6)

 return `(${area}) ${middle}-${last}`
}

export function formatPhoneInput(phone: string) {
 const digits = phone.replace(/\D/g, "").slice(0, 10)
 const match = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/)

 if (!match) return digits
 if (!match[2]) return `(${match[1]})`
 if (!match[3]) return `(${match[1]}) ${match[2]}`
 return `(${match[1]}) ${match[2]}-${match[3]}`
}