export enum productListOptionsEnum {
    PublicView = 'publicView', //when not logged in
    CustomerView = 'customerView', //when logged in as client, add to cart button
    CartView = 'cartView', //when viewing your cart
    AdminView = 'adminView', //when logged in as admin, edit product button
}
