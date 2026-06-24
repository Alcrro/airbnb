# Tech — Reviews Feature

## Architecture Overview

The `Reviews` Mongoose model exists but is not yet integrated into any page or API route. The model groups all reviews for a listing under a single `productId` document. Integration requires an API route, a Server Component on the room detail page, and an optional Client Component for the submit form.

---

## File Map (Current State)

```
src/
  models/
    reviews/
      Reviews.ts              → Mongoose schema (exists, not used anywhere)
```

---

## File Map (Target State)

```
src/
  app/
    api/
      reviews/
        route.ts              → GET /api/reviews?productId=xxx (fetch reviews)
        submit/route.ts       → POST /api/reviews/submit (create review)
    room/[id]/page.tsx        → Include <ReviewsList /> and <ReviewForm />
  components/
    room/
      reviews/
        ReviewsList.tsx       → Async Server Component — fetches + renders reviews
        ReviewForm.tsx        → Client Component — authenticated submit form
        ReviewCard.tsx        → Individual review display
        reviews.scss
  _lib/
    reviews/
      getReviews.ts           → fetch("/api/reviews?productId=xxx")
```

---

## Mongoose Schema — Reviews (current)

```ts
{
  _id:       ObjectId
  productId: String          // links to Room._id
  reviews:   [{
    name:    String          // reviewer name
    rating:  Number          // 1–5
    comment: String
    date:    Date
  }]
}
```

---

## API Routes (to be created)

### `GET /api/reviews?productId=<id>`
- Connects to MongoDB
- Returns `Reviews.findOne({ productId })`
- Response: `{ productId, reviews[] } | null`

### `POST /api/reviews/submit`
- Requires authentication (check session)
- Body: `{ productId, rating, comment }`
- Pushes new review into `reviews[]` array
- Returns updated reviews document

---

## Current Limitations

- `Reviews` model is defined but never imported or used
- No API routes for reviews exist
- Room detail page (`room/[id]/page.tsx`) is an empty `<div>`
- Auth is not yet implemented (required before submit can be gated)

---

## Dependencies

- Auth feature must exist before review submission can be gated
- `mongoose` — Reviews model
