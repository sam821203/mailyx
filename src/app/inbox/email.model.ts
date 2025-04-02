export interface Email {
  _id: string
  subject: string
  from: string
  to: string
  text: string
  html: string
}

export interface EmailSummary {
  _id: string
  subject: string
  from: string
}
