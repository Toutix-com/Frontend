// src/mocks/handlers.js
import { http } from 'msw';

export const handlers = [
  http.get('/events/:eventId', (req, res, ctx) => {
    const { eventId } = req.params;
    const event = {
      EventID: eventId,
      Name: 'Music Concert',
      image_url: 'https://via.placeholder.com/150',
      location: {
        Name: 'City Arena'
      },
      ticket: {
        CategoryID: 1,
        price: 150
      }
    };
    return res(ctx.status(200), ctx.json(event));
  }),
  http.post('/events/:eventId/ticket/validate', (req, res, ctx) => {
    const { coupon_code } = req.body;

    // Simulate different responses based on the coupon code
    if (coupon_code === 'VALID_COUPON') {
      return res(
        ctx.status(200),
        ctx.json({
          total: 80,
          service: 5,
          is_eligible_to_purchase: true,
          error_message: '',
          coupon_error: ''
        })
      );
    } else if (coupon_code === 'EXPIRED_COUPON') {
      return res(
        ctx.status(400),
        ctx.json({
          error_message: '',
          coupon_error: 'Coupon code has expired'
        })
      );
    } else if (coupon_code === 'INVALID_COUPON') {
      return res(
        ctx.status(400),
        ctx.json({
          error_message: '',
          coupon_error: 'Invalid coupon code'
        })
      );
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          error_message: '',
          coupon_error: 'Coupon code not found'
        })
      );
    }
  })
];
