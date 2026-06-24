# Tech — Booking Feature

## Architecture Overview

The booking widget is a Client Component (needs date state, guest counter) embedded in the room detail Server Component page. The submit action calls a POST API route that creates a Booking document.

---

## File Map (planned)

```
src/
  app/
    booking/
      confirmation/
        page.tsx                      → Booking confirmation page
    api/
      bookings/route.ts               → POST /api/bookings (thin)
  features/
    booking/
      components/
        BookingWidget.tsx             → Client Component: date range, guests, price summary, Reserve button
        bookingWidget.scss            → Sticky sidebar styles
        DateRangePicker.tsx           → Calendar UI for check-in / check-out selection
        GuestCounter.tsx              → Adult / children / infant counters
        PriceSummary.tsx              → Price breakdown display
        BookingConfirmation.tsx       → Confirmation page content
      lib/
        getBookings.ts                → Fetch user's bookings (profile page)
        getUnavailableDates.ts        → Fetch booked date ranges for a room
      models/
        Booking.ts                    → Mongoose Booking schema
      api/
        createBookingHandler.ts       → POST /api/bookings handler
        getBookingsHandler.ts         → GET /api/bookings?userId= handler
      types/
        booking.ts                    → Booking TypeScript interface
```

---

## Mongoose Schema — Booking

```ts
{
  _id:          ObjectId
  roomId:       ObjectId    // ref: Room
  userId:       String      // NextAuth user ID
  checkIn:      Date
  checkOut:     Date
  guests:       Number
  totalPrice:   Number      // calculated at booking time
  status:       String      // "confirmed" | "cancelled"
  createdAt:    Date
}
```

---

## API Routes

### `POST /api/bookings`
- Requires authenticated session (`getServerSession()`)
- Validates dates are not already booked
- Creates Booking document
- Response: `{ success, booking }`

### `GET /api/bookings?userId=`
- Returns all bookings for a user
- Used on profile page

---

## Price Calculation

```
nightly_rate = room.price
nights       = checkOut - checkIn (in days)
cleaning_fee = nightly_rate * 0.10
service_fee  = (nightly_rate * nights) * 0.14
total        = (nightly_rate * nights) + cleaning_fee + service_fee
```
