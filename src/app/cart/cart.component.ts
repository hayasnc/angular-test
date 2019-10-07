import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items;
  checkoutForm;
  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
  ) { }

    loadStripe() {
      if (!window.document.getElementById('stripe-script')) {
        const s = window.document.createElement('script');
        s.id = 'stripe-script';
        s.type = 'text/javascript';
        s.src = 'https://checkout.stripe.com/checkout.js';
        window.document.body.appendChild(s);
      }
  }

  onSubmit(customerData) {
    // Process checkout data here
    console.warn('Your order has been submitted', customerData);

    this.items = this.cartService.clearCart();
    this.checkoutForm.reset();
  }

  pay(amount) {
    const handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_tNrah4tejWECq3ecJUjAPLnt00Lo12BZ7D',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token);
        alert('Token Created!!');
      }
    });
    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: amount * 100
    });
}

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.checkoutForm = this.formBuilder.group({
      name: '',
      address: ''
    });
    this.loadStripe();
  }
}
