import { createBookingHandler } from "@/features/booking/api/createBookingHandler";
import { getBookingsHandler } from "@/features/booking/api/getBookingsHandler";
export const POST = createBookingHandler;
export const GET = getBookingsHandler;
