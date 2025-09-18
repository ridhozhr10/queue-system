## Day-by-Day Breakdown

### Day 1 – Setup

- Pick tech stack (Node.js + Express + SQLite/Postgres, simple React or HTML UI).
- Set up repository and minimal CI/CD (optional).
- Create database schema for Tickets and Counters.

### Day 2 – Core Backend

- Implement `POST /tickets` (create ticket with number and phone).
- Implement `GET /tickets/next` (fetch next ticket FIFO).
- Implement `PATCH /tickets/:id` (update status: called, completed).
- In-memory or simple DB sorting (priority optional at this stage).

### Day 3 – Kiosk UI (Applicant Side)

- Simple form: select service, input phone number.
- On submit: call backend and show ticket number.
- (Optional) Print PDF or display QR code.

### Day 4 – Officer Dashboard

- Minimal web page:
  - Button: Call Next
  - Show ticket info (number and phone)
  - Mark complete / skip
- Pulls from backend API.

### Day 5 – WhatsApp Integration

- Connect to WhatsApp API (Twilio Sandbox or Meta Cloud free trial).
- On ticket creation: send confirmation (“Your ticket number is X”).
- On call: send notification (“Please go to Counter Y”).

### Day 6 – Display Screen

- Simple web page showing:
  - Current ticket being served
  - Next 3 tickets
- Auto-refresh every 5s or via WebSocket.

### Day 7 – Demo Run

- Walk through scenario:
  - Applicant uses kiosk, gets ticket and WhatsApp confirmation.
  - Officer presses Call Next, ticket updates and WhatsApp alert sent.
  - Display screen updates.
- Collect feedback.
- List gaps for full version (priority handling, analytics, security).
